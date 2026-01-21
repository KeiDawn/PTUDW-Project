export default function GameHeader({
  title,
  score,
  time,
  state,
  canResume,
  onResume
}) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
      <h2 className="text-xl font-bold">{title}</h2>

      <div className="flex gap-6 items-center">
        {state !== 'idle' && <span>⏱ {time}s</span>}
        {state !== 'idle' && <span>⭐ {score}</span>}

        {canResume && state === 'idle' && (
          <button
            onClick={onResume}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
