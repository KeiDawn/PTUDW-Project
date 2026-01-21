export default function GameFooter({
  state,
  onStart,
  onBack,
  onHint
}) {
  const isPlaying = state === 'playing';

  return (
    <div className="flex justify-center gap-4 p-4 bg-gray-100 border-t">
      {/* Start chỉ dùng khi idle */}
      {!isPlaying && (
        <button
          onClick={onStart}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          ▶ Start
        </button>
      )}

      {/* Back luôn có */}
      <button
        onClick={onBack}
        className="px-4 py-2 bg-gray-600 text-white rounded"
      >
        ⏪ Back
      </button>

      {/* Hint luôn có */}
      <button
        onClick={onHint}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        ❓ Hint
      </button>
    </div>
  );
}
