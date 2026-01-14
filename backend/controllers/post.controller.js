import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, coverPhoto, excerpt, category } = req.body;
    if (!title || !content || !coverPhoto || !excerpt || !category) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const post = await Post.create({
      title,
      content,
      coverPhoto,
      excerpt,
      category,
      author: req.user.id,
    });
    return res.status(200).json(post);
  } catch (err) {
    console.log("CREATE POST ERROR:", err);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const total = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .populate("author", "name email coverPhoto excerpt category")
      .populate("commentCount")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
      posts,
    });
  } catch (err) {
    console.log("GET POSTS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getPostByUser = async (req, res) => {
  try {
    const posts = (await Post.find({ author: req.params.id })).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email coverPhoto excerpt category"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.views += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error("GET POST ERROR:", err);
    res.status(500).json({ message: "server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(404).json({ message: "Not Authorized" });
    }

    const { title, content, coverPhoto, excerpt, category } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    post.coverPhoto = coverPhoto || post.coverPhoto;
    post.excerpt = excerpt || post.excerpt;
    post.category = category || post.category;

    const updatedPost = await post.save();

    return res.json(updatedPost);
  } catch (err) {
    console.log("UPADATE POST ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user) {
      return res.status(404).json({ message: "not Authorised" });
    }

    await post.deleteOne();

    return res.json({ message: "post deleted" });
  } catch (err) {
    console.log("DELETE POST ERROR:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ message: "post not found" });
    }

    const userId = req.user.id;

    const alreadyLiked = post.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return res.json({
      likesCount: post.likes.length,
      liked: !alreadyLiked,
    });
  } catch (err) {
    console.log("LIKE ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
