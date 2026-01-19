const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

//Test
console.log('>>> test.routes.js loaded');

router.get('/protected', authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;
