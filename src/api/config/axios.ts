import axios from 'axios';

/**
 * The base URL for all HTTP requests.
 *
 * @const {string} baseURL - The base URL derived from the VITE_PUBLIC_URL
 * environment variable.
 */
const baseURL = import.meta.env.VITE_PUBLIC_URL;

/**
 * Custom Axios instance for making HTTP requests.
 *
 * This module creates an Axios instance with a base URL sourced from
 * environment variables. It also configures a response interceptor
 * to handle errors uniformly across the application.
 *
 * @module http
 * @see {@link https://axios-http.com/} for more details on Axios usage.
 */
const http = axios.create({
  baseURL,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const error: string = (err as any)?.message?.toString() || 'Error';
    return Promise.reject(error);
  }
);

/**
 * The configured Axios instance.
 *
 * @constant {AxiosInstance} http - The instance for making HTTP requests.
 */
export default http;
