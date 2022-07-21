const router = require("express").Router();
const requireUser = require("../middlewares/requireUser");

const newsfeedRoutes = require("./newsfeed.routes");
const postRoutes = require("./post.routes");
const commentRoutes = require("./comment.routes");
const usersRoutes = require("./user.routes");

router.use("/newsfeed", requireUser, newsfeedRoutes);
router.use("/newsfeed/posts", requireUser, postRoutes);
router.use("/newsfeed/comments", requireUser, commentRoutes);
router.use("/newsfeed/users", requireUser, usersRoutes);

module.exports = router;
