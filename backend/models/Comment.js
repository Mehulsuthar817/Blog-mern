import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
