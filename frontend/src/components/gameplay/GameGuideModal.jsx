export default function GameGuideModal({
  visible,
  guide,
  onClose
}) {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 w-96 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-lg mb-2">{guide.title}</h3>
        <p className="mb-2">{guide.description}</p>

        <ul className="list-disc ml-5 mb-2">
          {guide.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>

        <p className="text-sm">
          Controls: {guide.controls.join(', ')}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
