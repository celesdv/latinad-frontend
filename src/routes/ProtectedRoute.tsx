import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const ProtectedRoute = () => {
  // Verifica el estado de autenticación del usuario
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Renderiza el contenido protegido si el usuario está autenticado
  // De lo contrario, redirige al inicio de sesión con la ubicación actual como estado
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
