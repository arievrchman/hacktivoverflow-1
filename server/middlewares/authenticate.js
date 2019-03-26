const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!token) {
      res.status(401).json({ message: 'You must login first' });
    } else {
      let decoded = jwt.verify(token, process.env.SECRET);
      req.auth_user = decoded;
      next();
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  };
};
