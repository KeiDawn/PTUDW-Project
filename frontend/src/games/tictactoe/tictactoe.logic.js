export const EMPTY = null;
export const PLAYER = 'X';
export const AI = 'O';

export function createEmptyBoard() {
  return Array(3)
    .fill(null)
    .map(() => Array(3).fill(EMPTY));
}

export function checkWinner(board) {
  const lines = [
    // rows
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    // cols
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    // diagonals
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]],
  ];

  for (const line of lines) {
    const [a,b,c] = line;
    const v1 = board[a[0]][a[1]];
    if (v1 &&
        v1 === board[b[0]][b[1]] &&
        v1 === board[c[0]][c[1]]) {
      return v1; // X or O
    }
  }

  // draw
  const isFull = board.flat().every(cell => cell !== EMPTY);
  if (isFull) return 'draw';

  return null;
}

export function getRandomAIMove(board) {
  const emptyCells = [];

  board.forEach((row, i) =>
    row.forEach((cell, j) => {
      if (cell === EMPTY) emptyCells.push([i, j]);
    })
  );

  if (emptyCells.length === 0) return null;

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}
