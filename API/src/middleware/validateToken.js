const jwt = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "token_missing" });
  try {
    const token_decoded = jwt.verify(token, tokenSecret);
    req.userId = token_decoded.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "token_expired" });
    }
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

module.exports = validateToken;
