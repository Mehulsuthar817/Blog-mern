import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

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
  const isComOwn = user && commentpage.map((c) => c?.author._id === user._id);
  console.log(isComOwn);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-slate-950 py-24 px-6">
      {/* Background effects */}
      <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-8 lg:p-12 mb-8">
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-emerald-500/20 rounded-tr-3xl"></div>
          
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {(post.author?.name || "U").charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-white font-semibold">{post.author?.name || "Unknown"}</p>
                <p className="text-slate-500 text-sm">
                  {new Date(post.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Owner Actions */}
            {isOwner && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => navigate(`/blogs/${id}/edit`)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/50 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-500/50 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <article className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/30 rounded-3xl p-8 lg:p-12 mb-8 prose prose-invert prose-slate prose-lg max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300
          prose-strong:text-white prose-strong:font-bold
          prose-code:text-emerald-400 prose-code:bg-slate-800/50 prose-code:px-2 prose-code:py-1 prose-code:rounded
          prose-pre:bg-slate-800/50 prose-pre:border prose-pre:border-slate-700/50
          prose-blockquote:border-l-emerald-500 prose-blockquote:text-slate-400
          prose-ul:text-slate-300 prose-ol:text-slate-300
          prose-li:text-slate-300 text-white">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Engagement Section */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-8 mb-8">
          <div className="flex items-center gap-6">
            {user && (
              <button 
                onClick={likePost} 
                className="group flex items-center gap-3 px-6 py-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-500/50 rounded-xl font-semibold text-rose-400 transition-all duration-300 hover:scale-105"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Like
              </button>
            )}
            <div className="flex items-center gap-2 text-slate-400">
              <svg className="w-5 h-5 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="font-semibold text-lg">{post.likes?.length || 0}</span>
              <span>likes</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Comments
            <span className="text-sm font-normal text-slate-500">({commentpage?.length || 0})</span>
          </h2>

          {/* Empty State */}
          {commentpage?.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-slate-500">No comments yet</p>
              <p className="text-slate-600 text-sm mt-1">Be the first to share your thoughts</p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4 mb-6">
            {commentpage?.map((c) => (
              <div key={c._id} className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-5 hover:border-slate-700/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {(c.author?.name || "U").charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{c.author?.name || "User"}</p>
                      <p className="text-slate-500 text-xs">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {c.author?._id === user?._id && (
                    <button
                      onClick={async () => {
                        if (!confirm("Delete this comment?")) return;
                        await api.delete(`comments/${c._id}`);
                        fetchcomment();
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
                <p className="text-slate-300 leading-relaxed pl-13">{c.content}</p>
              </div>
            ))}
          </div>

          {/* Comment Form */}
          {user ? (
            <form onSubmit={addComment} className="flex gap-3">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-slate-800/50 border border-slate-700/50 focus:border-emerald-500/50 rounded-xl px-5 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30">
                Send
              </button>
            </form>
          ) : (
            <div className="text-center py-8 border-t border-slate-800/50">
              <p className="text-slate-500 mb-3">Login to like and comment</p>
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all duration-300 hover:scale-105"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}