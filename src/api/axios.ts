import axios from "axios";

const URL = "https://challenge-front-7fw1.onrender.com";

export default axios.create({
  baseURL: URL,
});

export const axiosPrivate = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
});
