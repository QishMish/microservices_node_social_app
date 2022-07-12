const userService = require("../services/user.service");
const friendShipService = require("../services/friendship.service");

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
  const { userUUId } = req.params;
  const response = await userService.getUserById(userUUId);
  res.status(200).json(response);
};
const getUserByUserName = async (req, res) => {
  const { username } = req.params;
  const response = await userService.getUserByUserName(username);
  res.status(200).json(response);
};
const updateUser = async (req, res) => {
  const { userUUId } = req.params;
  const { username, email, verified, status } = req.body;
  const response = await userService.updateUser(userUUId, {
    username,
    email,
    verified,
    status,
  });
  res.status(200).json(response);
};
const deleteUser = async (req, res) => {
  const { userUUId } = req.params;
  const response = await userService.deleteUser(userUUId);
  res.status(200).json(response);
};
const addFriend = async (req, res) => {
  const { requesterId, addresseeId } = req.body;
  const response = await friendShipService.addFriend(requesterId, addresseeId);
  res.status(201).json(response);
};
const follow = async (req, res) => {
  const { followerId, followingId } = req.body;
  const response = await userService.follow(followerId, followingId);
  res.status(201).json(response);
};
const getFollowers = async (req, res) => {
  const { userId } = req.params;
  const response = await userService.getFollowers(userId);
  res.status(201).json(response);
};
module.exports = {
  createUser,
  getAll,
  getUserById,
  updateUser,
  deleteUser,
  getUserByUserName,
  addFriend,
  follow,
  getFollowers
};
