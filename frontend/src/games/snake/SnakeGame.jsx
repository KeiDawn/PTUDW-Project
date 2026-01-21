import { useEffect, useState, useRef } from 'react';
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
  const [gameOver, setGameOver] = useState(false);

  const endedRef = useRef(false);

  /**
   * Reset game when start
   */
  useEffect(() => {
    if (state === 'playing') {
      const initial = createInitialSnake();
      setSnake(initial);
      setFood(createFood(initial));
      setDirection(DIRECTIONS.RIGHT);
      setScore(0);
      setGameOver(false);
      endedRef.current = false; 
    }
  }, [state]);

  /**
   * Game loop
   */
  useEffect(() => {
    if (state !== 'playing' || gameOver) return;

    const interval = setInterval(() => {
      setSnake(prev => {
        const next = moveSnake(prev, direction);

        if (checkCollision(next)) {
          setGameOver(true);
          return prev;
        }

        const head = next[0];
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          setFood(createFood(next));
          return [...next, prev[prev.length - 1]];
        }

        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [state, direction, food, gameOver]);

  /**
   * End game 
   */
  useEffect(() => {
    if (
      state === 'playing' &&
      gameOver &&
      !endedRef.current
    ) {
      endedRef.current = true;
      endGame('lose', score || 1);
    }
  }, [gameOver, score, state, endGame]);


  useEffect(() => {
    const handleKey = e => {
      if (state !== 'playing') return;
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
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state]);

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
          Game Over – Score: {score}
        </p>
      )}
    </div>
  );
}
