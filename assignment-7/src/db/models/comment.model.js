import { Model, DataTypes } from "sequelize";
import User from "./user.model.js";
import Post from "./post.model.js";
import { sequelize } from "../connection.js";
class Comment extends Model {}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "postId is required" },
      },
      references: {
        model: Post,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "userId is required" },
      },
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Comment",
  },
);

export default Comment;
