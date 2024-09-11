import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChickImg from '../../assets/images/mainPage/mainChick.png';

const SignUp = () => {
  // useState 훅을 사용해 회원 가입 정보 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    // 비밀번호 확인 로직
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 회원가입 API 호출
      //const res = await signup(email, password, nickName);
      //console.log('Signup successful:', res);

      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <SignupContainer>
      <Title>회원가입</Title>
      <SignupForm>
        <ChickImage src={ChickImg} alt="Chick" />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // 이메일 입력 값 업데이트
        />
        <Input
          type="text"
          placeholder="Nickname"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)} // 닉네임 입력 값 업데이트
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 값 업데이트
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // 비밀번호 확인 입력 값 업데이트
        />
        <SignupButton onClick={handleSignup}>회원가입</SignupButton>
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
  height: 100vh;
  width: 100vw;
  background-color: #f7f4f0;
  padding: 0;
  margin: 0;
`;

const Title = styled.h1`
  font-size: 6rem;
  color: #d4886e;
  margin-bottom: 30px;
`;

const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff6e6;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
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
