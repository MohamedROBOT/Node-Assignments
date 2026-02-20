import { Op } from "sequelize";
import Comment from "../../db/models/comment.model.js";
import User from "../../db/models/user.model.js";
import Post from "../../db/models/post.model.js";

export const createComments = async (commentData) => {
  try {
    //takes arr
    const comments = await Comment.bulkCreate(commentData, { validate: true });

    return comments;
  } catch (error) {
    throw new Error("Faild to create comments", { cause: 400 });
  }
};

export const updateComment = async (userId, content, commentId) => {
  try {
    const commentToUpdate = await Comment.findByPk(commentId);
    if (!commentToUpdate) throw new Error("Comment not found", { cause: 404 });

    if (commentToUpdate.userId !== userId)
      throw new Error("You are not authorized to update this comment", {
        cause: 403,
      });

    const comment = await Comment.update(content, { where: { id: commentId } });

    return comment;
  } catch (error) {
    throw error;
  }
};

export const findOrCreateComment = async (commentData) => {
  try {
    const comment = await Comment.findOrCreate({
      where: commentData,
      defaults: commentData,
    });

    return comment;
  } catch (error) {
    throw error;
  }
};

export const searchCommentByQuery = async (word, limit) => {
  try {
    const comments = await Comment.findAndCountAll({
      where: {
        content: { [Op.like]: `${word}%` },
      },

      limit: parseInt(limit) || 10,
    });

    if (comments.rows === 0)
      throw new Error("No comments found", { cause: 404 });

    return comments;
  } catch (error) {
    throw error;
  }
};

export const getRecentComments = async (condition) => {
  try {
    const comments = await Comment.findAll({
      where: condition,
      attributes: ["id", "content", "createdAt"],
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
    if (comments.length === 0)
      throw new Error("No comments found", { cause: 404 });
    return comments;
  } catch (error) {
    throw error;
  }
};

export const getSpecificCommentInfo = async (commentId) => {
  try {
    const comment = await Comment.findByPk(commentId, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Post, attributes: ["id", "title", "content"] },
      ],
    });

    if (!comment) throw new Error("no comment found", { cause: 404 });
    return comment;
  } catch (error) {
    throw error;
  }
};
