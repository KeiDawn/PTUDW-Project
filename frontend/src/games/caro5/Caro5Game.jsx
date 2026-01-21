import { useEffect, useState } from 'react';
import Caro5Board from './Caro5Board';
import {
  createEmptyBoard,
  checkWinner,
  getRandomAIMove,
  PLAYER,
  AI
} from './caro5.logic';

export default function Caro5Game({
  state,
  score,
  startGame,
  endGame
}) {
  const [board, setBoard] = useState(createEmptyBoard());

  useEffect(() => {
    if (state === 'playing') {
      setBoard(createEmptyBoard());
    }
  }, [state]);

  const handlePlayerMove = (i, j) => {
    if (state !== 'playing') return;
    if (board[i][j]) return;

    const newBoard = board.map(r => [...r]);
    newBoard[i][j] = PLAYER;
    setBoard(newBoard);

    let result = checkWinner(newBoard);
    if (result) return finishGame(result);

    const move = getRandomAIMove(newBoard);
    if (move) {
      const [x, y] = move;
      newBoard[x][y] = AI;
      setBoard([...newBoard]);

      result = checkWinner(newBoard);
      if (result) finishGame(result);
    }
  };

  const finishGame = (result) => {
    if (result === PLAYER) {
      endGame('win', 300);
    } else if (result === AI) {
      endGame('lose', 1);
    } else {
      endGame('draw', 150);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Caro 5</h3>

      {state === 'idle' && (
        <button
          onClick={startGame}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Start Game
        </button>
      )}

      {state === 'playing' && (
        <Caro5Board board={board} onCellClick={handlePlayerMove} />
      )}

      {state === 'end' && (
        <p className="font-bold text-blue-600">
          Game Over – Score: {score}
        </p>
      )}
    </div>
  );
}
