import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGamesApi } from '../../api/game.api';
import { useSelectionCursor } from '../../hooks/useSelectionCursor';

export default function Dashboard() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  const {
    index,
    setIndex,
    moveLeft,
    moveRight
  } = useSelectionCursor({
    length: games.length,
    enabled: games.length > 0
  });

  useEffect(() => {
    getGamesApi().then(res => setGames(res.data.data));
  }, []);

  // Keyboard mapping cho chế độ chọn game
  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'Enter':
          if (games[index]) {
            navigate(`/games/${games[index].id}/play`);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [games, index]);

  if (!games.length) return <p>Loading games...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Select a Game</h2>

      <div className="flex gap-4">
        {games.map((g, i) => {
          const isSelected = i === index;

          return (
            <div
              key={g.id}
              onClick={() => {
                setIndex(i);
                navigate(`/games/${g.id}/play`);
              }}
              className={`
                w-40 p-4 border rounded cursor-pointer text-center
                ${isSelected
                  ? 'ring-4 ring-blue-500 bg-blue-50'
                  : 'bg-white'}
              `}
            >
              <h3 className="font-bold">{g.name}</h3>
              <p className="text-sm text-gray-600">
                Type: {g.play_type}
              </p>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-gray-600">
        Use ⬅ / ➡ to choose game, ⏎ Enter to play
      </p>
    </div>
  );
}
