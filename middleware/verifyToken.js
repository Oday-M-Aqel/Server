const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const secret_key = process.env.Secret_Key;

module.exports.verifyingToken = (req, res, next) => {
  const token = (req.headers = ["token"]);

  if (!token) {
    return res.status(404).json({ message: "No token provided" });
  }

  const accessToken = token.split(" ")[1];

  jwt.verify(accessToken, secret_key, (err, decode) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Authentication Failed Successfully =)" });
    }

    // to send userId inside request:
    req.userId = decode.userId;

    if (decode.role === "user" || decode.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You don't have access permission" });
    }
  });
};
