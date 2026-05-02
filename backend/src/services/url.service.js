const { redisClient } = require('../config/redis');

// Cache TTL set to 24 hours (86400 seconds)
const CACHE_TTL = 86400; 

const getCachedUrl = async (shortId) => {
  return await redisClient.get(`url:${shortId}`);
};

const setCachedUrl = async (shortId, originalUrl) => {
  await redisClient.setEx(`url:${shortId}`, CACHE_TTL, originalUrl);
};

module.exports = { getCachedUrl, setCachedUrl };