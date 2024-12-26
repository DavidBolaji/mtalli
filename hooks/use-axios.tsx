"use client"

import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

// Set up the base URL for Axios
export const url = 
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_PROD
    : process.env.NEXT_PUBLIC_DEV;

const Axios = axios.create({
  baseURL: url,
});

// Custom hook to use Axios with interceptors
export const useAxios = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = Axios.interceptors.request.use(
      async (config) => config,
      (error) => Promise.reject(error)
    );

    // Response interceptor
    const responseInterceptor = Axios.interceptors.response.use(
      async (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401) {
          return Promise.reject(error);
        } else if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const { token } = await Axios.get<null, { token: string }>('/user/refresh');
            prevRequest.headers.Authorization = `Bearer ${token}`;
            return Axios(prevRequest);
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove interceptors
    return () => {
      Axios.interceptors.request.eject(requestInterceptor);
      Axios.interceptors.response.eject(responseInterceptor);
    };
  }, [queryClient]);

  return Axios;
};
