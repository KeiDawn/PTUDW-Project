import { Routes, Route } from 'react-router-dom';

import PublicLayout from '../layouts/PublicLayout';
import ClientLayout from '../layouts/ClientLayout';
import AdminLayout from '../layouts/AdminLayout';

import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';

import Dashboard from '../pages/client/Dashboard';
import GamePlay from '../pages/client/GamePlay';
import Profile from '../pages/client/Profile';
import UserSearch from '../pages/client/UserSearch';
import Friends from '../pages/client/Friends';
import Messages from '../pages/client/Messages';
import Achievements from '../pages/client/Achievements';
import Ranking from '../pages/client/Ranking';

import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageGames from '../pages/admin/ManageGames';


export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* ================= CLIENT ================= */}
      <Route
        element={
          <PrivateRoute>
            <ClientLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="users" element={<UserSearch />} />
        <Route path="friends" element={<Friends />} />
        <Route path="messages" element={<Messages />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="games/:id/play" element={<GamePlay />} />
      </Route>

      {/* ================= ADMIN ================= */}
      <Route
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >

        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/users" element={<ManageUsers />} />
        <Route path="admin/games" element={<ManageGames />} />
      </Route>
    </Routes>
  );
}
