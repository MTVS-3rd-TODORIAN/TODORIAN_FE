'use client'

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import Sidebar from "../../components/Sidebar";
import { getTotalCoinAmountOfMember, updateCoinAmount } from "../../api/coin"; 
import { getMemberId } from '../../api/member';

export default function LadderGame() {
  const defaultBetSize = "1"; // 기본 배팅 금액을 문자열로 설정
  const ladders = [1, 2];

  const [bet, setBet] = useState(defaultBetSize);
  const [result, setResult] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLadder, setSelectedLadder] = useState(null);
  const [winningLadder, setWinningLadder] = useState(null);
  const [totalCoins, setTotalCoins] = useState(0);
  const [loadingCoins, setLoadingCoins] = useState(true);
  const [loadingGame, setLoadingGame] = useState(false); // 게임 로딩 상태 추가

  // 컴포넌트 마운트 시 총 코인 수량 가져오기
  useEffect(() => {
    const fetchTotalCoins = async () => {
      try {
        const coins = await getTotalCoinAmountOfMember();
        setTotalCoins(coins);
      } catch (error) {
        console.error('Failed to fetch total coin amount:', error);
      } finally {
        setLoadingCoins(false);
      }
    };
    fetchTotalCoins();
  }, []);

  const startGame = async () => {
    const betAmount = Number(bet); // 문자열을 숫자로 변환

    if (isNaN(betAmount) || betAmount < 1 || !Number.isInteger(betAmount)) {
      setResult('배팅 금액은 1 이상의 정수여야 합니다. 다시 입력해주세요.');
      return;
    }
    
    setLoadingGame(true); // 요청 시작 시 로딩 상태 설정

    try {
      setGameStarted(true);
      setWinningLadder(Math.floor(Math.random() * 2) + 1);
      setResult('');
      setSelectedLadder(null);
    } catch (error) {
      console.error('Failed to start game:', error);
    } finally {
      setLoadingGame(false); // 요청 완료 후 로딩 상태 해제
    }
  };

  const selectLadder = async (ladder) => {
    if (gameStarted && !loadingGame) { // 로딩 중이 아닐 때만 실행
      setSelectedLadder(ladder);
      const memberId = await getMemberId();
      const coinDateTime = new Date().toISOString();

      let coinAmount;

      if (ladder === winningLadder) {
        coinAmount = Math.floor(Number(bet) * 0.8); 
        setResult(`축하합니다! ${coinAmount} 코인을 얻었습니다! 🎉`);
      } else {
        coinAmount = -Number(bet); 
        setResult(`${bet} 코인을 잃었습니다. 😢`);
      }

      const coinData = {
        memberId,
        coinDateTime,
        coinAmount,
        coinReason: ladder === winningLadder ? "GAME_WIN" : "GAME_LOSE",
        coinForeignId: 1
      };

      await updateCoinAmount(coinData); // 코인 업데이트 요청
      
      const coins = await getTotalCoinAmountOfMember();
      setTotalCoins(coins);
      setGameStarted(false);
    }
  };

  const renderBetInput = () => (
    <div>
      <Label htmlFor="bet">배팅 코인:</Label>
      <Input
        id="bet"
        type="text" // 문자열로 입력받기 위해 type을 text로 설정
        value={bet}
        onChange={(e) => setBet(e.target.value)} // 문자열로 상태 업데이트
      />
    </div>
  );

  const renderLadderButtons = () => (
    <div className="grid grid-cols-2 gap-2">
      {ladders.map((ladder) => (
        <Button
          key={ladder}
          onClick={() => selectLadder(ladder)}
          disabled={!gameStarted || selectedLadder !== null || loadingGame} 
          className={`h-20 ${selectedLadder === ladder ? 'bg-primary' : ''} ${
            winningLadder === ladder && !gameStarted ? 'bg-green-500' : ''
          }`}
        >
          {ladder}
        </Button>
      ))}
    </div>
  );

  const renderResult = () => (
    result && (
      <div className="text-center font-bold mt-4">
        <p>{result}</p>
      </div>
    )
  );

  const renderTotalCoins = () => (
    <div className="text-center font-bold mt-4">
      {loadingCoins ? (
        <p>로딩 중...</p>
      ) : (
        <p>현재 총 코인: {totalCoins} 코인</p>
      )}
    </div>
  );

  const renderLoadingMessage = () => (
    loadingGame && (
      <div className="text-center font-bold mt-4">
        <p>요청 중...</p>
      </div>
    )
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">🍀럭키비키💚 게임</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {renderTotalCoins()} 
              {renderBetInput()}
              <Button 
                onClick={startGame} 
                disabled={gameStarted || loadingGame} 
                className={`w-full ${gameStarted ? 'bg-green-500 hover:bg-green-500' : ''}`}
              >
                게임 시작
              </Button>
              {renderLoadingMessage()} {/* 요청 중 메시지 표시 */}
              {renderLadderButtons()}
              {renderResult()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}