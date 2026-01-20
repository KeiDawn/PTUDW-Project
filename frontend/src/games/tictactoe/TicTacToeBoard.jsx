export default function TicTacToeBoard({ board, onCellClick }) {
  return (
    <div className="grid grid-cols-3 gap-2 w-48">
      {board.map((row, i) =>
        row.map((cell, j) => (
          <button
            key={`${i}-${j}`}
            onClick={() => onCellClick(i, j)}
            className="w-16 h-16 border text-2xl font-bold bg-white"
          >
            {cell}
          </button>
        ))
      )}
    </div>
  );
}
