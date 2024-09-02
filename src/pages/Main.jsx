
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
          <MenuButton onClick={() => navigate('/today-deal')}>오늘의 할인</MenuButton>
          <MenuButton onClick={() => navigate('/calendar')}>달력</MenuButton>
          <MenuButton onClick={() => navigate('/feed')}>밥 주러 가기</MenuButton>
          <MenuButton onClick={() => navigate('/my-page')}>마이 페이지</MenuButton>
        </MenuButtonContainer>
        <div>
          <ChickImage src={ChickImg} alt="Chick" />
          <SpeechBubble>
            {userName}! 반가워!!<br />원하는 메뉴를 클릭해서 이동해 봐~
          </SpeechBubble>
        </div>
        <MenuButtonContainer>
          <MenuButton onClick={() => navigate('/farm')}>농장</MenuButton>
          <MenuButton onClick={() => navigate('/closet')}>옷장</MenuButton>
          <MenuButton onClick={() => navigate('/friends')}>친구</MenuButton>
          <MenuButton onClick={() => navigate('/play')}>게임하기</MenuButton>
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
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #d4886e;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

const MenuButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MenuButton = styled.button`
  width: 150px;
  padding: 10px;
  background-color: #f6b693;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f08a5d;
  }
`;

const ChickImage = styled.img`
  width: 300px;
`;

const SpeechBubble = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 10px;
  width: 220px;
  padding: 15px;
  font-size: 1rem;
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
