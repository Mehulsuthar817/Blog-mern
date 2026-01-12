import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  
  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/posts?page=${page}&limit=${limit}`);
      setPost(res.data.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPost();
  }, [page]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400 text-lg">Loading articles...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-slate-950 py-24 px-6">
      {/* Background effects */}
      <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-5xl lg:text-6xl font-black text-white">
            All <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Blogs</span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-500 text-lg">No posts yet</p>
            <p className="text-slate-600 text-sm mt-2">Check back later for new content</p>
          </div>
        )}

        {/* Blog Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/blogs/${post._id}`}
              className="group block relative"
            >
              {/* Hover glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Card */}
              <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 group-hover:scale-[1.02]">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-emerald-500/20 rounded-tr-2xl"></div>
                
                <div className="space-y-3">
                  {/* Title */}
                  <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {post.title || "Untitled post"}
                  </h2>

                  {/* Author & Date */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {(post.author?.name || "U").charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-slate-400 font-medium">
                        {post.author?.name || "Unknown"}
                      </span>
                    </div>
                    
                    <div className="h-4 w-px bg-slate-700"></div>
                    
                    <div className="flex items-center gap-2 text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Read more indicator */}
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Read article</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 pt-8">
          <button
            className="group flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 rounded-xl font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-800/50 disabled:hover:border-slate-700 transition-all duration-300 hover:scale-105"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <span className="text-emerald-400 font-bold text-lg">{page}</span>
          </div>

          <button
            className="group flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 rounded-xl font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-800/50 disabled:hover:border-slate-700 transition-all duration-300 hover:scale-105"
            disabled={posts.length < limit}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}