import axios from 'axios';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
// const VITE_LOCALHOST_URL = import.meta.env.VITE_LOCALHOST_URL;

export const requestApi = axios.create({
  baseURL: VITE_BASE_URL,
  // baseURL: VITE_LOCALHOST_URL,
});

const getToken = () => {
  const userDataString = localStorage.getItem('@user-auth-storage');

  let token = '';

  if (userDataString) {
    const userData = JSON.parse(userDataString);
    token = userData?.state?.user?.token;
  }

  return token;
};

requestApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
