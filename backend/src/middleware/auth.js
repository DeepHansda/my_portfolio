const authMiddleware = (req, res, next) => {
  const adminKey = process.env.ADMIN_API_KEY;

  // If no admin key is configured in the environment, allow access (with log)
  if (!adminKey) {
    return next();
  }

  const apiKeyHeader = req.headers["x-api-key"];
  const authHeader = req.headers["authorization"];

  let providedKey = apiKeyHeader;
  if (!providedKey && authHeader && authHeader.startsWith("Bearer ")) {
    providedKey = authHeader.split(" ")[1];
  }

  if (!providedKey || providedKey !== adminKey) {
    return res.error("Unauthorized: Invalid or missing API key", 401);
  }

  next();
};

module.exports = authMiddleware;
