import Comment from "../models/Comment.js";
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Comment content required" });
    }

    const comment = await Comment.create({
      content,
      author: req.user.id,
      post: req.params.id,
    });
    res.status(200).json(comment);
  } catch (err) {
    console.error("ADD COMMENT ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }

    if (comment.author.toString() !== req.user.id) {
      return res.status(404).json({ message: "Not Authorised" });
    }
    await comment.deleteOne();

    res.json({ message: "Comment Deleted" });
  } catch (err) {
    console.error("DELETE COMMENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCommetByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error("GET COMMENT BY POST ERROR", err);
    return res.status(500).json({ message: "Server error" });
  }
};
