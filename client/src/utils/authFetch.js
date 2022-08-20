import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';

const authFetch = axios.create({
  baseURL: 'api/v1',
});

authFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    console.log(user.token);
    if (user) {
      config.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response.status === 401) {
    //   logoutUser();
    // }
    // return Promise.reject(error);
    console.log(error);
  }
);

export default authFetch;
