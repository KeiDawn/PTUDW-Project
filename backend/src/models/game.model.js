const knex = require('../db/knex');

/**
 * Get all enabled games (basic info only)
 */
const getEnabledGames = () => {
  return knex('games')
    .select('id', 'name', 'code', 'play_type')
    .where({ is_enabled: true })
    .orderBy('id');
};

/**
 * Get game by id
 */
const getGameById = (id) => {
  return knex('games')
    .where({ id })
    .first();
};

module.exports = {
  getEnabledGames,
  getGameById
};
