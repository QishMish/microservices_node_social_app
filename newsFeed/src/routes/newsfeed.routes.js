const newsFeedRoutes = require("express").Router();
const newsFeedController = require("../controllers/newsfeed.controller");

const { getPostWithComments,getAllPostsWithComments } = newsFeedController;

newsFeedRoutes.get("/posts/comments", getAllPostsWithComments);
newsFeedRoutes.get("/:postId/comments", getPostWithComments);

module.exports = newsFeedRoutes;
