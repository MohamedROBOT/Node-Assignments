import { Model, DataTypes } from "sequelize";
import User from "./user.model.js";
import { sequelize } from "../connection.js";
class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "User ID is required" },
      },
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Post",
    paranoid: true
  },
);

export default Post;
