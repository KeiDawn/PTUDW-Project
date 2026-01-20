import { useEffect, useRef, useState } from 'react';

export function useTimer(gameState) {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (gameState === 'playing') {
      intervalRef.current = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [gameState]);

  const resetTimer = () => setTime(0);

  return { time, resetTimer };
}
