import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.listen(5000, () => {
  console.log("server running on port 5000");
});
