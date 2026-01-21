import { useState } from 'react';

export function useBoardCursor({
  rows,
  cols,
  enabled = true
}) {
  const [cursor, setCursor] = useState({ row: 0, col: 0 });

  const moveLeft = () => {
    if (!enabled) return;
    setCursor(c => ({
      ...c,
      col: Math.max(0, c.col - 1)
    }));
  };

  const moveRight = () => {
    if (!enabled) return;
    setCursor(c => ({
      ...c,
      col: Math.min(cols - 1, c.col + 1)
    }));
  };

  const moveUp = () => {
    if (!enabled) return;
    setCursor(c => ({
      ...c,
      row: Math.max(0, c.row - 1)
    }));
  };

  const moveDown = () => {
    if (!enabled) return;
    setCursor(c => ({
      ...c,
      row: Math.min(rows - 1, c.row + 1)
    }));
  };

  const resetCursor = () => {
    setCursor({ row: 0, col: 0 });
  };

  return {
    cursor,
    setCursor,
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
    resetCursor
  };
}
