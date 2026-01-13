import User from "../models/Users.js";
import Post from "../models/Post.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // 1. Get user info
    const user = await User.findById(userId).select(
      "name email bio avatar createdAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Get user's posts
    const posts = await Post.find({ author: userId })
    .populate("commentCount")
    .populate("likes")
      .sort({ createdAt: -1 })
      .select("title createdAt views");

    res.json({
      user,
      posts,
      totalPosts: posts.length,
    });
  } catch (err) {
    console.error("PROFILE ERROR:", err);
    res.status(500).json({ message: "server error" });
  }
};
