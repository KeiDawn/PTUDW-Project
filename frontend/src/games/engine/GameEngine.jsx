import { useState, useEffect } from 'react';
import { GAME_STATE } from './gameState';
import { useTimer } from './useTimer';
import { useKeyboard } from './useKeyboard';
import { saveGame, loadGame, hasSavedGame, clearSavedGame } from './saveLoad';

export default function GameEngine({
  gameCode,
  children,
  onEnd
}) {
  const [state, setState] = useState(GAME_STATE.IDLE);
  const [score, setScore] = useState(0);

  const { time, resetTimer, setTime } = useTimer(state);

  const canResume = hasSavedGame(gameCode);

  // Keyboard: Back = save + exit
  useKeyboard({
    onBack: () => {
      save();
      setState(GAME_STATE.IDLE);
    }
  });

  const startGame = () => {
    clearSavedGame(gameCode);
    resetTimer();
    setScore(0);
    setState(GAME_STATE.PLAYING);
  };

  const endGame = (result, finalScore) => {
    setScore(finalScore);
    setState(GAME_STATE.END);
    clearSavedGame(gameCode);

    onEnd({
      score: finalScore,
      time,
      result
    });
  };

  /** ===== SAVE / LOAD ===== */

  const save = () => {
    saveGame(gameCode, {
      state,
      score,
      time
    });
  };

  const resume = () => {
    const saved = loadGame(gameCode);
    if (!saved) return;

    setScore(saved.score);
    setTime(saved.time);
    setState(GAME_STATE.PLAYING);
  };

  return children({
    state,
    score,
    time,
    gameCode,
    startGame,
    endGame,
    save,
    canResume,
    resume
  });
}
