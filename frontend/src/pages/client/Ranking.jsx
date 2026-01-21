import { useEffect, useState } from 'react';
import { getRankingApi } from '../../api/ranking.api';
import GameRanking from '../../components/GameRanking';

export default function Ranking() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getRankingApi().then(res => setData(res.data.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Ranking</h2>

      {data.map(game => (
        <GameRanking
          key={game.game.id}
          game={game}
        />
      ))}
    </div>
  );
}
