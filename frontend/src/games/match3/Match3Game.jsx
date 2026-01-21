import { useEffect, useState, useRef } from 'react';
import Match3Board from './Match3Board';
import { createBoard, findMatches, clearMatches } from './match3.logic';

export default function Match3Game({
  state,
  startGame,
  endGame
}) {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const scoreRef = useRef(0);
  const endedRef = useRef(false);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

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
    if (matches.length) {
      setScore(s => s + matches.length * 10);
      setBoard(clearMatches(newBoard, matches));
    }

    setSelected(null);
  };

  useEffect(() => {
    if (state !== 'playing') return;

    const timer = setTimeout(() => {
      if (!endedRef.current) {
        endedRef.current = true;
        endGame('win', scoreRef.current || 1);
      }
    }, 60000);

    return () => clearTimeout(timer);
  }, [state, endGame]);

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
          <Match3Board board={board} onCellClick={handleCellClick} />
        </>
      )}

      {state === 'end' && (
        <p className="font-bold text-blue-600">
          Game Over – Score: {score}
        </p>
      )}
    </div>
  );
}
