import axios from "axios";

// URL base para las solicitudes HTTP
const URL = "https://challenge-front-7fw1.onrender.com";

// Configuración de una instancia de Axios para solicitudes públicas
export default axios.create({
  baseURL: URL,
});

// Configuración de una instancia de Axios para solicitudes privadas
export const axiosPrivate = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" }, // Encabezados comunes para todas las solicitudes privadas
});

// Interceptor de solicitudes para agregar el token de autorización a las solicitudes privadas
axiosPrivate.interceptors.request.use(
  (config) => {
    // Obtiene el token de autorización del almacenamiento local
    const token = localStorage.getItem("tkn");
    // Si el token existe, lo agrega a la cabecera de la solicitud
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
