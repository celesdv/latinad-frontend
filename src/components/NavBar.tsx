import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PlusIcon } from "@heroicons/react/24/solid";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function sessionHandler() {
    if (isAuthenticated) {
      logout();
    }
    navigate("/login");
  }

  return (
    <nav className="bg-gray-900 w-full border-b border-neutral-600 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={isAuthenticated ? "/display" : "/"}>
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-neutral-100 ">
            LatinAd
          </span>
        </Link>

        <div className="flex gap-2">
          {isAuthenticated && (
            <Link to="display/form">
              <div className="flex items-center gap-1 text-neutral-100 focus:outline-none rounded-full text-sm px-4 py-2 text-center bg-sky-600 hover:bg-sky-700">
                <PlusIcon className="size-5 text-neutral-100" /> 
                <p className="hidden md:inline">Añadir</p>
              </div>
            </Link>
          )}
          <button
            type="button"
            onClick={sessionHandler}
            className="text-neutral-100 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center bg-sky-600 hover:bg-sky-700 focus:ring-sky-800"
          >
            {!isAuthenticated ? "Iniciar sesión" : "Cerrar sesión"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
