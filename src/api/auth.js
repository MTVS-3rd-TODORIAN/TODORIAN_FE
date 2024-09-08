import axios from 'axios';

export const login = async (email, password) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const res = await axios.post(`${baseURL}/auth/login`, {
    email: email,
    password: password,
  });

  return res.data;
};
