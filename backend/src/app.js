const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const gameRoutes = require('./routes/game.routes');

const { swaggerUi, swaggerDocument } = require('./swagger');
const authMiddleware = require('./middlewares/auth.middleware');
const adminMiddleware = require('./middlewares/admin.middleware');

const app = express();


app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/games', gameRoutes);

app.use(
  '/api-docs',
  authMiddleware,
  adminMiddleware,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

module.exports = app;
