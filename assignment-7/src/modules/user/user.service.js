import User from "../../db/models/user.model.js";
export const checkUserExistence = async (condition) => {
  try {
    const user = await User.findOne({ where: condition });

    if (user) throw new Error("Email already exists", { cause: 409 });
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const user = User.build(userData);
    const createdUser = await user.save();
    if (!createdUser) throw new Error("Failed to create user", { cause: 500 });

    return createdUser;
  } catch (error) {
    throw error;
  }
};

export const updateOrCreateUser = async (id, userData) => {
  try {
    const user = await User.upsert({ id, ...userData }, { validate: false });
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (condition) => {
  try {
    const user = await User.findOne({ where: condition });
    if (!user) throw new Error("User not found", { cause: 404 });
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found", { cause: 404 });
    return user;
  } catch (error) {
    throw error;
  }
};