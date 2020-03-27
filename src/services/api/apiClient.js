// import axios from 'axios';

// const LOCATION_HEADER = 'Location';
// const headers = {};

// const instance = axios.create({
//   withCredentials: true,
//   headers,
// });

// instance.interceptors.response.use(response => {
//   return response;
// }, err => {
//   if (err.status === 401 && err.headers[LOCATION_HEADER]) {
//     window.location = err.headers[LOCATION_HEADER];
//   }
//   return Promise.reject(err);
// });

// export const setHeader = (key, value) => {
//   headers[key] = value;
// };

// export const get = async (url, params, config) => {
//   const response = await instance({
//     method: 'GET',
//     url,
//     params,
//     ...config,
//   });
//   return response.data;
// };

// export const post = async (url, data, params, config) => {
//   const response = await instance({
//     method: 'POST',
//     url,
//     params,
//     data,
//     ...config,
//   });
//   return response.data;
// };


// export const put = async (url, data, params, config) => {
//   const response = await instance({
//     method: 'PUT',
//     url,
//     params,
//     data,
//     ...config,
//   });
//   return response.data;
// };

// export const patch = async (url, data, params, config) => {
//   const response = await instance({
//     method: 'PATCH',
//     url,
//     params,
//     data,
//     ...config,
//   });
//   return response.data;
// };
// export default instance;
