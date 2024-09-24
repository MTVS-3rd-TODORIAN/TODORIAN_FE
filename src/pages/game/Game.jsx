import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 추가
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';

import LadderImg from '../../assets/images/gamePage/image.png';
import SoccerBallImg from '../../assets/images/gamePage/image2.png';
import BaseBallImg from '../../assets/images/gamePage/image1.png';
import ChickImg from '../../assets/images/mainPage/mainChick.png';

const Container = styled.div`
  display: flex;
  background-color: #f8f4ef;
  height: 100vh;
  width: 100vw;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow-y: auto;
  gap: 20px;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 70%;
`;

const GameItem = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageStyle = styled.img`
  width: 200px;  
  height: 200px; 
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const GameTitle = styled.h3`
  font-size: 1.2rem;
  color: #d4886e;
  text-align: center;
`;

const ChickContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 20px;
  width: 30%;
`;

const SpeechBubble = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 10px;
  width: 200px;
  padding: 15px;
  font-size: 1rem;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  &:after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #ffffff transparent;
  }
`;

const games = [ // 게임 목록 배열
  {
    id: 1,
    title: "🍀럭키비키💚 게임", // 게임 제목
    image: LadderImg, // 게임 이미지
    path: "/game/ladder", // 각 게임의 경로
  },
  {
    id: 2,
    title: "야구 게임(준비 중)",
    image: BaseBallImg,
    path: "/game/baseball", // 각 게임의 경로
  },
  {
    id: 3,
    title: "축구 게임(준비 중)",
    image: SoccerBallImg,
    path: "/game/soccer", // 각 게임의 경로
  }
];

export default function GameBrowser() { // GameBrowser 컴포넌트 정의
  const [selectedGame, setSelectedGame] = useState(null); // 선택된 게임 상태 변수
  const navigate = useNavigate(); // navigate 훅 사용

  const handleGameSelect = (game) => { // 게임 선택 처리 함수
    setSelectedGame(game); // 선택된 게임 상태 업데이트
    navigate(game.path); // 게임 선택 시 해당 경로로 이동
  };

  return ( // 컴포넌트 반환
    <Container>
      <Sidebar /> {/*사이드바 컴포넌트 렌더링*/}
      <ContentContainer>
        <GameGrid>
          {games.map((game) => ( // 게임 목록을 맵핑하여 렌더링
          // 게임 아이템 클릭 시 선택 처리
            <GameItem key={game.id} onClick={() => handleGameSelect(game)}> 
              {/* 게임 이미지 렌더링 */}
              <ImageStyle src={game.image} alt={game.title} />
              {/* 게임 제목 렌더링 */}
              <GameTitle>{game.title}</GameTitle>
            </GameItem>
          ))}
        </GameGrid>
        <ChickContainer>
          {/*병아리 이미지 렌더링*/}
          <ImageStyle src={ChickImg} alt="Chick" />
          <SpeechBubble>

            {selectedGame // 선택된 게임에 따라 말풍선 내용 변경
              ? `${selectedGame.title}을(를) 선택하셨네요! 좋은 선택이에요!`
              : "어떤 게임을 해볼까요? 게임을 선택해주세요!"}
          </SpeechBubble>
        </ChickContainer>
      </ContentContainer>
    </Container>
  );
}