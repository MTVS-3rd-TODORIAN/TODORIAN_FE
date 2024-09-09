import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import styled from 'styled-components';
import ChickImg from '../../assets/images/mainPage/mainChick.png';

const Login = () => {
  // useState 훅을 사용해 이메일과 비밀번호 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // login 함수 호출하여 이메일과 비밀번호 전송
      const res = await login(email, password);
      console.log('Login successful:', res);

      // 로그인 성공 시 메인 페이지로 이동
      navigate('/main');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <LoginContainer>
      <Title>ToDorian</Title>
      <LoginForm>
        <ChickImage src={ChickImg} alt="Chick" />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // 이메일 입력 값 업데이트
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 값 업데이트
        />
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f7f4f0;
  padding: 0; 
  margin: 0; 
`;

const Title = styled.h1`
  font-size: 6rem;  /* 제목을 더 크게 조정 */
  color: #d4886e;
  margin-bottom: 30px;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff6e6;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px; /* 폼의 최대 너비를 넓게 설정 */
`;

const ChickImage = styled.img`
  width: 250px; /* 이미지를 더 크게 조정 */
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 15px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1.2rem; /* 폰트 크기를 조금 더 키움 */
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #ffd233;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.5rem; /* 버튼 텍스트를 더 크게 조정 */
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fbc02d;
  }
`;
