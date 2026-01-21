import { useState } from 'react';
import Pagination from './Pagination';

const PAGE_SIZE = 4;

export default function GameRanking({ game }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(game.ranking.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginated = game.ranking.slice(start, start + PAGE_SIZE);

  return (
    <div className="mb-6">
      <h3 className="font-bold mb-2">{game.game.name}</h3>

      <ul>
        {paginated.map(r => (
          <li key={r.rank}>
            #{r.rank} {r.user.email} – {r.total_score}
          </li>
        ))}
      </ul>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
