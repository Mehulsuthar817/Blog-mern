import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import readingTime from "../utils/readingTime";

export default function BlogView() {
  const { id } = useParams();
  const { user } = useAuth();
  const hasfetched = useRef(false);
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentpage, setCommentPage] = useState([]);

  const fetchPost = async () => {
    const res = await api.get(`/posts/${id}`);
    setPost(res.data);
    setLoading(false);
  };

  const fetchcomment = async () => {
    const res = await api.get(`comments/posts/${id}/comments`);
    setCommentPage(res.data);
  };

  useEffect(() => {
    if (hasfetched.current) return;
    hasfetched.current = true;
    fetchPost();
    fetchcomment();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    await api.delete(`/posts/${id}`);
    navigate("/blogs");
  };

  const likePost = async () => {
    await api.post(`/posts/${id}/like`);
    fetchPost();
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await api.post(`/posts/${id}/comments`, {
      content: comment,
    });

    setComment("");
    fetchcomment();
  };

  const isOwner = user && post?.author?._id === user._id;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Hero Section with Background Image */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Background Image */}
        <img
          src={`${post.coverPhoto}`}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/60 via-[#0a0e1a]/80 to-[#0a0e1a]"></div>

        {/* Content */}
        <div className="relative h-full max-w-4xl mx-auto px-6 flex flex-col justify-end pb-16">
          {/* Back Button */}
          <button
            onClick={() => navigate("/blogs")}
            className="absolute top-8 left-6 flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="text-sm font-medium">Back to stories</span>
          </button>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="px-3 py-1 bg-cyan-500 text-white text-sm font-semibold rounded">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 max-w-3xl">
            {post.title}
          </h1>

          {/* Subtitle/Excerpt */}
          <p className="text-lg text-slate-300 mb-8 max-w-2xl">
            {post.excerpt}
          </p>

          {/* Author Info & Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    <Link to={`/profile/${post.author._id}`}>
                      {(post.author?.name || "U").charAt(0).toUpperCase()}
                    </Link>
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold">
                    <Link to={`/profile/${post.author._id}`}>
                      {post.author?.name || "Unknown"}
                    </Link>
                  </p>
                  <p className="text-slate-400 text-sm flex items-center gap-2">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    <span>•</span>
                    <span>{readingTime(post.content)}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {user && (
                <button
                  onClick={likePost}
                  className="p-3 bg-slate-800/50 hover:bg-slate-800 backdrop-blur-sm rounded-full transition-colors"
                  title="Like"
                >
                  <svg
                    className="w-5 h-5 text-slate-300"
                    fill={
                      post.likes?.some((like) => like === user._id)
                        ? "currentColor"
                        : "none"
                    }
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              )}

              <button
                className="p-3 bg-slate-800/50 hover:bg-slate-800 backdrop-blur-sm rounded-full transition-colors"
                title="Bookmark"
              >
                <svg
                  className="w-5 h-5 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>

              <button
                className="p-3 bg-slate-800/50 hover:bg-slate-800 backdrop-blur-sm rounded-full transition-colors"
                title="Share"
              >
                <svg
                  className="w-5 h-5 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>

              {isOwner && (
                <>
                  <button
                    onClick={() => navigate(`/blogs/${id}/edit`)}
                    className="p-3 bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-sm rounded-full transition-colors"
                    title="Edit"
                  >
                    <svg
                      className="w-5 h-5 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleDelete}
                    className="p-3 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm rounded-full transition-colors"
                    title="Delete"
                  >
                    <svg
                      className="w-5 h-5 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <article
          className="prose prose-invert prose-slate prose-lg max-w-none
          prose-headings:text-white prose-headings:font-bold prose-headings:mb-4
          prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
          prose-strong:text-white prose-strong:font-bold
          prose-code:text-cyan-400 prose-code:bg-slate-800/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
          prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-800
          prose-blockquote:border-l-cyan-500 prose-blockquote:text-slate-400 prose-blockquote:italic
          prose-ul:text-slate-300 prose-ol:text-slate-300
          prose-li:text-slate-300 prose-li:mb-2
          prose-img:rounded-xl prose-img:my-8 text-white "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Engagement Stats */}
        <div className="flex items-center gap-6 py-8 border-y border-slate-800/50 mt-12">
          <div className="flex items-center gap-2 text-slate-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="font-semibold">{post.likes?.length || 0}</span>
            <span className="text-sm">likes</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="font-semibold">{commentpage?.length || 0}</span>
            <span className="text-sm">comments</span>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Comments ({commentpage?.length || 0})
          </h2>

          {/* Comment Form */}
          {user ? (
            <form onSubmit={addComment} className="mb-8">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {(user.name || "U").charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full bg-slate-900/50 border border-slate-800 focus:border-cyan-500/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 border border-slate-800 rounded-xl mb-8">
              <p className="text-slate-400 mb-3">
                Sign in to join the conversation
              </p>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Comments List */}
          {commentpage?.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {commentpage?.map((c) => (
                <div key={c._id} className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {(c.author?.name || "U").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-white font-semibold text-sm">
                          {c.author?.name || "User"}
                        </span>
                        <span className="text-slate-500 text-xs ml-2">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {c.author?._id === user?._id && (
                        <button
                          onClick={async () => {
                            if (!confirm("Delete this comment?")) return;
                            await api.delete(`comments/${c._id}`);
                            fetchcomment();
                          }}
                          className="text-slate-500 hover:text-red-400 transition-colors text-xs"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {c.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
