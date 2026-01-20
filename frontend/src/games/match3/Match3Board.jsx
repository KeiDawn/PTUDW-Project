export default function Match3Board({ board, onCellClick }) {
  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${board.length}, 40px)`
      }}
    >
      {board.map((row, i) =>
        row.map((cell, j) => (
          <button
            key={`${i}-${j}`}
            onClick={() => onCellClick(i, j)}
            className="w-10 h-10 text-lg font-bold bg-yellow-200 border"
          >
            {cell}
          </button>
        ))
      )}
    </div>
  );
}
