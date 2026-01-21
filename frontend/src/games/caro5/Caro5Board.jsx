export default function Caro5Board({
  board,
  cursor,
  onCellClick
}) {
  return (
    <div
      className="grid gap-[2px]"
      style={{
        gridTemplateColumns: `repeat(${board.length}, 28px)`
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
                w-7 h-7 border text-xs font-bold bg-white
                ${isSelected ? 'ring-1 ring-blue-500' : ''}
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
