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
    .sort({ createdAt: -1 })
    .populate("commentCount")
    .select("title createdAt views likes coverPhoto excerpt category ");

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

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
//     console.log("REQ USER:", req.user.id);
// console.log("PARAM ID:", userId);
    // only self-update
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }


    const { name, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, bio },
      { new: true, runValidators: true }
    ).select("name email bio avatar createdAt");

    res.json(user);
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: "server error" });
  }
};

