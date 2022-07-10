const commentService = require("../services/comment.service");

const getAllCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  const result = await commentService.getAllCommentsByPostId(postId);

  res.status(200).json(result);
};
const createComment = async (req, res) => {
  const { id: userId } = req.user;
  const { body, postId } = req.body;

  const result = await commentService.createComment(userId, { body, postId });

  res.status(200).json(result);
};
const updateComment = async (req, res) => {
  const { id: userId } = req.user;
  const { commentId } = req.params;
  const { body, postId } = req.body;

  const result = await commentService.updateComment(commentId, userId, {
    body,
    postId,
  });

  res.status(200).json(result);
};
const deleteComment = async (req, res) => {
  const { id: userId } = req.user;
  const { commentId } = req.params;
  const result = await commentService.deleteComment(commentId, userId);

  res.status(200).json(result);
};

module.exports = {
  getAllCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};
