import axiosClient from './axiosClient';

export const getRankingApi = () =>
  axiosClient.get('/games/ranking');
