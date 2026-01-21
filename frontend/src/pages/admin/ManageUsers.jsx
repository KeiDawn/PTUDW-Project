import { useState } from 'react';
import UserRow from '../../components/admin/UserRow';

export default function ManageUsers() {
  // FE mock users (admin-only view)
  const [users, setUsers] = useState([
    { id: 1, email: 'user1@ptudw.com', role: 'client', is_active: true },
    { id: 2, email: 'user2@ptudw.com', role: 'client', is_active: true },
    { id: 3, email: 'user3@ptudw.com', role: 'client', is_active: false }
  ]);

  const toggleActive = (user) => {
    setUsers(users =>
      users.map(u =>
        u.id === user.id
          ? { ...u, is_active: !u.is_active }
          : u
      )
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>

          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <UserRow
              key={u.id}
              user={u}
              onToggle={() => toggleActive(u)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
