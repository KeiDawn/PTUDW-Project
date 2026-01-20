import { useEffect, useState } from 'react';
import FreeDrawCanvas from './FreeDrawCanvas';

export default function FreeDrawGame({
  state,
  startGame,
  endGame
}) {
  const [strokes, setStrokes] = useState(0);

  useEffect(() => {
    if (state === 'playing') {
      setStrokes(0);
    }
  }, [state]);

  const handleDraw = () => {
    setStrokes(s => s + 1);
  };

  const finish = () => {
    endGame('win', strokes || 1);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Free Draw</h3>

      {state === 'idle' && (
        <button
          onClick={startGame}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Start Drawing
        </button>
      )}

      {state === 'playing' && (
        <>
          <p>Strokes: {strokes}</p>
          <FreeDrawCanvas onDraw={handleDraw} />

          <button
            onClick={finish}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Finish
          </button>
        </>
      )}

      {state === 'end' && (
        <p className="font-bold text-blue-600">
          Drawing saved – Score: {strokes}
        </p>
      )}
    </div>
  );
}
