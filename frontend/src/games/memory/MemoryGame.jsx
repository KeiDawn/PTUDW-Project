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

    const [id1, id2] = flipped;
    const card1 = cards.find(c => c.id === id1);
    const card2 = cards.find(c => c.id === id2);

    if (!card1 || !card2) return;

    if (card1.value === card2.value) {
      // Match
      setCards(prev =>
        prev.map(c =>
          c.value === card1.value
            ? { ...c, matched: true }
            : c
        )
      );
      setScore(s => s + 20);
      setFlipped([]);
    } else {
      // Not match
      setTimeout(() => {
        setCards(prev =>
          prev.map(c =>
            c.id === id1 || c.id === id2
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
          <MemoryBoard cards={cards} onCardClick={handleCardClick} />
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
