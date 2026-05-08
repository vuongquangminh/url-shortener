const express = require('express');
const { UrlController } = require('./url.controller.js');
const { authMiddleware } = require('../../middlewares/auth.middleware.js');

const router = express.Router();

const urlController = new UrlController();
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'URL module works',
  });
});

router.post('/post', authMiddleware, urlController.createShortUrl);
router.get('/:shortUrl', urlController.redirectToLongUrl);
// router.get('/:shortCode/stats', urlController.getUrlStats);
module.exports = router;