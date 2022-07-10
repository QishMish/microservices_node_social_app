const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../constants");
const { HttpException } = require("../exceptions/http.exception");

const currentUser = (req, res, next) => {
  const bearer = req.headers.authorization;
  const { accessToken: accToken } = req.cookies;

  let accessToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    accessToken = bearer?.split("Bearer ")[1].trim();
  } else if (accToken) {
    accessToken = accToken;
  }

  if (!accessToken) {
    return next();
  }
  try {
    const payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);
    req.user = payload;
    return next();
  } catch (err) {
    throw new HttpException(400, "Invalid token");
  }

  return next();
};

module.exports = {
  currentUser,
};
