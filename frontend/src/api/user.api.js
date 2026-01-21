import axiosClient from './axiosClient';

export const searchUsersApi = async () => {
  // Dùng ranking hoặc users seed để mock
  return axiosClient.get('/admin/users'); // admin-only ở BE
};
