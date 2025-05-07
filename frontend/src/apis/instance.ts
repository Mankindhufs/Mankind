import axios, { AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'server',
  timeout: 5000,
  headers: {
    accept: 'application/json',
  },
});
