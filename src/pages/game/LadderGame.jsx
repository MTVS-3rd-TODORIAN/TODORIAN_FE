'use client'

import { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import Sidebar from "../../components/Sidebar"

export default function LadderGame() {
  const [bet, setBet] = useState(10)
  const [result, setResult] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedLadder, setSelectedLadder] = useState(null)
  const [winningLadder, setWinningLadder] = useState(null)

  const ladders = [1, 2]

  const startGame = () => {
    if (bet < 1) {
      setResult('배팅 금액은 1 이상이어야 합니다.')
      return
    }
    setGameStarted(true)
    setWinningLadder(Math.floor(Math.random() * 2) + 1)
    setResult('')
  }

  const calculateReward = (betAmount) => {
    let reward = betAmount * 1.8
    if (Math.random() < 0.1) {
      reward = betAmount * 3
    }
    return Math.floor(reward)
  }

  const selectLadder = (ladder) => {
    if (gameStarted) {
      setSelectedLadder(ladder)
      if (ladder === winningLadder) {
        const reward = calculateReward(bet)
        setResult(`둘 중에 뭐를 고를까 하다가 딱 골랐는뎅 ${reward} 코인도 얻고 완전 럭키비키잖앙😊🍀`)
      } else {
        setResult(`${bet} 코인을 잃다니 완전 언럭키비키잖앙😭😿`)
      }
      setGameStarted(false)
    }
  }

  const resetGame = () => {
    setBet(10)
    setResult('')
    setGameStarted(false)
    setSelectedLadder(null)
    setWinningLadder(null)
  }

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
              <div>
                <Label htmlFor="bet">배팅 코인:</Label>
                <Input
                  id="bet"
                  type="number"
                  value={bet}
                  onChange={(e) => setBet(Number(e.target.value))}
                  min={1}
                  className="mt-1"
                />
              </div>
              <Button onClick={startGame} disabled={gameStarted} className="w-full">
                게임 시작
              </Button>
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
              {result && (
                <div className="text-center font-bold mt-4">
                  <p>{result}</p>
                  <Button onClick={resetGame} className="mt-2">
                    다시 하기
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
