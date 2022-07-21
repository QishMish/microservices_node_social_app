const { User } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { HttpException } = require("../exceptions/http.exception");

const createUser = async (userFields) => {
  const { username, email, verified } = userFields;
  const user = new User({
    uuid: uuidv4(),
    email: email,
    username: username,
    verified: verified,
  });

  await user.save();

  return {
    user: user,
  };
};

const getAll = async () => {
  const users = await User.findAll({});
  return {
    users: users,
  };
};
const getUserById = async (userUUId) => {
  const user = await User.findOne({
    limit: 10,
    where: {
      uuid: userUUId,
    },
  });
  if (!user) {
    throw new HttpException(404, "User not found");
  }
  return {
    user: user,
  };
};
const getUserByUserName = async (username) => {
  const user = await User.findOne({
    limit: 10,
    where: {
      username: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("username")),
        "LIKE",
        "%" + username.toLowerCase() + "%"
      ),
    },
  });
  if (!user) {
    throw new HttpException(404, "User not found");
  }
  return {
    user: user,
  };
};

module.exports = {
  getAll,
  getUserById,
  getUserByUserName,
  createUser,
};
