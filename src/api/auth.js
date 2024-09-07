import axios from 'axios';

export const getToken = async (code, state) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const res = await axios.post(`${baseURL}/auth/login`, {
    code: code,
    state: state,
  });

  return res;
};
