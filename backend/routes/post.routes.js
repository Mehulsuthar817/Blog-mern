import express from "express";
import {
  createPost,
  getPostById,
  getPosts,
  updatePost,
  deletePost,
  toggleLikePost,
} from "../controllers/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { addComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.post("/:id/like",authMiddleware,toggleLikePost);
router.post("/:id/comments", authMiddleware, addComment);

export default router;
