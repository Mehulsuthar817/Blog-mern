import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import api from "../api/axios";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const categories = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Food",
    "Business",
    "Health",
    "Education",
    "Entertainment"
  ];

  const submit = async () => {
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and Content are required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/posts", { title, content, coverPhoto, excerpt, category });
      navigate(`/blogs/${res.data._id}`);
    } catch (err) {
      console.log(err);
      setError("Failed to publish post");
    } finally {
      setLoading(false);
    }
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-[#0a0e1a]">
        {/* Subtle background effects */}
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-600/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-6 py-24">
          <button
            onClick={() => setShowPreview(false)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Editor
          </button>

          {coverPhoto && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-slate-800/50">
              <img src={coverPhoto} alt={title} className="w-full h-96 object-cover" />
            </div>
          )}

          {category && (
            <span className="inline-block px-3 py-1 bg-cyan-500 text-white text-sm font-semibold rounded-full mb-4">
              {category}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title || "Untitled Story"}</h1>
          
          {excerpt && (
            <p className="text-xl text-slate-400 mb-8 italic">{excerpt}</p>
          )}

          <div className="prose prose-invert prose-slate prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-p:text-slate-300 prose-p:leading-relaxed
            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
            prose-strong:text-white prose-strong:font-bold
            prose-code:text-cyan-400 prose-code:bg-slate-800/50 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-slate-800/50 prose-pre:border prose-pre:border-slate-700/50
            prose-blockquote:border-l-cyan-500 prose-blockquote:text-slate-400
            prose-ul:text-slate-300 prose-ol:text-slate-300
            prose-li:text-slate-300">
            <ReactMarkdown>{content || "*No content yet...*"}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-24 px-6">
      {/* Subtle background effects */}
      <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-600/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <button 
              onClick={() => navigate('/blogs')}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">
              Create New <span className="text-cyan-400">Story</span>
            </h1>
            <p className="text-slate-400">Share your thoughts with the world</p>
          </div>
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-white text-sm font-medium transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3 animate-shake">
            <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-400">{error}</p>
            <button onClick={() => setError("")} className="ml-auto text-red-400 hover:text-red-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Cover Image */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Cover Image URL
            </label>
            <input
              type="text"
              value={coverPhoto}
              onChange={(e) => setCoverPhoto(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-slate-800/50 border border-slate-700/50 focus:border-cyan-500/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          {/* Title */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a captivating title..."
              maxLength={100}
              className="w-full bg-slate-800/50 border border-slate-700/50 focus:border-cyan-500/50 rounded-lg px-4 py-3 text-white text-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
            <p className="text-right text-sm text-slate-500 mt-2">{title.length}/100</p>
          </div>

          {/* Excerpt */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write a brief summary that hooks your readers..."
              maxLength={200}
              rows={3}
              className="w-full bg-slate-800/50 border border-slate-700/50 focus:border-cyan-500/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 resize-none transition-all"
            />
            <p className="text-right text-sm text-slate-500 mt-2">{excerpt.length}/200</p>
          </div>

          {/* Category */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700/50 focus:border-cyan-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              <option value="" className="bg-slate-900">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Content <span className="text-red-400">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell your story... Use markdown for formatting (## for headings, **bold**, *italic*, etc.)"
              rows={12}
              className="w-full bg-slate-800/50 border border-slate-700/50 focus:border-cyan-500/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 resize-none transition-all font-mono text-sm"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-slate-500">Supports Markdown formatting</p>
              <p className="text-sm text-slate-500">~{content.split(/\s+/).filter(w => w).length} words</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/blogs')}
              className="px-6 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white rounded-lg font-semibold transition-all"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={submit}
              disabled={loading}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/30"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Publish Story
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}