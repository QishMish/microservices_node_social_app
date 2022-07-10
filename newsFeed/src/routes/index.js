const router = require("express").Router();
const newsfeedRoutes = require("./newsfeed.routes");
const requireUser = require("../middlewares/requireUser");

router.use("/posts", requireUser, newsfeedRoutes);

module.exports = router;
