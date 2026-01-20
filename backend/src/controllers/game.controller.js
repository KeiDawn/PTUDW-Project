const knex = require('../db/knex');
const gameModel = require('../models/game.model');
const gameResultModel = require('../models/gameResult.model');
const {
  successResponse,
  errorResponse
} = require('../utils/response');

/**
 * Hard-code guide for games
 */
const GAME_GUIDES = {
  caro_5: {
    description: 'Người chơi đánh lần lượt với máy, ai tạo được 5 quân liên tiếp trước sẽ thắng.',
    controls: ['Left / Right', 'Enter', 'Back']
  },
  caro_4: {
    description: 'Phiên bản Caro 4, ai tạo được 4 quân liên tiếp trước sẽ thắng.',
    controls: ['Left / Right', 'Enter', 'Back']
  },
  tic_tac_toe: {
    description: 'Trò chơi 3x3 kinh điển, tạo 3 quân liên tiếp để chiến thắng.',
    controls: ['Arrow keys', 'Enter']
  },
  snake: {
    description: 'Điều khiển rắn ăn mồi, tránh va chạm.',
    controls: ['Arrow keys']
  },
  match_3: {
    description: 'Ghép ít nhất 3 ô cùng loại để ghi điểm.',
    controls: ['Mouse / Arrow keys']
  },
  memory: {
    description: 'Lật các cặp thẻ giống nhau.',
    controls: ['Arrow keys', 'Enter']
  },
  free_draw: {
    description: 'Vẽ tự do trên canvas.',
    controls: ['Mouse']
  }
};

/**
 * GET /games
 */
const getGames = async (req, res) => {
  try {
    const games = await gameModel.getEnabledGames();
    return successResponse(res, { data: games });
  } catch (err) {
    console.error('getGames error:', err);
    return errorResponse(res, { statusCode: 500, message: 'Internal server error' });
  }
};

/**
 * GET /games/:id
 */
const getGameDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await gameModel.getGameById(id);

    if (!game) {
      return errorResponse(res, { statusCode: 404, message: 'Game not found' });
    }

    if (!game.is_enabled) {
      return errorResponse(res, { statusCode: 403, message: 'Game disabled' });
    }

    return successResponse(res, {
      data: {
        id: game.id,
        name: game.name,
        code: game.code,
        play_type: game.play_type,
        guide: GAME_GUIDES[game.code] || null
      }
    });
  } catch (err) {
    console.error('getGameDetail error:', err);
    return errorResponse(res, { statusCode: 500, message: 'Internal server error' });
  }
};

/**
 * POST /games/:id/result
 */
const saveResult = async (req, res) => {
  try {
    const { id: gameId } = req.params;
    const { score, duration, result } = req.body;
    const userId = req.user.user_id;

    if (!Number.isFinite(score) || score <= 0) {
      return errorResponse(res, { statusCode: 400, message: 'Invalid score' });
    }

    if (!Number.isFinite(duration) || duration <= 0) {
      return errorResponse(res, { statusCode: 400, message: 'Invalid duration' });
    }

    if (!['win', 'lose', 'draw'].includes(result)) {
      return errorResponse(res, { statusCode: 400, message: 'Invalid result' });
    }

    const game = await gameModel.getGameById(gameId);
    if (!game || !game.is_enabled) {
      return errorResponse(res, { statusCode: 404, message: 'Game not found' });
    }

    await gameResultModel.insertResult({
      user_id: userId,
      game_id: gameId,
      score,
      duration,
      result
    });

    return successResponse(res, { message: 'Game result saved successfully' });
  } catch (err) {
    console.error('saveResult error:', err);
    return errorResponse(res, { statusCode: 500, message: 'Internal server error' });
  }
};

/**
 * GET /games/ranking
 */
const getRanking = async (req, res) => {
  try {
    const ranking = await gameResultModel.getRankingByGame();
    return successResponse(res, { data: ranking });
  } catch (err) {
    console.error('getRanking error:', err);
    return errorResponse(res, { statusCode: 500, message: 'Internal server error' });
  }
};

/**
 * GET /games/ranking/me
 */
const getMyRanking = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const ranking = await gameResultModel.getMyRankingByGame(userId);
    return successResponse(res, { data: ranking });
  } catch (err) {
    console.error('getMyRanking error:', err);
    return errorResponse(res, { statusCode: 500, message: 'Internal server error' });
  }
};

/**
 * POST /games/:id/rating
 */
const rateGame = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id: gameId } = req.params;
    const { rating, comment } = req.body;

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return errorResponse(res, { statusCode: 400, message: 'Rating must be 1-5' });
    }

    if (comment && comment.length > 500) {
      return errorResponse(res, { statusCode: 400, message: 'Comment too long' });
    }

    const existing = await knex('ratings')
      .where({ user_id: userId, game_id: gameId })
      .first();

    if (existing) {
      return errorResponse(res, {
        statusCode: 409,
        message: 'You have already rated this game'
      });
    }

    await knex('ratings').insert({
      user_id: userId,
      game_id: gameId,
      rating,
      comment: comment || null
    });

    return successResponse(res, { message: 'Rating submitted successfully' });
  } catch (err) {
    console.error('rateGame error:', err);
    return errorResponse(res, { statusCode: 500, message: 'Internal server error' });
  }
};

/**
 * GET /games/:id/ratings
 */
const getGameRatings = async (req, res) => {
  try {
    const { id: gameId } = req.params;

    const rows = await knex('ratings as r')
      .join('users as u', 'r.user_id', 'u.id')
      .where('r.game_id', gameId)
      .select('r.rating', 'r.comment', 'u.email')
      .orderBy('r.created_at', 'desc');

    const total = rows.length;
    const avg =
      total === 0 ? 0 : rows.reduce((s, r) => s + r.rating, 0) / total;

    return successResponse(res, {
      data: {
        average_rating: Number(avg.toFixed(1)),
        total_ratings: total,
        ratings: rows.map(r => ({
          user: { email: r.email },
          rating: r.rating,
          comment: r.comment
        }))
      }
    });
  } catch (err) {
    console.error('getGameRatings error:', err);
    return errorResponse(res, { statusCode: 500, message: 'Internal server error' });
  }
};

module.exports = {
  getGames,
  getGameDetail,
  saveResult,
  getRanking,
  getMyRanking,
  rateGame,
  getGameRatings
};
