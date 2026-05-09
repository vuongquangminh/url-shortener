const express = require("express");
const { UrlController } = require("./url.controller.js");
const { authMiddleware } = require("../../middlewares/auth.middleware.js");
const { UrlService } = require("./url.service.js");
const { UrlRepository } = require("./url.repository.js");

const router = express.Router();

const urlRepository = new UrlRepository();
const urlService = new UrlService(urlRepository);
const urlController = new UrlController(urlService);

/**
 * @swagger
 * tags:
 *   name: URLs
 *   description: URL shortener APIs
 */

/**
 * @swagger
 * /api/v1/urls/post:
 *   post:
 *     summary: Create a short URL
 *     description: Create a shortened URL from a long original URL.
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 example: "https://google.com"
 *     responses:
 *       200:
 *         description: Short URL created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/post", authMiddleware, urlController.createShortUrl);
/**
 * @swagger
 * /api/v1/urls/{shortUrl}:
 *   get:
 *     summary: Get original URL by shortUrl
 *     description: Redirect user from short URL to original long URL.
 *     tags: [URLs]
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         schema:
 *           type: string
 *         example: "abc123"
 *     responses:
 *       302:
 *         description: Redirect to original URL
 *       404:
 *         description: Short URL not found
 */
router.get("/:shortUrl", urlController.redirectToLongUrl);
// router.get('/:shortCode/stats', urlController.getUrlStats);
module.exports = router;
