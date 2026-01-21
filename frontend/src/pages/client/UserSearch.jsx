import { useEffect, useState } from 'react';
import { searchUsersApi } from '../../api/user.api';
import UserCard from '../../components/UserCard';

export default function UserSearch() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    searchUsersApi().then(res => setUsers(res.data.data || []));
  }, []);

  const filtered = users.filter(u =>
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
        onChange={e => setQuery(e.target.value)}
      />

      {filtered.map(u => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  );
}
