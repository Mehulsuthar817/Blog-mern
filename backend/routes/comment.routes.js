import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { addComment, deleteComment, getCommetByPost } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/posts/:id/comments",authMiddleware,addComment);
router.delete("/:id",authMiddleware,deleteComment);
router.get("/posts/:id/comments",authMiddleware,getCommetByPost);

export default router;
