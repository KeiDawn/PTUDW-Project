import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-blue-600 text-white">
        Public Area
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
