const jwt = require("jsonwebtoken");
const JWTSECRET = "Usmaan123";

const requireSignIn = async (req, res, next) => {
  try {
    // Correcting the typo from 'authroization' to 'authorization'
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authentication token is required" });
    }

    // Assuming the token is in the format: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is malformed" });
    }

    try {
      const decoded = jwt.verify(token, JWTSECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error("Authentication error", error.message);
      return res.status(403).json({
        message: `Invalid or expired token: ${error.message}`,
      });
    }
  } catch (error) {
    console.error("Authentication error", error.message);
    res.status(500).json({
      message: `An error occurred during authentication ${error.message}`,
    });
  }
};

module.exports = requireSignIn;
