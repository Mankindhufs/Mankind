import axios, { AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  headers: {
    accept: 'application/json',
  },
});
