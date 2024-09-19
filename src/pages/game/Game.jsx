import { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';

import LadderImg from '../../assets/images/gamePage/ladder.png';
import SoccerBallImg from '../../assets/images/gamePage/soccerBall.png';
import BaseBallImg from '../../assets/images/gamePage/baseBall.png';
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

const games = [
  {
    id: 1,
    title: "사다리 게임",
    image: LadderImg,
  },
  {
    id: 2,
    title: "야구 게임",
    image: BaseBallImg,
  },
  {
    id: 3,
    title: "축구 게임",
    image: SoccerBallImg,
  }
];

export default function GameBrowser() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <Container>
      <Sidebar />
      <ContentContainer>
        <GameGrid>
          {games.map((game) => (
            <GameItem key={game.id} onClick={() => setSelectedGame(game)}>
              <ImageStyle src={game.image} alt={game.title} />
              <GameTitle>{game.title}</GameTitle>
            </GameItem>
          ))}
        </GameGrid>
        <ChickContainer>
          <ImageStyle src={ChickImg} alt="Chick" /> 
          <SpeechBubble>
            {selectedGame
              ? `${selectedGame.title}을(를) 선택하셨네요! 좋은 선택이에요!`
              : "어떤 게임을 해볼까요? 게임을 선택해주세요!"}
          </SpeechBubble>
        </ChickContainer>
      </ContentContainer>
    </Container>
  );
}