const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON payloads

// Mount all routes
app.use('/', routes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;