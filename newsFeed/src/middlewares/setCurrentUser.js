const axios = require("axios");
const { HttpException } = require("../exceptions/http.exception");

const setCurrentUser = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    req.user = null;
    return next();
  }
  try {
    // const user = await axios.get("http://localhost:4000/auth/check-auth", {
    //   headers: {
    //     Cookie: `accessToken=${accessToken};`,
    //   },
    // });
    // req.user = user.data;
    req.user = {
      "id": 2,
      "uuid": "7364c840-478d-4376-ad6d-8bee1b440dad",
      "email": "mishikoqajaiaa50@gmail.com",
      "username": "admin",
      "verified": false,
      "iat": 1657623869,
      "exp": 1657631069
    };
    next();
  } catch (error) {
    throw new HttpException(500, "Internal server error, try later");
  }
};

module.exports = setCurrentUser;
