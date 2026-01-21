import { useState } from 'react';
import Pagination from '../../components/Pagination';

const PAGE_SIZE = 4;

export default function Friends() {
  const friends = [
    { id: 1, email: 'user1@ptudw.com' },
    { id: 2, email: 'user2@ptudw.com' },
    { id: 3, email: 'user3@ptudw.com' },
    { id: 4, email: 'user4@ptudw.com' },
    { id: 5, email: 'user5@ptudw.com' },
    { id: 6, email: 'user6@ptudw.com' }
  ];

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(friends.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginated = friends.slice(start, start + PAGE_SIZE);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Friends</h2>

      {paginated.map(f => (
        <div key={f.id} className="border p-2 mb-2">
          {f.email}
        </div>
      ))}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
