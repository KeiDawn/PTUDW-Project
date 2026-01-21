import { useState } from 'react';

export default function UserSearch() {
  // FE mock users 
  const users = [
    { id: 1, email: 'user1@ptudw.com' },
    { id: 2, email: 'user2@ptudw.com' },
    { id: 3, email: 'user3@ptudw.com' },
    { id: 4, email: 'user4@ptudw.com' },
    { id: 5, email: 'user5@ptudw.com' }
  ];

  const [query, setQuery] = useState('');

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Search Users</h2>

      <input
        type="text"
        placeholder="Search by email..."
        className="border p-2 mb-4 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && filteredUsers.length === 0 && (
        <p className="text-gray-500">No users found.</p>
      )}

      {filteredUsers.map(u => (
        <div
          key={u.id}
          className="border p-2 mb-2 rounded"
        >
          {u.email}
        </div>
      ))}
    </div>
  );
}
