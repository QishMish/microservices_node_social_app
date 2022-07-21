const { Comment } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { HttpException } = require("../exceptions/http.exception");

const getAllCommentsByPostId = async (postId) => {
  const comments = await Comment.findAll({
    where: {
      post_id: postId,
    },
  });

  return {
    comments: comments,
  };
};
const createComment = async (userId, commentData) => {
  const { body, postId } = commentData;

  const commentCreated = await new Comment({
    uuid: uuidv4(),
    body: body,
    user_id: userId,
    post_id: postId,
  });

  await commentCreated.save();

  return {
    comment: commentCreated,
  };
};
const updateComment = async (commentId, userId, commentData) => {
  const { body, postId } = commentData;

  const comment = await Comment.findOne({
    where: { uuid: commentId, user_id: userId },
  });
  if (!comment) throw new HttpException("Error during editing comment", 400);

  comment.set({
    ...(body && { body }),
  });

  return {
    comment: comment,
  };
};
const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findOne({
    where: {
      uuid: commentId,
      user_id: userId,
    },
  });
  if (!comment) throwHttpException(404, "Comment not found");

  await comment.destroy();

  return {
    comment: comment,
  };
};

module.exports = {
  getAllCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};
