import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-red-100">
      <header className="p-4 bg-red-600 text-white">
        Admin Panel
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
