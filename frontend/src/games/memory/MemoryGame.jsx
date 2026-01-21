import { useEffect, useState, useRef } from 'react';
import MemoryBoard from './MemoryBoard';
import { createCards, allMatched, BOARD_SIZE } from './memory.logic';
import { useBoardCursor } from '../engine/useBoardCursor';

export default function MemoryGame({
  state,
  startGame,
  endGame
}) {
  const [cards, setCards] = useState([]);
  const [flippedIds, setFlippedIds] = useState([]);
  const [score, setScore] = useState(0);

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

  /**
   * Reset game when start
   */
  useEffect(() => {
    if (state === 'playing') {
      setCards(createCards());
      setFlippedIds([]);
      setScore(0);
      resetCursor();
      endedRef.current = false;
    }
  }, [state]);

  /**
   * Flip card at cursor
   */
  const flipCardAtCursor = () => {
    if (flippedIds.length === 2) return;

    const index = cursor.row * BOARD_SIZE + cursor.col;
    const card = cards[index];

    if (!card || card.flipped || card.matched) return;

    setCards(prev =>
      prev.map(c =>
        c.id === card.id ? { ...c, flipped: true } : c
      )
    );

    setFlippedIds(prev => [...prev, card.id]);
  };

  /**
   * Handle matching logic
   */
  useEffect(() => {
    if (flippedIds.length !== 2) return;

    const [id1, id2] = flippedIds;
    const c1 = cards.find(c => c.id === id1);
    const c2 = cards.find(c => c.id === id2);

    if (!c1 || !c2) return;

    if (c1.value === c2.value) {
      // Match
      setCards(prev =>
        prev.map(c =>
          c.value === c1.value
            ? { ...c, matched: true }
            : c
        )
      );
      setScore(s => s + 20);
      setFlippedIds([]);
    } else {
      // Not match → flip back
      setTimeout(() => {
        setCards(prev =>
          prev.map(c =>
            c.id === id1 || c.id === id2
              ? { ...c, flipped: false }
              : c
          )
        );
        setFlippedIds([]);
      }, 800);
    }
  }, [flippedIds, cards]);

  /**
   * End game
   */
  useEffect(() => {
    if (
      state === 'playing' &&
      cards.length &&
      allMatched(cards) &&
      !endedRef.current
    ) {
      endedRef.current = true;
      endGame('win', score || 1);
    }
  }, [cards, score, state, endGame]);

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
          flipCardAtCursor();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state, cursor, cards, flippedIds]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Memory Game</h3>

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
          <MemoryBoard
            cards={cards}
            cursor={cursor}
            onCardClick={(id) => {
              const idx = cards.findIndex(c => c.id === id);
              if (idx === -1) return;

              const r = Math.floor(idx / BOARD_SIZE);
              const c = idx % BOARD_SIZE;


              flipCardAtCursor({ row: r, col: c });
            }}
          />
        </>
      )}

      {state === 'end' && (
        <p className="font-bold text-blue-600">
          Completed! Final Score: {score}
        </p>
      )}
    </div>
  );
}
