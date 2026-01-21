import { useState } from 'react';

export default function Friends() {
  const [friends] = useState([
    { id: 1, email: 'user1@ptudw.com' },
    { id: 2, email: 'user2@ptudw.com' }
  ]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Friends</h2>

      {friends.map(f => (
        <div key={f.id} className="border p-2 mb-2">
          {f.email}
        </div>
      ))}
    </div>
  );
}
