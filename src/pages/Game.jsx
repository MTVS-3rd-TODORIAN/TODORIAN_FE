import React, { useState } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #f7f4f0;
  padding: 20px;
  margin: 0;
  overflow-x: hidden;
  width: 100vw;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #d4886e;
  margin-bottom: 20px;
  text-align: center;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
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

const GameImage = styled.img`
  width: 100%;
  height: 150px;
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
`;

const ChickImage = styled.img`
  width: 200px;
  margin-bottom: 20px;
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

const games = [  { id: 1, title: "퍼즐 게임", image: "/placeholder.svg?height=150&width=200" },  { id: 2, title: "액션 게임", image: "/placeholder.svg?height=150&width=200" },  { id: 3, title: "전략 게임", image: "/placeholder.svg?height=150&width=200" },  { id: 4, title: "롤플레잉 게임", image: "/placeholder.svg?height=150&width=200" },  { id: 5, title: "시뮬레이션 게임", image: "/placeholder.svg?height=150&width=200" },  { id: 6, title: "스포츠 게임", image: "/placeholder.svg?height=150&width=200" },];

export default function GameBrowser() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <MainContainer>
      <Title>게임 브라우저</Title>
      <ContentContainer>
        <GameGrid>
          {games.map((game) => (
            <GameItem key={game.id} onClick={() => setSelectedGame(game)}>
              <GameImage src={game.image} alt={game.title} />
              <GameTitle>{game.title}</GameTitle>
            </GameItem>
          ))}
        </GameGrid>
        <ChickContainer>
          <ChickImage src="/placeholder.svg?height=200&width=200" alt="Chick" />
          <SpeechBubble>
            {selectedGame
              ? `${selectedGame.title}을(를) 선택하셨네요! 좋은 선택이에요!`
              : "어떤 게임을 해볼까요? 게임을 선택해주세요!"}
          </SpeechBubble>
        </ChickContainer>
      </ContentContainer>
    </MainContainer>
  );
}
