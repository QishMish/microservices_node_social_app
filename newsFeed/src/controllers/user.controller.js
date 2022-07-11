const userService = require("../services/user.service");

const createUser = async (req, res) => {
  const { email, username, verified } = req.body;
  const response = await userService.createUser({ email, username, verified });
  res.status(201).json(response);
};
const getAll = async (req, res) => {
  const response = await userService.getAll();
  res.status(200).json(response);
};
const getUserById = async (req, res) => {
  const { userUUID } = req.params;
  const response = await userService.getUserById(userUUID);
  res.status(200).json(response);
};
const getUserByUserName = async (req, res) => {
  const { username } = req.params;
  const response = await userService.getUserByUserName(username);
  res.status(200).json(response);
};



module.exports = {
  getAll,
  getUserById,
  getUserByUserName,
  createUser
};
