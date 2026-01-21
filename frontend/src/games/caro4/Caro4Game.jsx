import { useEffect, useState } from 'react';
import Caro4Board from './Caro4Board';
import {
  createEmptyBoard,
  checkWinner,
  getRandomAIMove,
  PLAYER,
  AI,
  BOARD_SIZE
} from './caro4.logic';
import { useBoardCursor } from '../engine/useBoardCursor';

export default function Caro4Game({
  state,
  score,
  startGame,
  endGame
}) {
  const [board, setBoard] = useState(createEmptyBoard());

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
      setBoard(createEmptyBoard());
      resetCursor();
    }
  }, [state]);

  const handleMove = (i, j) => {
    if (board[i][j]) return;

    const newBoard = board.map(r => [...r]);
    newBoard[i][j] = PLAYER;
    setBoard(newBoard);

    let result = checkWinner(newBoard);
    if (result) return finishGame(result);

    const aiMove = getRandomAIMove(newBoard);
    if (aiMove) {
      const [x, y] = aiMove;
      newBoard[x][y] = AI;
      setBoard([...newBoard]);

      result = checkWinner(newBoard);
      if (result) finishGame(result);
    }
  };

  const handleEnter = () => {
    handleMove(cursor.row, cursor.col);
  };

  const finishGame = (result) => {
    if (result === PLAYER) {
      endGame('win', 100);
    } else if (result === AI) {
      endGame('lose', 1);
    } else {
      endGame('draw', 50);
    }
  };

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
  }, [state, cursor]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Caro 4</h3>

      {state === 'idle' && (
        <button
          onClick={startGame}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Start Game
        </button>
      )}

      {state === 'playing' && (
        <Caro4Board
          board={board}
          cursor={cursor}
          onCellClick={handleMove}
        />
      )}

      {state === 'end' && (
        <p className="font-bold text-blue-600">
          Game Over – Score: {score}
        </p>
      )}
    </div>
  );
}
