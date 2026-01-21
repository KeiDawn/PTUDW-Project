export default function GameRow({ game, onToggle }) {
  return (
    <tr className="border-t">
      <td className="px-4 py-2 text-left">
        {game.name}
      </td>

      <td className="px-4 py-2 text-left">
        {game.play_type}
      </td>

      <td className="px-4 py-2 text-left">
        {game.is_enabled ? 'Enabled' : 'Disabled'}
      </td>

      <td className="px-4 py-2 text-left">
        <button
          onClick={onToggle}
          className="underline text-blue-600"
        >
          {game.is_enabled ? 'Disable' : 'Enable'}
        </button>
      </td>
    </tr>
  );
}
