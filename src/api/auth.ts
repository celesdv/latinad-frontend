import axios from "./axios";

/**
 * Realiza una solicitud de inicio de sesión al servidor.
 * @param {Object} user - Objeto que contiene las credenciales del usuario (email y password).
 * @returns {Promise<Object>} - Promesa que se resuelve con los datos de usuario y token de acceso si la solicitud es exitosa.
 * @throws {Error} - Error si la solicitud falla.
 */
export const loginRequest = async (user: { email: string; password: string }): Promise<any> => {
    try {
      // Realiza una solicitud POST al endpoint `/login` con las credenciales del usuario
      const response = await axios.post("/login", user);
      // Devuelve los datos de usuario y token de acceso de la respuesta del servidor
      return response.data;
    } catch (error) {
      // En caso de error, lanza una excepción para manejarlo en el código que llame a esta función
      throw new Error("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  }