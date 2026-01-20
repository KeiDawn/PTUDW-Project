import { useEffect, useState } from 'react';
import { getGamesApi } from '../../api/game.api';

export default function Dashboard() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGamesApi().then((res) => setGames(res.data.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-4">Game List</h2>

      <ul className="list-disc pl-6">
        {games.map((g) => (
          <li key={g.id}>{g.name}</li>
        ))}
      </ul>
    </div>
  );
}
