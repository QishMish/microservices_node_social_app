const friendShipService = require("../services/friendship.service");

const addFriend = async (req, res) => {
  const { requesterId, addresseeId } = req.body;
  const response = await friendShipService.addFriend(requesterId, addresseeId);
  res.status(201).json(response);
};
module.exports = {
  addFriend,
};
