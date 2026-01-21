export default function Match3Board({
  board,
  cursor,
  selected,
  onCellClick
}) {
  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${board.length}, 40px)`
      }}
    >
      {board.map((row, i) =>
        row.map((cell, j) => {
          const isCursor =
            cursor.row === i && cursor.col === j;

          const isSelected =
            selected &&
            selected[0] === i &&
            selected[1] === j;

          return (
            <button
              key={`${i}-${j}`}
              onClick={() => onCellClick(i, j)}
              className={`
                w-10 h-10 text-lg font-bold border
                ${isCursor ? 'ring-2 ring-blue-500' : ''}
                ${isSelected ? 'bg-green-300' : 'bg-yellow-200'}
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
