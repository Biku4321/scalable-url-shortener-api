const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url.controller');
const rateLimiter = require('../middleware/rateLimiter');

// POST /api/urls/shorten -> Creates a short URL (protected by rate limiting)
router.post('/shorten', rateLimiter, urlController.shortenUrl);

module.exports = router;