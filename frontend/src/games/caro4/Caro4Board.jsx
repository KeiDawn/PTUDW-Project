export default function Caro4Board({
  board,
  cursor,
  onCellClick
}) {
  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${board.length}, 32px)`
      }}
    >
      {board.map((row, i) =>
        row.map((cell, j) => {
          const isSelected =
            cursor.row === i && cursor.col === j;

          return (
            <button
              key={`${i}-${j}`}
              onClick={() => onCellClick(i, j)}
              className={`
                w-8 h-8 border text-sm font-bold bg-white
                ${isSelected ? 'ring-2 ring-red-500' : ''}
              `}
            >
              {cell}
            </button>
          );
        })
      )}
    </div>
  );
}
