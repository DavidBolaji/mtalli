// import axios from 'axios'

// export const url =
//   process.env.NEXT_PUBLIC_ENV === 'prod'
//     ? process.env.NEXT_PUBLIC_PROD
//     : process.env.NEXT_PUBLIC_DEV

// const Axios = axios.create({
//   baseURL: url,
// })

// Axios.interceptors.request.use(
//   async (config) => {
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// Axios.interceptors.response.use(
//   async (response) => {
//     return response
//   },
//   async (error) => {
//     const prevRequest = error?.config;
//     if (error?.response?.status === 401) {
//       return Promise.reject(error);
//     } else if (error?.response?.status === 403 && !prevRequest?.sent) {
//       prevRequest.sent = true;
//       try {
//         const { token } = await Axios.get<null, { token: string }>('/user/refresh');
//         prevRequest.headers.Authorization = `Bearer ${token}`;
//         return Axios(prevRequest);
//       } catch (refreshError) {
//         console.error('Error refreshing token:', refreshError);
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
// }
// )

// export { Axios }
