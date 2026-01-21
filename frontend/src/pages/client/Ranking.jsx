import { useEffect, useState } from 'react';
import { getRankingApi } from '../../api/ranking.api';

export default function Ranking() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getRankingApi().then(res => setData(res.data.data));
  }, []);

  const filtered =
    filter === 'all'
      ? data
      : data.filter(g => g.game.code === filter);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Ranking</h2>

      <select
        className="border p-2 mb-4"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      >
        <option value="all">All Games</option>
        {data.map(g => (
          <option key={g.game.code} value={g.game.code}>
            {g.game.name}
          </option>
        ))}
      </select>

      {filtered.map(g => (
        <div key={g.game.id}>
          <h3 className="font-bold">{g.game.name}</h3>
          <ul>
            {g.ranking.map(r => (
              <li key={r.rank}>
                #{r.rank} {r.user.email} – {r.total_score}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
