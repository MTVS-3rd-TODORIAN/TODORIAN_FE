import axios from 'axios';

export const login = async (email, password) => {

  const baseURL = import.meta.env.VITE_BASE_URL;

  const res = await axios.post(`${baseURL}/auth/login`, {
    email: email,
    password: password,
  });

  const token = res.headers['Authorization'];

  if(token && token.startsWith('Bearer ')) {
    const jwtToken = token.split(' ')[1];
    localStorage.setItem('token', jwtToken);

    console.log('토큰 저장 성공:', jwtToken);
  } else {
    console.error('Authorization 헤더에 토큰이 없습니다.');
  }

  return res.data;
};
