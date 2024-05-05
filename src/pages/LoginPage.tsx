import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

// Definición de los tipos de entrada para el formulario de inicio de sesión
type ILoginInputs = {
  email: string;
  password: string;
};

// Enumeración de los posibles estados del inicio de sesión
const LOGIN_STATUS = {
  IDLE: "idle",
  UPLOADING: "uploading",
  ERROR: "error",
} as const;

// Definición del tipo de datos para el estado del inicio de sesión
type StatusType = (typeof LOGIN_STATUS)[keyof typeof LOGIN_STATUS];

function LoginPage() {
  // Estado del inicio de sesión y funciones para manejarlo
  const [loginStatus, setLoginStatus] = useState<StatusType>(LOGIN_STATUS.IDLE);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>();
  const { login, isAuthenticated, loginError } = useAuth();
  const navigate = useNavigate();

  // Efecto para redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/display");
    } else {
      localStorage.removeItem("tkn");
    }
  }, [isAuthenticated]);

  // Función de envío del formulario de inicio de sesión
  const onSubmit: SubmitHandler<ILoginInputs> = async (values) => {
    setLoginStatus(LOGIN_STATUS.UPLOADING);
    await login(values);
    if (loginError) setLoginStatus(LOGIN_STATUS.ERROR);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 h-[calc(100vh-70px)]">
      {/* Formulario de inicio de sesión */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-96 max-w-full h-auto shadow-xl bg-gradient-to-b from-sky-900 to-sky-600 p-6 rounded-lg"
      >
        <h3 className="text-xl text-neutral-100 text-center font-bold">
          Iniciar Sesión
        </h3>
        {/* Campo de entrada de correo electrónico */}
        <label className="relative rounded-lg borde">
          <span className="absolute left-2 -translate-y-1/2 pointer-events-none rounded px-1 shadow-lg bg-sky-600 text-neutral-100">
            Email
          </span>
          <input
            {...register("email", { required: true })}
            id="email"
            placeholder="email@servidor.com"
            type="email"
            className="w-full border-0 bg-neutral-100 rounded text-sky-800 p-3 focus:outline-0 placeholder:text-sky-400"
          />
        </label>
        {/* Campo de entrada de contraseña */}
        <label className="relative rounded-lg borde">
          <span className="absolute left-2 -translate-y-1/2 pointer-events-none rounded px-1 shadow-lg bg-sky-600 text-neutral-100">
            Clave
          </span>
          <input
            {...register("password", { required: true })}
            id="password"
            placeholder="Clave"
            type="password"
            className="w-full border-0 bg-neutral-100 rounded text-sky-800 p-3 focus:outline-0 placeholder:text-sky-400"
          />
        </label>
        {/* Mensajes de error */}
        <div>
          {errors.email && (
            <p className="text-sm text-center text-red-200">
              Debe ingresar un correo electrónico válido
            </p>
          )}
          {errors.password && (
            <p className="text-sm text-center text-red-200">
              Debe ingresar una clave para válida
            </p>
          )}
          {loginStatus === LOGIN_STATUS.ERROR && (
            <p className="text-sm text-center text-red-200">
              Correo electrónico o clave incorrectos
            </p>
          )}
        </div>
        {/* Botón de inicio de sesión */}
        {loginStatus != LOGIN_STATUS.UPLOADING && (
          <button
            type="submit"
            className="flex bg-neutral-100 text-sky-800 font-bold uppercase rounded py-3 justify-center shadow-lg"
          >
            Ingresar
          </button>
        )}
        {/* Indicador de carga */}
        {loginStatus === LOGIN_STATUS.UPLOADING && <Loader />}
      </form>
    </div>
  );
}

export default LoginPage;
