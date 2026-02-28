import jwt from "jsonwebtoken";
import { appConfig } from "../../../config/config.service.js";
export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id.toString(),
    },
    appConfig.jwtSecret,
    {
      expiresIn: appConfig.JWT_EXPIRY,
      
    },
  );
  return token;
};

export const verifyToken = (token) => {
    if(!token) throw new Error("Token not found")
      
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded;
};
