import { useEffect, useState, useRef } from 'react';
import Match3Board from './Match3Board';
import {
  createBoard,
  findMatches,
  clearMatches,
  BOARD_SIZE
} from './match3.logic';
import { useBoardCursor } from '../engine/useBoardCursor';

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

  const {
    cursor,
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
    resetCursor
  } = useBoardCursor({
    rows: BOARD_SIZE,
    cols: BOARD_SIZE,
    enabled: state === 'playing'
  });

  useEffect(() => {
    if (state === 'playing') {
      setBoard(createBoard());
      setScore(0);
      setSelected(null);
      resetCursor();
      endedRef.current = false;
    }
  }, [state]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const swapCells = (a, b) => {
    const newBoard = board.map(r => [...r]);
    [newBoard[a[0]][a[1]], newBoard[b[0]][b[1]]] =
      [newBoard[b[0]][b[1]], newBoard[a[0]][a[1]]];
    return newBoard;
  };

  const handleEnter = () => {
    const { row, col } = cursor;

    // First selection
    if (!selected) {
      setSelected([row, col]);
      return;
    }

    const [x, y] = selected;
    const newBoard = swapCells([x, y], [row, col]);

    const matches = findMatches(newBoard);
    if (matches.length > 0) {
      setScore(s => s + matches.length * 10);
      setBoard(clearMatches(newBoard, matches));
    } else {
      setBoard(newBoard);
    }

    setSelected(null);
  };

  /**
   * Keyboard mapping
   */
  useEffect(() => {
    if (state !== 'playing') return;

    const handleKey = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowUp':
          moveUp();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'Enter':
          handleEnter();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state, cursor, selected]);

  /**
   * End game after 60s
   */
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
          <Match3Board
            board={board}
            cursor={cursor}
            selected={selected}
            onCellClick={(i, j) => {
              setSelected(selected ? null : [i, j]);
            }}
          />
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
