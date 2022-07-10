const newsFeedRoutes = require("express").Router();
const newsFeedController = require("../controllers/newsfeed.controller");

const { getPostWithComments } = newsFeedController;

newsFeedRoutes.get("/:postId/comments", getPostWithComments);

module.exports = newsFeedRoutes;
