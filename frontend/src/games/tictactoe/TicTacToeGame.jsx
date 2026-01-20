import { useEffect, useState } from 'react';
import TicTacToeBoard from './TicTacToeBoard';
import {
  createEmptyBoard,
  checkWinner,
  getRandomAIMove,
  PLAYER,
  AI
} from './tictactoe.logic';

export default function TicTacToeGame({
  state,
  score,
  setScore,
  startGame,
  endGame
}) {
  const [board, setBoard] = useState(createEmptyBoard());

  // reset when start
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

    const result = checkWinner(newBoard);
    if (result) return finishGame(result, newBoard);

    // AI move
    const move = getRandomAIMove(newBoard);
    if (move) {
      const [aiI, aiJ] = move;
      newBoard[aiI][aiJ] = AI;
      setBoard([...newBoard]);

      const aiResult = checkWinner(newBoard);
      if (aiResult) finishGame(aiResult, newBoard);
    }
  };

  const finishGame = (result) => {
    if (result === PLAYER) {
      setScore(100);
      endGame('win');
    } else if (result === AI) {
      setScore(0);
      endGame('lose');
    } else {
      setScore(50);
      endGame('draw');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Tic Tac Toe</h3>

      {state === 'idle' && (
        <button
          onClick={startGame}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Start Game
        </button>
      )}

      {state === 'playing' && (
        <TicTacToeBoard
          board={board}
          onCellClick={handlePlayerMove}
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
