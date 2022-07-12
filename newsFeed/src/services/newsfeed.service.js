const { Post, Comment, User, PostLike } = require("../models");
const { v4: uuidv4 } = require("uuid");

const getPostWithComments = async (postUUID) => {
  // const postCreated = await Post.create({
  //   uuid: uuidv4(),
  //   body: "post1",
  //   media: "media1",
  //   user_id: 24,
  // });
  // const commentCreated = await Comment.create({
  //   uuid: uuidv4(),
  //   body: "comment",
  //   post_id: postCreated.uuid,
  //   user_id: 24,
  // });
  // console.log(commentCreated)

  const post = await Post.findOne({
    where: {
      uuid: postUUID,
    },
    include: [
      {
        model: Comment,
        as: "comments",
        include: [User],
      },
      {
        model: User,
      },
      {
        model: PostLike,
        as:'likes',
        // include:[
        //   {
        //     model:Post,
        //     as:"user"
        //   }
        // ]
      },
    ],
  });

  const postLikes = await PostLike.findAll({});

  console.log(postLikes)

  return {
    post: post,
    postLikes
  };
};
const getAllPostsWithComments = async () => {
  const posts = await Post.findAll({
    include: [
      {
        model: Comment,
        as: "comments",
        include: [User],
      },
      {
        model: User,
      },
    ],
  });
  return {
    posts: posts,
  };
};
const getAllPostsWithComments = async () => {
  const posts = await Post.findAll({
    include: [
      {
        model: Comment,
        as: "comments",
        include: [User],
      },
      {
        model: User,
      },
    ],
  });
  return {
    posts: posts,
  };
};

module.exports = {
  getPostWithComments,
  getAllPostsWithComments,
};
