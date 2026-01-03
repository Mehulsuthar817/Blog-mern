import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      requred: true,
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post",postSchema);