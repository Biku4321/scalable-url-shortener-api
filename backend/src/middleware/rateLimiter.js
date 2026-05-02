const { RateLimiterRedis } = require('rate-limiter-flexible');
const { redisClient } = require('../config/redis');

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 100, // 100 requests
  duration: 60, // per 1 minute (60 seconds)
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({ error: 'Too Many Requests. Please try again later.' });
    });
};

module.exports = rateLimiterMiddleware;