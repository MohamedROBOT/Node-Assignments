import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPostCommentsCount } from "./post.service.js";

const router = Router();

router.post("/", async (req, res, next) => {
  const { title, content, userId } = req.body;
  try {
    const createdPost = await createPost({ title, content, userId });
    res.status(201).json({
      message: "Post created successfully",
      post: createdPost,
      success: true,
    });
  } catch (error) {
    res.status(error.cause || 500).json({
      message: error.message,
      success: false,
    });
  }
});


router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const deleted = await deletePost(id, userId);
        res.status(200).json({
            message: "Post deleted successfully",
            success: true,
        });
    } catch (error) {
        res.status(error.cause || 500).json({
            message: error.message,
            success: false,
        });
    }
 }
);



router.get("/details", async (req, res, next) => {
try {
 const posts = await  getAllPosts();
res.status(200).json({
    message: "Posts retrieved successfully",
    posts,
    success: true,
})

} catch (error) {
    res.status(error.cause || 500).json({
        message: error.message,
        success: false,
    });
}
});


router.get("/comment-count", async (req, res, next) => {
    try {
        const posts = await  getPostCommentsCount();
        res.status(200).json({
            message: "Posts retrieved successfully",
            posts,
            success: true,
        })
    } catch (error) {
        res.status(error.cause || 500).json({
            message: error.message,
            success: false,
        });
    }
    });
export default router;
