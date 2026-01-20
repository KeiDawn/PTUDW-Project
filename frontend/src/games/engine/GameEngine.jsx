import { useState } from 'react';
import { GAME_STATE } from './gameState';
import { useTimer } from './useTimer';
import { useKeyboard } from './useKeyboard';
import { saveGame } from './saveLoad';

export default function GameEngine({
  gameCode,
  children,
  onEnd
}) {
  const [state, setState] = useState(GAME_STATE.IDLE);
  const [score, setScore] = useState(0);

  const { time, resetTimer } = useTimer(state);

  useKeyboard({
    onBack: () => {
      saveGame(gameCode, { state, score, time });
      setState(GAME_STATE.IDLE);
    }
  });

  const startGame = () => {
    resetTimer();
    setScore(0);
    setState(GAME_STATE.PLAYING);
  };

  const endGame = (result) => {
    setState(GAME_STATE.END);
    onEnd({ score, time, result });
  };

  return children({
    state,
    score,
    setScore,
    time,
    startGame,
    endGame
  });
}
