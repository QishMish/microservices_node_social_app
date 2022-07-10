const router = require("express").Router();
const commentsRoutes = require("./comment.routes");

router.use("/comments", commentsRoutes);

module.exports = router;
