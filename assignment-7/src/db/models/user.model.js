import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      checkPasswordLength(value) {
        if (value.length < 6) {
          throw new Error("Password must be at least 6 characters long");
        }
      },
    },
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
  },
});

function checkNameLength(name) {
  if (name.length < 2) {
    throw new Error("Name must be at least 2 characters long");
  }
}

User.beforeCreate((user) => {
  checkNameLength(user.name);
});

export default User;
