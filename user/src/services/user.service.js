const { User } = require("../models");
const { v4: uuidv4 } = require("uuid");

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

const updateUser = async (userUUID, userFields) => {
  const { username, email, verified, status } = userFields;

  const user = await User.findOne({
    where: { uuid: userUUID },
  });
  if (!user) throw new HttpException(400, "Error during editing post");

  user.set({
    ...(username && { username }),
    ...(email && { email }),
    ...(verified && { verified }),
    ...(status && { status }),
  });

  return {
    user: user,
  };
};
const deleteUser = async (userUUID) => {
  const user = await User.findOne({
    where: {
      uuid: userUUID,
    },
  });
  if (!user) HttpException(404, "User not found");

  await user.destroy();

  return {
    user: user,
  };
};

module.exports = {
  createUser,
  getAll,
  getUserById,
  getUserByUserName,
  updateUser,
  deleteUser,
};
