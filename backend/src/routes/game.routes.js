const express = require('express');
const router = express.Router();

const gameController = require('../controllers/game.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * =========================
 * GAME ROUTES
 * =========================
 */

/**
 * GET /games
 * Public – list enabled games (basic info)
 */
router.get('/', gameController.getGames);

/**
 * GET /games/:id
 * Public – game detail + guide
 * Disabled game -> 403
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

/**
 * =========================
 * RANKING ROUTE
 * =========================
 */

/**
 * GET /ranking
 * Public – ranking by total score per game (TOP 10)
 */
router.get('/ranking', gameController.getRanking);

module.exports = router;
