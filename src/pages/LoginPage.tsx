import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

type LoginInputs = {
  email: string;
  password: string;
};

const LOGIN_STATUS = {
  IDLE: "idle",
  UPLOADING: "uploading",
  ERROR: "error",
} as const;

type StatusType = (typeof LOGIN_STATUS)[keyof typeof LOGIN_STATUS];

function LoginPage() {
  const [loginStatus, setLoginStatus] = useState<StatusType>(LOGIN_STATUS.IDLE);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const { login, isAuthenticated, loginError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/display");
    } else {
      localStorage.removeItem("tkn");
    }
  }, [isAuthenticated]);

  const onSubmit: SubmitHandler<LoginInputs> = async (values) => {
    setLoginStatus(LOGIN_STATUS.UPLOADING);
    await login(values);
    if (loginError) setLoginStatus(LOGIN_STATUS.ERROR);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 h-[calc(100vh-68px)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-96 max-w-full h-auto shadow-xl bg-gradient-to-b from-sky-900 to-sky-600 p-6 rounded-lg"
      >
        <h3 className="text-xl text-neutral-100 text-center font-bold">
          Iniciar Sesión
        </h3>
        <label className="relative rounded-lg borde">
          <span className="absolute left-2 -translate-y-1/2 pointer-events-none rounded px-1 bg-sky-600 text-neutral-100">
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

        <label className="relative rounded-lg borde">
          <span className="absolute left-2 -translate-y-1/2 pointer-events-none rounded px-1 bg-sky-600 text-neutral-100">
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

        {loginStatus != LOGIN_STATUS.UPLOADING && (
          <button
            type="submit"
            className="flex bg-neutral-100 text-sky-800 font-bold uppercase rounded py-3 justify-center"
          >
            Ingresar
          </button>
        )}
        {loginStatus === LOGIN_STATUS.UPLOADING && <Loader />}
      </form>
    </div>
  );
}

export default LoginPage;
