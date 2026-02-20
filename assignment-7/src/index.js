import express from "express";
import { connectDB, sequelize } from "./db/connection.js";
import userRouter from "./modules/user/user.controller.js";
import postRouter from "./modules/post/post.controller.js";
import commentRouter from "./modules/comment/comment.controller.js";
import "./db/models/associations.js";
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

connectDB();

app.use(express.json());

app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter);

sequelize.sync();
