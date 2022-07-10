const { Post, Comment } = require("../models");
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
      uuid: postCreated.uuid,
    },
    include: [
      {
        model: Comment,
        as: "comments",
      },
    ],
  });
  return {
    post: post,
  };
};

module.exports = {
  getPostWithComments,
};
