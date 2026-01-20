export default function GameResultModal({ score, time, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-80 rounded text-center">
        <h3 className="text-xl font-bold mb-4">Game Over</h3>
        <p>Score: {score}</p>
        <p>Time: {time}s</p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
