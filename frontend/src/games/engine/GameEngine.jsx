import { useState } from 'react';
import { GAME_STATE } from './gameState';
import { useTimer } from './useTimer';
import { useKeyboard } from './useKeyboard';
import {
  saveGame,
  loadGame,
  hasSavedGame,
  clearSavedGame
} from './saveLoad';

export default function GameEngine({
  gameCode,
  children,
  onEnd,
  onBack,
  onHint
}) {
  const [state, setState] = useState(GAME_STATE.IDLE);
  const [score, setScore] = useState(0);

  const { time, resetTimer, setTime } = useTimer(state);

  const canResume = hasSavedGame(gameCode);

  // ESC = save + back
  useKeyboard(
    {
      onBack: () => {
        save();
        onBack?.();
      },
      onHint
    },
    state === GAME_STATE.PLAYING
  );

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

  /**
   * ===== SAVE / RESUME =====
   */
  const save = () => {
    saveGame(gameCode, {
      score,
      time
    });
  };

  const resume = () => {
    const saved = loadGame(gameCode);
    if (!saved) return;


    // Resume 
    setScore(saved.score ?? 0);
    setTime(saved.time ?? 0);
    setState(GAME_STATE.PLAYING);
  };

  return children({
    state,
    score,
    time,
    startGame,
    endGame,
    save,
    resume,
    canResume
  });
}
