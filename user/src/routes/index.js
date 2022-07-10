const router = require("express").Router();
const userRoutes = require("./user.routes");
const requireUser = require("../middlewares/requireUser");

router.use("/users", requireUser, userRoutes);

module.exports = router;
