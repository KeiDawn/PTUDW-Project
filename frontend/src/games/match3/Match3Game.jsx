import { useEffect, useState, useRef } from 'react';
import Match3Board from './Match3Board';
import {
  createBoard,
  findMatches,
  clearMatches
} from './match3.logic';

export default function Match3Game({
  state,
  startGame,
  endGame
}) {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const scoreRef = useRef(0);
  const endTimerRef = useRef(null);
  const endedRef = useRef(false); // 🔑 khóa endGame

  // Keep scoreRef updated
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Reset game when start
  useEffect(() => {
    if (state === 'playing') {
      setBoard(createBoard());
      setScore(0);
      setSelected(null);
      endedRef.current = false;
    }
  }, [state]);

  const handleCellClick = (i, j) => {
    if (state !== 'playing') return;

    if (!selected) {
      setSelected([i, j]);
      return;
    }

    const [x, y] = selected;
    const newBoard = board.map(r => [...r]);
    [newBoard[i][j], newBoard[x][y]] =
      [newBoard[x][y], newBoard[i][j]];

    const matches = findMatches(newBoard);
    if (matches.length > 0) {
      setScore(s => s + matches.length * 10);
      setBoard(clearMatches(newBoard, matches));
    }

    setSelected(null);
  };

  /**
   * ⏱️ End game after 60s – CHỈ CHẠY 1 LẦN
   */
  useEffect(() => {
    if (state === 'playing' && !endTimerRef.current) {
      endTimerRef.current = setTimeout(() => {
        if (!endedRef.current) {
          endedRef.current = true;
          endGame('win', scoreRef.current || 1);
        }
      }, 60000);
    }

    return () => {
      // ❌ KHÔNG clear timer ở đây
      // timer chỉ được clear khi component unmount
    };
  }, [state, endGame]);

  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      if (endTimerRef.current) {
        clearTimeout(endTimerRef.current);
        endTimerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Match 3</h3>

      {state === 'idle' && (
        <button
          onClick={startGame}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Start Game
        </button>
      )}

      {state === 'playing' && (
        <>
          <p>Score: {score}</p>
          <Match3Board
            board={board}
            onCellClick={handleCellClick}
          />
        </>
      )}

      {state === 'end' && (
        <p className="font-bold text-blue-600">
          Game Over – Final Score: {score}
        </p>
      )}
    </div>
  );
}
