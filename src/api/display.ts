import { axiosPrivate } from "./axios";

/**
 * Realiza una solicitud para obtener una lista de pantallas de visualización.
 * @param {number} pageSize - Tamaño de página para la paginación.
 * @param {number} offset - Desplazamiento para la paginación.
 * @param {string} name - (Opcional) Nombre de la pantalla para filtrar la búsqueda.
 * @param {string} type - (Opcional) Tipo de pantalla para filtrar la búsqueda.
 * @returns {Promise<any>} - Promesa que se resuelve con los datos de las pantallas de visualización.
 */
export const getDisplayRequest = async (
  pageSize = 8,
  offset = 0,
  name = "",
  type = ""
): Promise<any> => {
  // Construye la URL de la solicitud con los parámetros proporcionados
  let url = `/display?pageSize=${pageSize}&offset=${offset}`;
  if (name) url = `${url}&name=${name}`;
  if (type) url = `${url}&type=${type}`;
  // Realiza una solicitud GET utilizando la instancia de Axios configurada para solicitudes privadas
  return await axiosPrivate.get(url);
};

/**
 * Realiza una solicitud para obtener los detalles de una pantalla de visualización específica.
 * @param {number} id - Identificador único de la pantalla de visualización.
 * @returns {Promise<any>} - Promesa que se resuelve con los detalles de la pantalla de visualización.
 */
export const getDisplayByRequest = async (id: number): Promise<any> =>
  // Realiza una solicitud GET utilizando la instancia de Axios configurada para solicitudes privadas
  axiosPrivate.get(`/display/${id}`);

/**
 * Realiza una solicitud para crear una nueva pantalla de visualización.
 * @param {Object} data - Datos de la pantalla de visualización a crear. 
 */
export const createDisplayRequest = async (data: any) =>
  // Realiza una solicitud POST utilizando la instancia de Axios configurada para solicitudes privadas
  axiosPrivate.post("/display", data);

/**
 * Realiza una solicitud para actualizar los detalles de una pantalla de visualización existente.
 * @param {Object} data - Datos actualizados de la pantalla de visualización.
 * @param {number} id - Identificador único de la pantalla de visualización a actualizar. 
 */
export const updateDisplayRequest = async (
  data: any,
  id: number
) =>
  // Realiza una solicitud PUT utilizando la instancia de Axios configurada para solicitudes privadas
  axiosPrivate.put(`/display/${id}`, data);

/**
 * Realiza una solicitud para eliminar una pantalla de visualización existente.
 * @param {number} id - Identificador único de la pantalla de visualización a eliminar. 
 */
export const deleteDisplayRequest = async (id: number) =>
  // Realiza una solicitud DELETE utilizando la instancia de Axios configurada para solicitudes privadas
  axiosPrivate.delete(`/display/${id}`);
