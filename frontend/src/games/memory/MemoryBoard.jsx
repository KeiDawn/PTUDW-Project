export default function MemoryBoard({ cards, onCardClick }) {
  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: 'repeat(4, 64px)'
      }}
    >
      {cards.map(card => (
        <button
          key={card.id}
          onClick={() => onCardClick(card.id)}
          disabled={card.flipped || card.matched}
          className={`w-16 h-16 border text-xl font-bold
            ${card.flipped || card.matched ? 'bg-green-200' : 'bg-gray-300'}`}
        >
          {(card.flipped || card.matched) ? card.value : '?'}
        </button>
      ))}
    </div>
  );
}
