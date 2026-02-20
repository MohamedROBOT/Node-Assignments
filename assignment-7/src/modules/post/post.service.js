import Post from "../../db/models/post.model.js";
import User from "../../db/models/user.model.js";
import Comment from "../../db/models/comment.model.js";
import { fn } from "sequelize";
export const createPost = async (postData) => {
  try {
    const post = new Post(postData);
    const createdPost = await post.save();
    if (!createdPost) throw new Error("Failed to create post", { cause: 400 });

    return createdPost;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId, userId) => {
  try {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error("Post not found", { cause: 404 });

    if (post.userId !== userId)
      throw new Error("You are not authorized to delete this post", {
        cause: 403,
      });
    await post.destroy();
    return true;
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async () => {
  //needs to add comments here after making associations
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ["id", "name"] },
        {
          model: Comment,
          attributes: ["id", "content"],
        },
      ],
    });

    if (posts.length === 0) throw new Error("No posts found", { cause: 404 });
    return posts;
  } catch (error) {
    throw error;
  }
};

export const getPostCommentsCount = async () => {
  //problem it doesn't return 0 for posts with no comments
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title", [fn("COUNT", "comments.id"), "commentCount"]],
      include: [{ model: Comment, attributes: [], required: false }],
      group: ["Post.id"],
    });
    return posts;
  } catch (error) {
    throw error;
  }
};
