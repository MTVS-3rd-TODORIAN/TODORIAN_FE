import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChickImg from '../../assets/images/mainPage/mainChick.png';
import { signup } from '../../api/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {

    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    try {
      // 회원가입 API 호출
      const res = await signup(nickName, email, password, confirmPassword);
      console.log('Signup successful:', res);

      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <SignupContainer>
      <SignupForm>
        <Title>회원가입</Title>
        <InputForm>
          <ChickImage src={ChickImg} alt="Chick" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Nickname"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SignupButton onClick={handleSignup}>회원가입</SignupButton>
        </InputForm>
      </SignupForm>
    </SignupContainer>
  );
};

export default SignUp;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #f7f4f0;
  padding: 0;
  margin: 0;
`;

const Title = styled.h1`
  font-size: 5rem;
  color: #d4886e;
  margin-bottom: 30px;
`;

const SignupForm = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff6e6;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
`;

const ChickImage = styled.img`
  width: 250px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 15px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  font-size: 1.2rem;
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #ffd233;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fbc02d;
  }
`;
