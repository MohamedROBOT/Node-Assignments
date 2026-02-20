import express from "express";
import { connectDB } from "./DB/index.js";
import collectionRouter from "./modules/collection/collection.controller.js";
import booksRouter from "./modules/books/books.controller.js";
import logsRouter from "./modules/logs/logs.controller.js";
const app = express();
const port = 3000;

connectDB();
app.use(express.json());

app.use("/collection", collectionRouter);
app.use("/books", booksRouter);
app.use("/logs", logsRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
