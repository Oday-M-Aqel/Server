const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const secret_key = process.env.Secret_Key;

module.exports.verifyAdmin = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    return res.status(404).json({ message: "No token Provided" });
  }

  const accessToken = token.split(" ")[1];

  jwt.verify(accessToken, secret_key, (err, decode) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Authentication Failed Successfully =)" });
    }

    // to send userId with request
    // req.userId = decode.userId;

    if (decode.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You do not have the necessary permissions." });
    }
  });
};
