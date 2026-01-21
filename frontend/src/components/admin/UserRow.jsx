export default function UserRow({ user, onToggle }) {
  return (
    <tr className="border-t">
      <td className="px-4 py-2 text-left">
        {user.email}
      </td>

      <td className="px-4 py-2 text-left">
        {user.role}
      </td>

      <td className="px-4 py-2 text-left">
        {user.is_active ? 'Active' : 'Disabled'}
      </td>

      <td className="px-4 py-2 text-left">
        <button
          onClick={onToggle}
          className="underline text-blue-600"
        >
          {user.is_active ? 'Disable' : 'Enable'}
        </button>
      </td>
    </tr>
  );
}
