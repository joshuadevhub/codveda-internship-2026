const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ success: false, message: "Authorization header missing" });
    return false;
  }

  const splitAuth = authorization.split(" ")[1];

  if (!splitAuth) {
    res.status(401).send({ success: false, message: "No token provided" });
    return false;
  }

  try {
    const decoded = jwt.verify(splitAuth, process.env.JWT_SECRET);
    req.data = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (err) {
    res.status(401).send({ success: false, message: err.message });
    return false;
  }
  next();
}

module.exports = authMiddleware