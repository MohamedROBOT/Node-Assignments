import { Router } from "express";
import {
  createComments,
  findOrCreateComment,
  getRecentComments,
  getSpecificCommentInfo,
  searchCommentByQuery,
  updateComment,
} from "./comment.service.js";

const router = Router();

export default router;

router.post("/", async (req, res, next) => {
  try {
    //get data from body
    const comments = await createComments(req.body);
    // send response
    res
      .status(201)
      .json({ message: "Comments created", comments, success: true });
  } catch (error) {
    res.status(error.cause || 500).json({ error: error.message });
  }
});

router.patch("/:commentId", async (req, res, next) => {
  const commentId = req.params.commentId;
  const { content, userId } = req.body;
  try {
    const updatedComment = await updateComment(userId, { content }, commentId);
    res.status(200).json({ message: "Comment updated" });
  } catch (error) {
    res.status(error.cause || 500).json({ error: error.message });
  }
});

router.post("/find-or-create", async (req, res, next) => {
  try {
    const [comment, created] = await findOrCreateComment(req.body);
    res
      .status(200)
      .json({ success: true, comment, created: created ? true : false });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ success: false, error: error.message });
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const { word, limit } = req.query;

    const { count, rows } = await searchCommentByQuery(word, limit);
    res.status(200).json({ count, comments: rows });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ success: false, message: error.message });
  }
});

router.get("/newest/:postId", async (req, res, next) => {
  try {
    const comments = await getRecentComments({ postId: req.params.postId });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(error.cause || 500).json({ error: error.message });
  }
});

router.get("/details/:id", async (req, res, next) => {
  try {
    const comment = await getSpecificCommentInfo(req.params.id);
    res.status(200).json({ comment });
  } catch (error) {
    res.status(error.cause || 500).json({ error: error.message });
  }
});
