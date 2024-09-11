import axios from 'axios';

export const login = async (email, password) => {

  const baseURL = import.meta.env.VITE_BASE_URL;

  console.log('Login 요청 전송 전')

  // authDTO 형식으로 요청 본문을 구성
  const authDTO = {
    email: email,
    password: password
  };

  const res = await axios.post(`${baseURL}/auth/login`, authDTO); // authDTO 객체를 본문으로 전달

  const token = res.headers['Authorization'];
  const refresh = res.headers['Refresh-Token'];

  if(token && token.startsWith('Bearer ')) {
    const jwtToken = token.split(' ')[1];
    localStorage.setItem('token', jwtToken);
    console.log('토큰 저장 성공:', jwtToken);
  } else {
    console.error('Authorization 헤더에 토큰이 없습니다.');
  }

  if(refresh && refresh.startsWith('Bearer ')) {
    const refreshToken = refresh.split(' ')[1];
    localStorage.setItem('refresh', refreshToken);
    console.log('리프레시 토큰 저장 성공:', refreshToken);
  } else {
    console.error('Refresh-Token 헤더에 토큰이 없습니다.');
  }

  return res.data;
};
