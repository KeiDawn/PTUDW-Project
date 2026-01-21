export default function TicTacToeBoard({
  board,
  cursor,
  onCellClick
}) {
  return (
    <div className="grid grid-cols-3 gap-2 w-48">
      {board.map((row, i) =>
        row.map((cell, j) => {
          const isSelected =
            cursor.row === i && cursor.col === j;

          return (
            <button
              key={`${i}-${j}`}
              onClick={() => onCellClick(i, j)}
              className={`
                w-16 h-16 border text-2xl font-bold
                ${isSelected ? 'ring-4 ring-blue-500' : ''}
                bg-white
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
