export default function MemoryBoard({
  cards,
  cursor,
  onCardClick
}) {
  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: 'repeat(4, 64px)'
      }}
    >
      {cards.map((card, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;

        const isCursor =
          cursor.row === row && cursor.col === col;

        const isOpen = card.flipped || card.matched;

        return (
          <button
            key={card.id}
            onClick={() => onCardClick(card.id)}
            disabled={card.flipped || card.matched}
            className={`
              w-16 h-16 border text-xl font-bold
              ${isOpen ? 'bg-green-200' : 'bg-gray-300'}
              ${isCursor ? 'ring-2 ring-blue-500' : ''}
            `}
          >
            {isOpen ? card.value : '?'}
          </button>
        );
      })}
    </div>
  );
}
