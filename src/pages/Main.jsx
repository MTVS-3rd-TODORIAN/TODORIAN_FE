// import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import ChickImg from '../assets/images/mainPage/mainChick.png';

const Main = () => {
  const navigate = useNavigate();
  const userName = "Dorian"; // Replace with dynamic user data as needed.

  return (
    <MainContainer>
      <Title>ToDorian</Title>
      <ContentContainer>
        <MenuButtonContainer>
          <MenuButton onClick={() => navigate('/today-deal')}>오늘의 할일</MenuButton>
          <MenuButton onClick={() => navigate('/calendar')}>달력</MenuButton>
          <MenuButton onClick={() => navigate('/feed')}>밥 주러 가기</MenuButton>
          <MenuButton onClick={() => navigate('/my-page')}>마이 페이지</MenuButton>
        </MenuButtonContainer>
        <ChickContainer>
          <ChickImage src={ChickImg} alt="Chick" />
          <SpeechBubble>
            {userName}! 반가워!!<br />원하는 메뉴를 클릭해서 이동해 봐~
          </SpeechBubble>
        </ChickContainer>
        <MenuButtonContainer>
          <MenuButton onClick={() => navigate('/farm')}>농장</MenuButton>
          <MenuButton onClick={() => navigate('/closet')}>옷장</MenuButton>
          <MenuButton onClick={() => navigate('/friends')}>친구</MenuButton>
          <MenuButton onClick={() => navigate('/game')}>게임하기</MenuButton>
        </MenuButtonContainer>
      </ContentContainer>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f4f0;
  padding: 0; /* 여백 제거 */
  margin: 0; /* 여백 제거 */
  overflow: hidden; /* 스크롤바 발생 방지 */
  width: 100vw; /* 전체 뷰포트 너비 사용 */
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #d4886e;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 공간을 균등하게 분배 */
  align-items: center;
  width: 100%;
  max-width: 1200px;
`;

const MenuButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 0 20px; /* 좌우 여백 조정 */
`;

const MenuButton = styled.button`
  width: 200px;
  padding: 15px;
  background-color: #f6b693;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f08a5d;
  }
`;

const ChickContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ChickImage = styled.img`
  width: 400px;
  margin-bottom: 20px;
`;

const SpeechBubble = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 10px;
  width: 250px;
  padding: 20px;
  font-size: 1.2rem;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -20px;
    border-width: 20px;
    border-style: solid;
    border-color: transparent transparent transparent #ffffff;
  }
`;
