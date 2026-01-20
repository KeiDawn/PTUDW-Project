import { Routes, Route } from 'react-router-dom';

import PublicLayout from '../layouts/PublicLayout';
import ClientLayout from '../layouts/ClientLayout';
import AdminLayout from '../layouts/AdminLayout';

import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Dashboard from '../pages/client/Dashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route
        element={
          <PrivateRoute>
            <ClientLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}
