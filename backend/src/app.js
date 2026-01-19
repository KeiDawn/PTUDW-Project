// Test
console.log('>>> app.js LOADED');

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const testRoutes = require('./routes/test.routes');

const app = express();


app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/test', testRoutes);

module.exports = app;
