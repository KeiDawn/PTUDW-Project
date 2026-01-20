import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const { login } = useAuth();

  const handleLogin = () => {
    login({ id: 1, role: 'client', email: 'demo@user.com' });
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Login</h2>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Mock Login
      </button>
    </div>
  );
}
