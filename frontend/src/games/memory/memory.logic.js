export const BOARD_SIZE = 4;

export function createCards() {
  const values = [];
  for (let i = 1; i <= (BOARD_SIZE * BOARD_SIZE) / 2; i++) {
    values.push(i, i);
  }

  // Shuffle
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }

  return values.map((value, index) => ({
    id: index,
    value,
    flipped: false,
    matched: false
  }));
}

export function allMatched(cards) {
  return cards.every(c => c.matched);
}
