'use client'

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import Sidebar from "../../components/Sidebar";
import { getTotalCoinAmountOfMember } from "../../api/coin";

export default function LadderGame() {
  const defaultBetSize = 0;
  const ladders = [1, 2];

  const [bet, setBet] = useState(defaultBetSize);
  const [result, setResult] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLadder, setSelectedLadder] = useState(null);
  const [winningLadder, setWinningLadder] = useState(null);
  const [totalCoins, setTotalCoins] = useState(0); // 총 코인 수량 상태 추가
  const [loadingCoins, setLoadingCoins] = useState(true); // 로딩 상태 추가

  // 컴포넌트 마운트 시 총 코인 수량 가져오기
  useEffect(() => {
    const fetchTotalCoins = async () => {
      try {
        const coins = await getTotalCoinAmountOfMember();
        setTotalCoins(coins); // 총 코인 수량 상태 업데이트
      } catch (error) {
        console.error('Failed to fetch total coin amount:', error);
      } finally {
        setLoadingCoins(false); // 로딩 완료
      }
    };
    fetchTotalCoins();
  }, []);

  const startGame = () => {
    if (bet < 1) {
      setResult('배팅 금액은 1 이상이어야 합니다.');
      return;
    }
    setGameStarted(true);
    setWinningLadder(Math.floor(Math.random() * 2) + 1);
    setResult('');
    setSelectedLadder(null);
  };

  const calculateReward = (betSize) => {
    let reward = betSize * 1.8;
    let jackPotFlag = false;
    if (Math.random() < 0.1) {
      reward = betSize * 3;
      jackPotFlag = true;
    }
    return { reward: Math.floor(reward), jackPotFlag };
  };

  const selectLadder = (ladder) => {
    if (gameStarted) {
      setSelectedLadder(ladder);
      if (ladder === winningLadder) {
        const { reward, jackPotFlag } = calculateReward(bet);
        setResult(jackPotFlag 
          ? `잭팟까지 터져서 세 배로 ${reward} 코인이나 받았네? 완~저히 럭키비키니시티네!`
          : `둘 중에 뭐를 고를까 하다가 딱 골랐는뎅 ${reward} 코인도 얻고 완전 럭키비키잖앙😊🍀`);
      } else {
        setResult(`${bet} 코인을 잃다니 완전 언럭키비키잖앙😭😿`);
      }
      setGameStarted(false);
    }
  };

  const renderBetInput = () => (
    <div>
      <Label htmlFor="bet">배팅 코인:</Label>
      <Input
        id="bet"
        type="number"
        value={bet}
        onChange={(e) => setBet(Number(e.target.value))}
        min={1}
      />
    </div>
  );

  const renderLadderButtons = () => (
    <div className="grid grid-cols-2 gap-2">
      {ladders.map((ladder) => (
        <Button
          key={ladder}
          onClick={() => selectLadder(ladder)}
          disabled={!gameStarted || selectedLadder !== null}
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
              {renderTotalCoins()} {/* 총 코인 수량 표시 */}
              {renderBetInput()}
              <Button 
                onClick={startGame} 
                disabled={gameStarted} 
                className={`w-full ${gameStarted ? 'bg-green-500 hover:bg-green-500' : ''}`} // 초록색 유지
              >
                게임 시작
              </Button>
              {renderLadderButtons()}
              {renderResult()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}