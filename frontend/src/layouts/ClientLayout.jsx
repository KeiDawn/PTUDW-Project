import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ClientLayout() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="p-4 bg-green-600 text-white flex justify-between items-center">
        <span className="font-bold">Client Dashboard</span>

        <nav className="flex gap-4 items-center">
          <NavLink to="/dashboard" className="hover:underline">
            Games
          </NavLink>

          <NavLink to="/profile" className="hover:underline">
            Profile
          </NavLink>

          <NavLink to="/users" className="hover:underline">
            Users
          </NavLink>

          <NavLink to="/friends" className="hover:underline">
            Friends
          </NavLink>

          <NavLink to="/messages" className="hover:underline">
            Messages
          </NavLink>

          <NavLink to="/achievements" className="hover:underline">
            Achievements
          </NavLink>

          <NavLink to="/ranking" className="hover:underline">
            Ranking
          </NavLink>

          <button
            onClick={logout}
            className="ml-4 underline"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* MAIN */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
