import axios, { type AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL ?? "http://localhost:3001/api";

function createAxiosInstance(): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
  });

  return axiosInstance;
}

const axiosInstance = createAxiosInstance();
export { axiosInstance };
