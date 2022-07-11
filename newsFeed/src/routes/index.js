const router = require("express").Router();
const requireUser = require("../middlewares/requireUser");

const newsfeedRoutes = require("./newsfeed.routes");
const postRoutes = require("./post.routes");
const commentRoutes = require("./comment.routes");
const usersRoutes = require("./user.routes");

router.use("/posts", requireUser, postRoutes);
router.use("/comments", requireUser, commentRoutes);
router.use("/newsfeed", requireUser, newsfeedRoutes);
router.use("/users", requireUser, usersRoutes);

module.exports = router;
