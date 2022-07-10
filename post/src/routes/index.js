const router = require("express").Router();
const postRoutes = require("./post.routes");
const requireUser = require("../middlewares/requireUser");

router.use("/posts", requireUser, postRoutes);

module.exports = router;
