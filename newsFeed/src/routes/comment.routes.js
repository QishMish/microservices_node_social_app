const commentsRoutes = require("express").Router();
const commentController = require("../controllers/comments.controller");

const { getAllCommentsByPostId, createComment, updateComment, deleteComment } =
  commentController;

commentsRoutes.get("/:postId", getAllCommentsByPostId);
commentsRoutes.post("/:postId/create", createComment);
commentsRoutes.patch("/:postId/update/:commentId", updateComment);
commentsRoutes.delete("/:postId/delete/:commentId", deleteComment);

module.exports = commentsRoutes;
