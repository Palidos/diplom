import axios from 'axios';

const LOCATION_HEADER = 'location';
const commonHeaders = {};

const instance = axios.create({
  withCredentials: true,
  headers: commonHeaders,
});

instance.interceptors.response.use(response => {
  if (response.status === 200 && response.headers[LOCATION_HEADER]) {
    window.location = response.headers[LOCATION_HEADER];
  }
  return response;
}, err => {
  if (err.response.status === 401 && err.response.headers[LOCATION_HEADER]) {
    window.location = err.response.headers[LOCATION_HEADER];
  }
  console.error(err);
  return Promise.reject(err.response.data);
});

export const setHeader = (key, value) => {
  commonHeaders[key] = value;
};

export const get = async (url, params, specificHeaders, config) => {
  const response = await instance({
    method: 'GET',
    url,
    headers: {
      ...commonHeaders,
      ...specificHeaders,
    },
    params,
    ...config,
  });
  return response.data;
};

export const post = async (url, data, params, specificHeaders, config) => {
  const response = await instance({
    method: 'POST',
    url,
    headers: {
      ...commonHeaders,
      ...specificHeaders,
    },
    params,
    data,
    ...config,
  });
  return response.data;
};


export const put = async (url, data, params, specificHeaders, config) => {
  const response = await instance({
    method: 'PUT',
    url,
    headers: {
      ...commonHeaders,
      ...specificHeaders,
    },
    params,
    data,
    ...config,
  });
  return response.data;
};

export const patch = async (url, data, params, specificHeaders, config) => {
  const response = await instance({
    method: 'PATCH',
    url,
    headers: {
      ...commonHeaders,
      ...specificHeaders,
    },
    params,
    data,
    ...config,
  });
  return response.data;
};

export const apiDelete = async (url, data, params, specificHeaders, config) => {
  const response = await instance({
    method: 'DELETE',
    url,
    headers: {
      ...commonHeaders,
      ...specificHeaders,
    },
    params,
    data,
    ...config,
  });
  return response.data;
};

setHeader('Time-Zone', Intl.DateTimeFormat().resolvedOptions().timeZone);

export default instance;
