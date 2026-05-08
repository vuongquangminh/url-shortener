const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const urlRoutes = require('./modules/urls/url.route');
const authRoutes = require('./modules/auth/auth.route');
const errorMiddleware = require('./middlewares/error.middleware');
const { UrlController } = require('./modules/urls/url.controller');
const { createUrlRateLimiter } = require('./middlewares/rate-limit.middleware');
const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(createUrlRateLimiter); // Apply to all requests

const urlController = new UrlController();

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'URL Shortener API is running',
  });
});
app.use('/api/v1/urls', urlRoutes);
app.get('/:shortCode', urlController.redirect)
app.use('/api/v1/auth', authRoutes)

app.use(errorMiddleware);

module.exports = app;