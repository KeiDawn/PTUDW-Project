import { useEffect, useState } from 'react';
import { getGamesAdminApi } from '../../api/admin.api';
import { getRankingApi } from '../../api/ranking.api';
import StatCard from '../../components/admin/StatCard';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1️⃣ Games (API tồn tại)
        const gamesRes = await getGamesAdminApi(); // GET /games
        const games = gamesRes.data.data || [];

        // 2️⃣ Ranking (API public)
        const rankingRes = await getRankingApi(); // GET /games/ranking
        const rankingData = rankingRes.data.data || [];

        // 3️⃣ Unique users from ranking
        const userSet = new Set();
        rankingData.forEach(game =>
          game.ranking.forEach(r => userSet.add(r.user.email))
        );

        setStats({
          totalUsers: userSet.size,
          totalGames: games.length,
          activeGames: games.filter(g => g.is_enabled !== false).length
        });
      } catch (err) {
        console.error(err);
        setStats({
          totalUsers: 0,
          totalGames: 0,
          activeGames: 0
        });
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading statistics...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Games" value={stats.totalGames} />
        <StatCard title="Active Games" value={stats.activeGames} />
      </div>
    </div>
  );
}
