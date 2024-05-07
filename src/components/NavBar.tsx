import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


function NavBar() {
  // Obtiene el estado de autenticación y la función de cierre de sesión del hook personalizado useAuth
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * Manejador de sesión.
   * Si el usuario está autenticado, cierra la sesión. Luego, redirige al usuario a la página de inicio de sesión.
   */
  function sessionHandler() {
    if (isAuthenticated) {
      logout();
    }
    navigate("/login");
  }

  return (
    <nav className="bg-gray-900 w-full border-b border-neutral-600 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-20">
        {/* Enlace al dashboard si el usuario está autenticado, de lo contrario, enlace al inicio de sesión */}
        <Link to={isAuthenticated ? "/display" : "/"}>
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-neutral-100 flex items-center">
            <img
              src='public\main-logo.png'
              alt=''
              className="h-10 w-full"
            />
          </span>
        </Link>
        {/* Botón para iniciar/cerrar sesión con sessionHandler */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={sessionHandler}
            className="text-neutral-100 focus:ring-4 focus:outline-none shadow-lg font-medium rounded-full text-sm px-4 py-2 text-center bg-sky-600 hover:bg-sky-700 focus:ring-sky-800"
          >
            {!isAuthenticated ? "Iniciar sesión" : "Cerrar sesión"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
