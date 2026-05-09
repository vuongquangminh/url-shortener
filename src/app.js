const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.js");

const urlRoutes = require('./modules/urls/url.route');
const authRoutes = require('./modules/auth/auth.route');
const adminRoutes = require('./modules/admin/route');
const errorMiddleware = require('./middlewares/error.middleware');
const { UrlController } = require('./modules/urls/url.controller');
const { createUrlRateLimiter } = require('./middlewares/rate-limit.middleware');
const { UrlRepository } = require('./modules/urls/url.repository.js');
const { UrlService } = require('./modules/urls/url.service.js');
const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(createUrlRateLimiter); // Apply to all requests

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const urlRepository = new UrlRepository();
const urlService = new UrlService(urlRepository);
const urlController = new UrlController(urlService);

app.use('/api/v1/urls', urlRoutes);
app.get('/:shortCode', urlController.redirect)
app.use('/api/v1/auth', authRoutes)

app.get('/wakeup/keep-alive', (req, res) => {
  return res.status(200).json({ message: 'Server is awake!' });
});
app.use('/api/v1/admin', adminRoutes);

app.use(errorMiddleware);

module.exports = app;