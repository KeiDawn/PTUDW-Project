import { useEffect, useState } from 'react';
import MemoryBoard from './MemoryBoard';
import { createCards, allMatched } from './memory.logic';

export default function MemoryGame({
  state,
  startGame,
  endGame
}) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (state === 'playing') {
      setCards(createCards());
      setFlipped([]);
      setScore(0);
    }
  }, [state]);

  const handleCardClick = (id) => {
    if (flipped.length === 2) return;

    setCards(prev =>
      prev.map(c =>
        c.id === id ? { ...c, flipped: true } : c
      )
    );
    setFlipped(prev => [...prev, id]);
  };

  useEffect(() => {
    if (flipped.length !== 2) return;

    const [a, b] = flipped;
    const c1 = cards.find(c => c.id === a);
    const c2 = cards.find(c => c.id === b);

    if (!c1 || !c2) return;

    if (c1.value === c2.value) {
      setCards(prev =>
        prev.map(c =>
          c.value === c1.value ? { ...c, matched: true } : c
        )
      );
      setScore(s => s + 20);
      setFlipped([]);
    } else {
      setTimeout(() => {
        setCards(prev =>
          prev.map(c =>
            c.id === a || c.id === b
              ? { ...c, flipped: false }
              : c
          )
        );
        setFlipped([]);
      }, 800);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (cards.length && allMatched(cards)) {
      endGame('win', score || 1);
    }
  }, [cards, score, endGame]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Memory</h3>

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
          <MemoryBoard cards={cards} onCardClick={handleCardClick} />
        </>
      )}

      {state === 'end' && (
        <p className="font-bold text-blue-600">
          Completed – Score: {score}
        </p>
      )}
    </div>
  );
}
