const express = require('express');
const router = express.Router();
const urlRoutes = require('./url.routes');
const { redirectUrl } = require('../controllers/url.controller');

// Mount API routes
router.use('/api/urls', urlRoutes);

// Root level route for redirection (e.g., domain.com/AbC12Xy)
router.get('/:shortId', redirectUrl);

module.exports = router;