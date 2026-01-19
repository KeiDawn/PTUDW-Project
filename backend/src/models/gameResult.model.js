const knex = require('../db/knex');

/**
 * Save game result
 */
const insertResult = ({ user_id, game_id, score, duration, result }) => {
  return knex('game_results').insert({
    user_id,
    game_id,
    score,
    duration,
    result
  });
};

/**
 * Get ranking by game (TOP 10)
 */
const getRankingByGame = async () => {
  const rows = await knex('game_results as gr')
    .join('users as u', 'gr.user_id', 'u.id')
    .join('games as g', 'gr.game_id', 'g.id')
    .where('g.is_enabled', true)
    .groupBy('g.id', 'g.name', 'g.code', 'u.id', 'u.email')
    .select(
      'g.id as game_id',
      'g.name as game_name',
      'g.code as game_code',
      'u.id as user_id',
      'u.email as user_email'
    )
    .sum('gr.score as total_score')
    .count('gr.id as total_played')
    .orderBy([
      { column: 'g.id', order: 'asc' },
      { column: 'total_score', order: 'desc' }
    ]);

  /**
   * Transform to:
   * [
   *   { game: {...}, ranking: [...] }
   * ]
   */
  const result = [];
  const gameMap = new Map();

  for (const row of rows) {
    if (!gameMap.has(row.game_id)) {
      gameMap.set(row.game_id, {
        game: {
          id: row.game_id,
          name: row.game_name,
          code: row.game_code
        },
        ranking: []
      });
      result.push(gameMap.get(row.game_id));
    }

    const rankingList = gameMap.get(row.game_id).ranking;

    if (rankingList.length < 10) {
      rankingList.push({
        user: {
          id: row.user_id,
          email: row.user_email,
          avatar: null
        },
        total_score: Number(row.total_score),
        total_played: Number(row.total_played)
      });
    }
  }

  // Add rank
  result.forEach((game) => {
    game.ranking.forEach((item, index) => {
      item.rank = index + 1;
    });
  });

  return result;
};

module.exports = {
  insertResult,
  getRankingByGame
};
