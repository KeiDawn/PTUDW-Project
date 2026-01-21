import axiosClient from './axiosClient';

export const getUsersApi = () =>
  axiosClient.get('/admin/users');

export const toggleUserApi = (id, is_active) =>
  axiosClient.put(`/admin/users/${id}`, { is_active });

export const getAdminStatsApi = () =>
  axiosClient.get('/admin/statistics');

export const getGamesAdminApi = () =>
  axiosClient.get('/games');

export const toggleGameApi = (id, is_enabled) =>
  axiosClient.put(`/admin/games/${id}`, { is_enabled });
