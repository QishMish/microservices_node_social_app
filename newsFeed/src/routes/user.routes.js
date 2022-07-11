const userRoutes = require("express").Router();
const userController = require("../controllers/user.controller");

const {
  getAll,
  getUserById,
  getUserByUserName,
  createUser
} = userController;


userRoutes.post("/create", createUser);
userRoutes.get("/:userUUID", getUserById);
userRoutes.get("/:username", getUserByUserName);
userRoutes.get("/", getAll);


module.exports = userRoutes;
