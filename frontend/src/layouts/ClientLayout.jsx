import { Outlet } from 'react-router-dom';

export default function ClientLayout() {
  return (
    <div className="min-h-screen bg-green-100">
      <header className="p-4 bg-green-600 text-white">
        Client Dashboard
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
