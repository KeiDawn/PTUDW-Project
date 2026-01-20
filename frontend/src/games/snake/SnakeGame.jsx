import { useEffect, useState } from 'react';
import SnakeBoard from './SnakeBoard';
import {
  createInitialSnake,
  createFood,
  moveSnake,
  checkCollision,
  DIRECTIONS
} from './snake.logic';

export default function SnakeGame({
  state,
  startGame,
  endGame
}) {
  const [snake, setSnake] = useState(createInitialSnake());
  const [food, setFood] = useState(createFood(createInitialSnake()));
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Reset game
  useEffect(() => {
    if (state === 'playing') {
      const initialSnake = createInitialSnake();
      setSnake(initialSnake);
      setFood(createFood(initialSnake));
      setDirection(DIRECTIONS.RIGHT);
      setScore(0);
      setIsGameOver(false);
    }
  }, [state]);

  // Game loop
  useEffect(() => {
    if (state !== 'playing' || isGameOver) return;

    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = moveSnake(prevSnake, direction);

        if (checkCollision(newSnake)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const head = newSnake[0];
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          setFood(createFood(newSnake));
          return [...newSnake, prevSnake[prevSnake.length - 1]];
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [state, direction, food, isGameOver]);

  // End game safely (AFTER render)
  useEffect(() => {
    if (isGameOver) {
      endGame('lose', score || 1);
    }
  }, [isGameOver, score, endGame]);

  // Keyboard control
  useEffect(() => {
    const handleKey = e => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection(DIRECTIONS.UP);
          break;
        case 'ArrowDown':
          setDirection(DIRECTIONS.DOWN);
          break;
        case 'ArrowLeft':
          setDirection(DIRECTIONS.LEFT);
          break;
        case 'ArrowRight':
          setDirection(DIRECTIONS.RIGHT);
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Snake</h3>

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
          <SnakeBoard snake={snake} food={food} />
        </>
      )}

      {state === 'end' && (
        <p className="font-bold text-blue-600">
          Game Over
        </p>
      )}
    </div>
  );
}

