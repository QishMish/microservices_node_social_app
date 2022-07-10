const { Post } = require("../models");
const { v4: uuidv4 } = require("uuid");

const getPostById = async (postId) => {
  const post = await Post.findOne({
    where: {
      uuid: postId,
    },
  });
  return {
    post: post,
  };
};
const getAllPosts = async () => {
  const posts = await Post.findAll({});
  return {
    posts: posts,
  };
};
const getMyPosts = async (userId) => {
  const posts = await Post.findAll({
    where: {
      user_id: userId,
    },
  });
  return {
    posts: posts,
  };
};
const createPost = async (userId, postData) => {
  const { body, media } = postData;
  const postCreated = await new Post({
    uuid: uuidv4(),
    body: body,
    media: media,
    user_id: userId,
  });

  await postCreated.save();

  return {
    post: postCreated,
  };
};
const updatePost = async (postId, userId, postFields) => {
  const { body, media } = postFields;

  const post = await Post.findOne({
    where: { uuid: postId, user_id: userId },
  });
  if (!post) throw new HttpException("Error during editing post", 400);

  post.set({
    ...(body && { body }),
    ...(media && { media }),
  });

  return {
    post: post,
  };
};
const deletePost = async (postId, userId) => {
  const post = await Post.findOne({
    where: {
      uuid: postId,
      user_id: userId,
    },
  });
  if (!post) throwHttpException(404, "Post not found");

  await post.destroy();

  return {
    post: post,
  };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
  getMyPosts,
};
