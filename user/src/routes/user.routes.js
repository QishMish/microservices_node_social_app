const userRoutes = require("express").Router();
const userController = require("../controllers/user.controller");

const {
  createUser,
  getAll,
  getUserById,
  updateUser,
  deleteUser,
  getUserByUserName,
  addFriend
} = userController;

userRoutes.post("/create", createUser);
userRoutes.get("/:userUUId", getUserById);
userRoutes.get("/:username", getUserByUserName);
userRoutes.get("/", getAll);
userRoutes.patch("/update/:userUUId", updateUser);
userRoutes.delete("/delete/:userUUId", deleteUser);
userRoutes.post("/addfriend", addFriend);

module.exports = userRoutes;
