import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGamesApi } from '../../api/game.api';

export default function Dashboard() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGamesApi().then((res) => setGames(res.data.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-4">Game List</h2>

      <ul className="space-y-2">
        {games.map((g) => (
          <li
            key={g.id}
            className="flex justify-between items-center bg-white p-3 rounded shadow"
          >
            <span>{g.name}</span>

            <button
              onClick={() => navigate(`/games/${g.id}/play`)}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Play
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
