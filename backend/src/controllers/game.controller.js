const gameModel = require('../models/game.model');
const gameResultModel = require('../models/gameResult.model');
const {
  successResponse,
  errorResponse
} = require('../utils/response');

/**
 * Hard-code guide for games
 * (Phase 02 – đúng spec, chưa cần DB)
 */
const GAME_GUIDES = {
  caro_5: {
    description:
      'Người chơi đánh lần lượt với máy, ai tạo được 5 quân liên tiếp trước sẽ thắng.',
    controls: [
      'Left / Right: di chuyển',
      'Enter: đặt quân',
      'Back: thoát game'
    ]
  },
  caro_4: {
    description:
      'Phiên bản Caro 4, ai tạo được 4 quân liên tiếp trước sẽ thắng.',
    controls: [
      'Left / Right: di chuyển',
      'Enter: đặt quân',
      'Back: thoát game'
    ]
  },
  tic_tac_toe: {
    description:
      'Trò chơi 3x3 kinh điển, tạo 3 quân liên tiếp để chiến thắng.',
    controls: [
      'Arrow keys: di chuyển',
      'Enter: đặt quân'
    ]
  },
  snake: {
    description:
      'Điều khiển rắn ăn mồi, tránh va chạm với tường và chính mình.',
    controls: [
      'Up / Down / Left / Right: điều khiển hướng'
    ]
  },
  match_3: {
    description:
      'Ghép ít nhất 3 ô cùng loại để ghi điểm.',
    controls: [
      'Mouse / Arrow keys: chọn ô',
      'Enter: đổi chỗ'
    ]
  },
  memory: {
    description:
      'Lật các cặp thẻ giống nhau để ghi điểm.',
    controls: [
      'Arrow keys: di chuyển',
      'Enter: lật thẻ'
    ]
  },
  free_draw: {
    description:
      'Vẽ tự do trên bảng canvas.',
    controls: [
      'Mouse: vẽ',
      'Back: xóa'
    ]
  }
};

/**
 * GET /games
 * Public – chỉ trả game is_enabled = true
 */
const getGames = async (req, res) => {
  try {
    const games = await gameModel.getEnabledGames();

    return successResponse(res, {
      data: games
    });
  } catch (err) {
    console.error('getGames error:', err);
    return errorResponse(res, {
      statusCode: 500,
      message: 'Internal server error'
    });
  }
};

/**
 * GET /games/:id
 * Public – game disabled => 403
 */
const getGameDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const game = await gameModel.getGameById(id);
    if (!game) {
      return errorResponse(res, {
        statusCode: 404,
        message: 'Game not found'
      });
    }

    if (!game.is_enabled) {
      return errorResponse(res, {
        statusCode: 403,
        message: 'This game is currently disabled'
      });
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
    return errorResponse(res, {
      statusCode: 500,
      message: 'Internal server error'
    });
  }
};

/**
 * POST /games/:id/result
 * Auth required
 */
const saveResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, duration, result } = req.body;
    const userId = req.user.user_id;

    // Validate input
    if (
      typeof score !== 'number' ||
      score < 0 ||
      typeof duration !== 'number' ||
      duration <= 0 ||
      !['win', 'lose', 'draw'].includes(result)
    ) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Validation error'
      });
    }

    const game = await gameModel.getGameById(id);
    if (!game) {
      return errorResponse(res, {
        statusCode: 404,
        message: 'Game not found'
      });
    }

    if (!game.is_enabled) {
      return errorResponse(res, {
        statusCode: 403,
        message: 'This game is currently disabled'
      });
    }

    await gameResultModel.insertResult({
      user_id: userId,
      game_id: game.id,
      score,
      duration,
      result
    });

    return successResponse(res, {
      message: 'Game result saved successfully'
    });
  } catch (err) {
    console.error('saveResult error:', err);
    return errorResponse(res, {
      statusCode: 500,
      message: 'Internal server error'
    });
  }
};

/**
 * GET /ranking
 * Public – ranking theo tổng điểm / mỗi game (TOP 10)
 */
const getRanking = async (req, res) => {
  try {
    const ranking = await gameResultModel.getRankingByGame();

    return successResponse(res, {
      data: ranking
    });
  } catch (err) {
    console.error('getRanking error:', err);
    return errorResponse(res, {
      statusCode: 500,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getGames,
  getGameDetail,
  saveResult,
  getRanking
};
