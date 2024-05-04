import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

// Hook personalizado para interceptar las solicitudes privadas y agregar el token de autorización
const useAxiosPrivate = () => {
  // Obtiene el usuario autenticado del contexto de autenticación
  const { user } = useAuth();

  useEffect(() => {
    // Efecto secundario que se ejecuta al cambiar el usuario autenticado
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      // Función ejecutada antes de que se envíe la solicitud
      (config) => {
        // Agrega el token de autorización a la cabecera de la solicitud si el usuario está autenticado
        config.headers["Authorization"] = `Bearer ${user?.token}`;
        // Devuelve la configuración de la solicitud actualizada
        return config;
      },
      // Función ejecutada en caso de error
      (error) => Promise.reject(error)
    );

    // Función de limpieza que se ejecuta cuando el componente se desmonta o cuando cambia el usuario autenticado
    return () => {
      // Remueve el interceptor de solicitud para evitar posibles fugas de memoria
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [user]); // Ejecuta el efecto secundario cuando cambia el usuario autenticado

  // Devuelve la instancia de Axios con el interceptor aplicado
  return axiosPrivate;
};

export default useAxiosPrivate;
