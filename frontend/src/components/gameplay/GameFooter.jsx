export default function GameFooter({
  state,
  onStart,
  onBack,
  onHint
}) {
  const isPlaying = state === 'playing';

  return (
    <div className="flex justify-center gap-4 p-4 bg-gray-100 border-t">
      {!isPlaying && (
        <button
          onClick={onStart}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          ▶ Start
        </button>
      )}


      <button
        onClick={onBack}
        className="px-4 py-2 bg-gray-600 text-white rounded"
      >
        ⏪ Back
      </button>


      <button
        onClick={onHint}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        ❓ Hint
      </button>
    </div>
  );
}
