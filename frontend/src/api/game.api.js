import axiosClient from './axiosClient';

export const getGamesApi = () =>
  axiosClient.get('/games');
