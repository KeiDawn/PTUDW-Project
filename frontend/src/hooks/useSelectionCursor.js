import { useState } from 'react';

export function useSelectionCursor({
  length,
  enabled = true
}) {
  const [index, setIndex] = useState(0);

  const moveLeft = () => {
    if (!enabled) return;
    setIndex(i => Math.max(0, i - 1));
  };

  const moveRight = () => {
    if (!enabled) return;
    setIndex(i => Math.min(length - 1, i + 1));
  };

  const reset = () => setIndex(0);

  return {
    index,
    setIndex,
    moveLeft,
    moveRight,
    reset
  };
}
