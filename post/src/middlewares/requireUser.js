const { HttpException } = require("../exceptions/http.exception");


const requireUser = (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new HttpException(401, `Require authenticated user`));
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = requireUser;
