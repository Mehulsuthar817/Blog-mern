import express from "express";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id/profile", getUserProfile);

export default router;
