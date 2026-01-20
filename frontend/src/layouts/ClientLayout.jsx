import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ClientLayout() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-green-600 text-white flex justify-between">
        <span>Client Dashboard</span>
        <button onClick={logout} className="underline">
          Logout
        </button>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
