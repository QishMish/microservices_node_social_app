const newFeedService = require("../services/newsfeed.service");

const getPostWithComments = async (req, res) => {
  const { postId } = req.params;

  const result = await newFeedService.getPostWithComments(postId);

  res.status(200).json(result);
};
const getAllPostsWithComments = async (req, res) => {

  const result = await newFeedService.getAllPostsWithComments();

  res.status(200).json(result);
};

module.exports = {
  getPostWithComments,
  getAllPostsWithComments
};
