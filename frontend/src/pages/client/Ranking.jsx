import { useEffect, useState } from 'react';
import { getRankingApi } from '../../api/ranking.api';

export default function Ranking() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getRankingApi().then(res => setData(res.data.data));
  }, []);

  return (
    <div>
      {data.map((g) => (
        <div key={g.game.id}>
          <h3>{g.game.name}</h3>
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
