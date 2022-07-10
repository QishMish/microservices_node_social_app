const axios = require("axios");
const { HttpException } = require("../exceptions/http.exception");

const setCurrentUser = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    req.user = null;
    return next();
  }
  try {
    const user = await axios.get("http://localhost:4000/auth/check-auth", {
      headers: {
        Cookie: `accessToken=${accessToken};`,
      },
    });
    req.user = user;
    next();
  } catch (error) {
    throw new HttpException(500, "Internal server error, try later");
  }
};

module.exports = setCurrentUser;
