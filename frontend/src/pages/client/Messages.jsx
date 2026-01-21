import { useState } from 'react';
import Pagination from '../../components/Pagination';

const PAGE_SIZE = 4;

export default function Messages() {
  const messages = [
    { id: 1, from: 'user1@ptudw.com', text: 'Hello!' },
    { id: 2, from: 'user2@ptudw.com', text: 'How are you?' },
    { id: 3, from: 'user3@ptudw.com', text: 'Let’s play!' },
    { id: 4, from: 'user4@ptudw.com', text: 'Nice game' },
    { id: 5, from: 'user5@ptudw.com', text: 'GG!' }
  ];

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(messages.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginated = messages.slice(start, start + PAGE_SIZE);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Messages</h2>

      {paginated.map(m => (
        <div key={m.id} className="border p-2 mb-2">
          <strong>{m.from}:</strong> {m.text}
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
