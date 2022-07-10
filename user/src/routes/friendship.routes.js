const friendShipRoutes = require("express").Router();
const friendShipController = require("../controllers/friendship.controller");

const { addFriend } = friendShipController;

friendShipRoutes.post("/addfriend", addFriend);

module.exports = friendShipRoutes;
