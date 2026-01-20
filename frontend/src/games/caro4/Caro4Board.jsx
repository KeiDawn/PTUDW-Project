export default function Caro4Board({ board, onCellClick }) {
  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${board.length}, 32px)`
      }}
    >
      {board.map((row, i) =>
        row.map((cell, j) => (
          <button
            key={`${i}-${j}`}
            onClick={() => onCellClick(i, j)}
            className="w-8 h-8 border text-sm font-bold bg-white"
          >
            {cell}
          </button>
        ))
      )}
    </div>
  );
}
