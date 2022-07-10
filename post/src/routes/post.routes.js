const postRoutes = require("express").Router();
const postController = require("../controllers/post.controller");

const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
  getMyPosts,
  likePost
} = postController;

postRoutes.post("/create", createPost);
postRoutes.get("/my-posts", getMyPosts);
postRoutes.get("/:postId", getPostById);
postRoutes.get("/", getAllPosts);
postRoutes.patch("/update/:postId", updatePost);
postRoutes.delete("/delete/:postId", deletePost);
postRoutes.post("/like/:postId", likePost);

module.exports = postRoutes;
