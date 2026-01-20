import axiosClient from './axiosClient';

/**
 * Save game result
 * POST /games/:id/result
 */
export const saveResultApi = (gameId, data) => {
  return axiosClient.post(`/games/${gameId}/result`, data);
};
