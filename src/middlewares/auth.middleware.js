const jwt = require("jsonwebtoken");
const JWTSECRET = "Usmaan123";

//protectedRoute   token bases

const requireSignIn = async (req, res) => {
  try {
    const authHeader = req.headers.authroization;
    console.log(authHeader);
    res.status(200).json({
      message: "Hi",
    });
  } catch (error) {
    console.error("Authentication error", error.message);
    res.status(500).json({
      message: `An error occured during authentication ${error.message}`,
    });
  }
};

module.exports = requireSignIn;
