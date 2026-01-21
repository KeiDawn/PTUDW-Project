export default function UserCard({ user }) {
  return (
    <div className="border p-3 mb-2 rounded">
      <p>{user.email}</p>
    </div>
  );
}
