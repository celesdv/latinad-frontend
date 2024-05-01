import axios from "./axios";

export const loginRequest = async (user: any) => axios.post(`/login`, user);
