import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginClient = () => {
    login({
      id: 1,
      email: 'client@test.com',
      role: 'client'
    });
    navigate('/dashboard');
  };

  const loginAdmin = () => {
    login({
      id: 99,
      email: 'admin@test.com',
      role: 'admin'
    });
    navigate('/admin');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login (Mock)</h2>

      <div className="space-y-3">
        <button
          onClick={loginClient}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Mock Login as Client
        </button>

        <button
          onClick={loginAdmin}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          Mock Login as Admin
        </button>
      </div>
    </div>
  );
}
