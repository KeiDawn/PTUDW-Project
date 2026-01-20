const express = require('express');
const router = express.Router();

const gameController = require('../controllers/game.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * =========================
 * RANKING ROUTES 
 * =========================
 */

/**
 * GET /games/ranking/me
 * Auth – personal ranking
 */
router.get(
  '/ranking/me',
  authMiddleware,
  gameController.getMyRanking
);

/**
 * GET /games/ranking
 * Public – ranking by Total Score / Game (TOP 10)
 */
router.get(
  '/ranking',
  gameController.getRanking
);

/**
 * =========================
 * GAME ROUTES
 * =========================
 */

/**
 * GET /games
 * Public – list enabled games 
 */
router.get('/', gameController.getGames);

/**
 * GET /games/:id
 * Public – game detail + guide
 */
router.get('/:id', gameController.getGameDetail);

/**
 * POST /games/:id/result
 * Auth required – save game result
 */
router.post(
  '/:id/result',
  authMiddleware,
  gameController.saveResult
);

module.exports = router;
