export default function SnakeBoard({ snake, food }) {
  return (
    <div
      className="grid gap-0"
      style={{
        gridTemplateColumns: `repeat(20, 20px)`
      }}
    >
      {[...Array(400)].map((_, i) => {
        const x = i % 20;
        const y = Math.floor(i / 20);

        const isSnake = snake.some(s => s.x === x && s.y === y);
        const isFood = food.x === x && food.y === y;

        return (
          <div
            key={i}
            className={`w-5 h-5 border 
              ${isSnake ? 'bg-green-600' : ''}
              ${isFood ? 'bg-red-500' : ''}`}
          />
        );
      })}
    </div>
  );
}
