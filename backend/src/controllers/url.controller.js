const urlService = require('../services/url.service');

const shortenUrl = async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    
    // Basic URL validation
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
      '(\\#[-a-z\\d_]*)?$','i');

    if (!urlPattern.test(originalUrl)) {
      return res.status(400).json({ error: 'Invalid URL provided' });
    }

    const url = await urlService.createShortUrl(originalUrl);
    const shortUrl = `${process.env.BASE_URL}/${url.shortId}`;

    res.status(201).json({
      originalUrl: url.originalUrl,
      shortUrl: shortUrl,
      shortId: url.shortId
    });
  } catch (error) {
    next(error);
  }
};

const redirectUrl = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const originalUrl = await urlService.getOriginalUrl(shortId);

    if (!originalUrl) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // 301 Permanent Redirect is best for SEO
    res.redirect(301, originalUrl); 
  } catch (error) {
    next(error);
  }
};

module.exports = { shortenUrl, redirectUrl };