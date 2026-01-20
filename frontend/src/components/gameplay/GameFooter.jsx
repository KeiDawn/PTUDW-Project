export default function GameFooter({
  disabled,
  onLeft,
  onRight,
  onEnter,
  onBack,
  onHint
}) {
  return (
    <div className="flex justify-center gap-4 p-4 bg-gray-100 border-t">
      <button onClick={onLeft} disabled={disabled}>⬅ Left</button>
      <button onClick={onRight} disabled={disabled}>➡ Right</button>
      <button onClick={onEnter} disabled={disabled}>⏎ Enter</button>

      <button onClick={onBack}>⏪ Back</button>
      <button onClick={onHint}>❓ Hint</button>
    </div>
  );
}
