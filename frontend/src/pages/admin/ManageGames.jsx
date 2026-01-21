import { useEffect, useState } from 'react';
import { getGamesAdminApi } from '../../api/admin.api';
import GameRow from '../../components/admin/GameRow';

export default function ManageGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGamesAdminApi().then(res => {
      const data = res.data.data || [];
      setGames(data.map(g => ({
        ...g,
        is_enabled: g.is_enabled !== false // normalize
      })));
    });
  }, []);

  const toggleGame = (game) => {
    setGames(games =>
      games.map(g =>
        g.id === game.id
          ? { ...g, is_enabled: !g.is_enabled }
          : g
      )
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Games</h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>

          </tr>
        </thead>
        <tbody>
          {games.map(g => (
            <GameRow
              key={g.id}
              game={g}
              onToggle={() => toggleGame(g)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
