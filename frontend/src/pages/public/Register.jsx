export default function Register() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 mb-3"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-3"
      />

      <button
        className="w-full bg-green-600 text-white py-2 rounded"
        onClick={() => alert('Register mock – Phase 03')}
      >
        Register
      </button>
    </div>
  );
}
