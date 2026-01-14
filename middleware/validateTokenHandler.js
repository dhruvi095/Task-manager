const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.AccessToken_Secret);

    req.user = {
      _id: decoded.user.id,
      role: decoded.user.role,
    };

    next();
  } catch (err) {
    res.status(401);
    throw new Error("Invalid token");
  }
});

module.exports = validateToken;
