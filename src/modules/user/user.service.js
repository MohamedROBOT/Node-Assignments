import { userRepository } from "../../DB/index.js";

export const checkUserExistence = async (userData) => {
  return await userRepository.getOne(userData);
};

export const updateUser = async (filter, update, options) => {
  return await userRepository.update(filter, update, options);
};

export const deleteUser = (id) => {
  return userRepository.deleteById(id);
};
