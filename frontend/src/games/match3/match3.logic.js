export const BOARD_SIZE = 8;
export const TYPES = [1, 2, 3, 4, 5];

export function createBoard() {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() =>
      Array(BOARD_SIZE)
        .fill(null)
        .map(() => TYPES[Math.floor(Math.random() * TYPES.length)])
    );
}

export function findMatches(board) {
  const matches = [];

  // Horizontal
  for (let i = 0; i < BOARD_SIZE; i++) {
    let count = 1;
    for (let j = 1; j < BOARD_SIZE; j++) {
      if (board[i][j] === board[i][j - 1]) {
        count++;
      } else {
        if (count >= 3) {
          for (let k = 0; k < count; k++) {
            matches.push([i, j - 1 - k]);
          }
        }
        count = 1;
      }
    }
    if (count >= 3) {
      for (let k = 0; k < count; k++) {
        matches.push([i, BOARD_SIZE - 1 - k]);
      }
    }
  }

  // Vertical
  for (let j = 0; j < BOARD_SIZE; j++) {
    let count = 1;
    for (let i = 1; i < BOARD_SIZE; i++) {
      if (board[i][j] === board[i - 1][j]) {
        count++;
      } else {
        if (count >= 3) {
          for (let k = 0; k < count; k++) {
            matches.push([i - 1 - k, j]);
          }
        }
        count = 1;
      }
    }
    if (count >= 3) {
      for (let k = 0; k < count; k++) {
        matches.push([BOARD_SIZE - 1 - k, j]);
      }
    }
  }

  return matches;
}

export function clearMatches(board, matches) {
  const newBoard = board.map(r => [...r]);
  matches.forEach(([i, j]) => {
    newBoard[i][j] = TYPES[Math.floor(Math.random() * TYPES.length)];
  });
  return newBoard;
}
