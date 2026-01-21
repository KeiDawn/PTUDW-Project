export default function GameGuideModal({ guide, onClose }) {
  if (!guide) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose} // click overlay để đóng
    >
      <div
        className="bg-white p-6 w-96 rounded"
        onClick={(e) => e.stopPropagation()} // chặn click lan lên overlay
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
