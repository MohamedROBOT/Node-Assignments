import express from "express";
import { authRouter, noteRouter, userRouter } from "./modules/index.js";
import { appConfig } from "../config/config.service.js";
import { connectDB } from "./DB/connection.js";
export const bootstrap = async () => {
  const app = express();
  connectDB();
  const port = appConfig.port;
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/note",noteRouter);
  app.use((error, req, res, next) => {
    return res.status(error.cause || 500).json({
      message: error.message,
      success: false,
    });
  });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
