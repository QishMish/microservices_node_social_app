const postService = require("../services/post.service");

const getPostById = async (req, res) => {
  const { postId } = req.params;
  const response = await postService.getPostById(postId);

  res.status(200).json(response);
};
const getAllPosts = async (req, res) => {
  const response = await postService.getAllPosts();

  res.status(200).json(response);
};
const getMyPosts = async (req, res) => {
  const { id: userId } = req.user;
  const response = await postService.getMyPosts(userId);

  res.status(200).json(response);
};
const createPost = async (req, res) => {
  const { id: userId } = req.user;
  const { body, media } = req.body;

  const response = await postService.createPost(userId, { body, media });

  res.status(201).json(response);
};
const updatePost = async (req, res) => {
  const { id: userId } = req.user;
  const { postId } = req.params;
  const { body, media } = req.body;

  const response = await postService.createPost(postId, userId, {
    body,
    media,
  });

  res.status(201).json(response);
};
const deletePost = async (req, res) => {
  const { id: userId } = req.user;
  const { postId } = req.params;

  const response = await postService.deletePost(postId, userId);

  res.status(201).json(response);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
  getMyPosts,
};
