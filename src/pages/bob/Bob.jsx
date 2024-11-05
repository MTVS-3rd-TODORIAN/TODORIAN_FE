import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import axiosInstance from '../../axios/AxiosInstance';

const Container = styled.div`
  display: flex;
  background-color: #f8f4ef;
  color: #000000;
  height: 100vh;
  width: 100vw;
`;


const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const CharacterName = styled.h1`
  font-size: 36px;
  color: #d77a61;
  margin-bottom: 20px;
`;

const CharacterImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin-top: 20px;
`;

const GrowthPoints = styled.div`
  font-size: 20px;
  color: #555;
`;

const FoodIcon = styled.div`
  width: 100px;
  height: 100px;
  background-image: url('/path/to/food-icon.png'); // 실제 이미지 경로로 변경
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const FeedButton = styled.button`
  background-color: #f8a978;
  border: none;
  color: white;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #d77a61;
  }
`;

const ProgressBar = styled.div`
  width: 70%;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
`;

const ProgressFill = styled.div`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: #76c7c0;
`;

const LevelText = styled.h2`
  font-size: 24px;
  color: #555;
  margin-top: 10px;
`;


function Bob() {
    const [character, setCharacter] = useState({
      name: '삐약이',
      experience: 0, // 초기 진행률
      level: 1, // 초기 단계
      remainingPoints: 0 // 초기 성장 포인트
    });
  
    useEffect(() => {
      const fetchCharacterData = async () => {
        try {
          const response = await axiosInstance.get('/member-character/find-one');
          const { success, response: characterData } = response.data;
  
          if (success) {
            setCharacter({
              name: '삐약이',
              experience: characterData.usedGrowthPoint % 100, // 경험치는 사용된 성장 포인트를 기준으로 계산
              level: characterData.step,
              remainingPoints: characterData.growthPoint
            });
          }
        } catch (error) {
          console.error('Failed to fetch character data:', error);
        }
      };
  
      fetchCharacterData();
    }, []);
  
    const handleFeed = () => {
      setCharacter((prevCharacter) => {
        if (prevCharacter.remainingPoints <= 0) return prevCharacter; // 성장 포인트가 0 이하로 내려가지 않음
  
        let newExperience = prevCharacter.experience + 10;
        let newLevel = prevCharacter.level;
        let newRemainingPoints = prevCharacter.remainingPoints - 10;
  
        if (newExperience >= 100) {
          newExperience = 0;
          newLevel += 1;
        }
  
        return {
          ...prevCharacter,
          experience: newExperience,
          level: newLevel,
          remainingPoints: Math.max(newRemainingPoints, 0)
        };
      });
    };
  
    return (
      <Container>
        <Sidebar />
        <Content>
          <CharacterName>{character.name}</CharacterName>
          <CharacterImage src="\src\assets\images\mainPage\mainChick.png" alt="Character" /> {/* 실제 이미지 경로로 변경 */}
          <InfoContainer>
            <GrowthPoints>남은 성장 포인트 {character.remainingPoints}</GrowthPoints>
            <FoodIcon />
            <FeedButton onClick={handleFeed}>사료 주기</FeedButton>
          </InfoContainer>
          <ProgressBar>
            <ProgressFill progress={character.experience} />
          </ProgressBar>
          <LevelText>{character.level}단계</LevelText>
        </Content>
      </Container>
    );
  }

export default Bob;
