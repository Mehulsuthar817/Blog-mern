import express from "express";
import { getUserProfile,updateProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js"
const router = express.Router();

router.get("/:id/profile", getUserProfile);
router.put("/:id", authMiddleware, updateProfile);

export default router;
