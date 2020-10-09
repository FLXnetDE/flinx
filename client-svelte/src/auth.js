/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { writable, get } from 'svelte/store';
import axios from 'axios';

const user = localStorage.getItem('flinxUser');
export const authStore = writable(user ? JSON.parse(user) : null);

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    const statusCode = err.response.status;
    if (statusCode === 401 || statusCode === 403) {
      authStore.set(null);
    }
  },
);

authStore.subscribe((value) => {
  if (value) {
    axios.defaults.headers.common['x-access-token'] = value.token;
    localStorage.setItem('flinxUser', JSON.stringify(value));
  } else {
    localStorage.removeItem('flinxUser');
  }
});

export function logout() {
  authStore.set(null);
  return true;
}

export function login(username, password) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:4000/api/v1/auth/login', {
      username,
      password,
    })
      .then((response) => {
        const { data } = response;
        if (data) {
          authStore.set(data);
          resolve(true);
        }
        resolve(false);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
