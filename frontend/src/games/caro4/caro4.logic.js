export const EMPTY = null;
export const PLAYER = 'X';
export const AI = 'O';

export const BOARD_SIZE = 10;
export const WIN_COUNT = 4;

export function createEmptyBoard() {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(EMPTY));
}

export function getRandomAIMove(board) {
  const empty = [];

  board.forEach((row, i) =>
    row.forEach((cell, j) => {
      if (!cell) empty.push([i, j]);
    })
  );

  if (empty.length === 0) return null;
  return empty[Math.floor(Math.random() * empty.length)];
}

export function checkWinner(board) {
  const directions = [
    [1, 0],  // vertical
    [0, 1],  // horizontal
    [1, 1],  // diagonal \
    [1, -1], // diagonal /
  ];

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = board[i][j];
      if (!cell) continue;

      for (const [dx, dy] of directions) {
        let count = 1;

        for (let k = 1; k < WIN_COUNT; k++) {
          const x = i + dx * k;
          const y = j + dy * k;

          if (
            x < 0 || y < 0 ||
            x >= BOARD_SIZE || y >= BOARD_SIZE ||
            board[x][y] !== cell
          ) {
            break;
          }
          count++;
        }

        if (count === WIN_COUNT) {
          return cell;
        }
      }
    }
  }

  // draw
  const full = board.flat().every(c => c !== EMPTY);
  if (full) return 'draw';

  return null;
}
