module.exports = (req, res, next) => {
  // Decode + to space in query string before CDS parser sees it
  if (req.url && req.url.includes('+')) {
    req.url = req.url.replace(/\+/g, '%20');
  }
  next();
};