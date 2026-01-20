import axiosClient from './axiosClient';

export const getGamesApi = () =>
  axiosClient.get('/games');

export const getGameDetailApi = (id) =>
  axiosClient.get(`/games/${id}`);