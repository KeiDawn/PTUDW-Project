export default function GameFooter({
  state,
  onStart,
  onLeft,
  onRight,
  onEnter,
  onBack,
  onHint
}) {
  const isPlaying = state === 'playing';

  return (
    <div className="flex justify-center gap-4 p-4 bg-gray-100 border-t">
      <button onClick={onLeft} disabled={!isPlaying}>⬅ Left</button>
      <button onClick={onRight} disabled={!isPlaying}>➡ Right</button>
      <button onClick={onEnter} disabled={!isPlaying}>⏎ Enter</button>

      {!isPlaying && (
        <button onClick={onStart} className="font-bold">
          ▶ Start
        </button>
      )}

      <button onClick={onBack}>⏪ Back</button>
      <button onClick={onHint}>❓ Hint</button>
    </div>
  );
}
