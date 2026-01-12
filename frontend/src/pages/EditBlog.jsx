import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../api/axios";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/posts/${id}`);
      setTitle(res.data.title || "");
      setContent(res.data.content || "");
      setLoading(false);
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/posts/${id}`, { title, content });
    navigate(`/blogs/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-24 px-6">
      {/* Subtle background effects */}
      <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-600/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Edit <span className="text-cyan-400">Article</span>
            </h1>
            <div className="h-0.5 w-16 bg-cyan-400"></div>
          </div>
          
          <button
            onClick={() => navigate(`/blogs/${id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white text-sm font-semibold rounded-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Title Input */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
            <label className="block mb-3">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span className="text-white font-semibold">Title</span>
              </div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 focus:border-cyan-500/50 rounded-lg px-4 py-3 text-white text-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                placeholder="Enter article title..."
              />
            </label>
          </div>

          {/* Editor Section */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="text-white font-semibold">Content</span>
              </div>
              <span className="text-slate-500 text-xs">Markdown supported</span>
            </div>

            {/* Split Editor View */}
            <div className="grid lg:grid-cols-2 gap-4 h-[600px]">
              {/* Editor */}
              <div className="relative overflow-hidden">
                <div className="absolute top-3 left-3 text-xs text-slate-500 font-medium z-10">EDITOR</div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-full pt-10 p-4 bg-slate-800/50 border border-slate-700/50 focus:border-cyan-500/50 rounded-lg text-slate-300 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Write your article content in Markdown..."
                />
              </div>

              {/* Preview */}
              <div className="relative overflow-hidden rounded-lg bg-slate-800/30 border border-slate-700/30">
                <div className="absolute top-3 left-3 text-xs text-slate-500 font-medium z-10">PREVIEW</div>
                <div className="w-full h-full pt-10 p-4 overflow-y-auto prose prose-invert prose-slate prose-sm max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-p:text-slate-300 prose-p:leading-relaxed
                  prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
                  prose-strong:text-white prose-strong:font-bold
                  prose-code:text-cyan-400 prose-code:bg-slate-800/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-xs
                  prose-pre:bg-slate-800/50 prose-pre:border prose-pre:border-slate-700/50
                  prose-blockquote:border-l-cyan-500 prose-blockquote:text-slate-400
                  prose-ul:text-slate-300 prose-ol:text-slate-300
                  prose-li:text-slate-300">
                  {content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-slate-500 italic">Preview will appear here...</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate(`/blogs/${id}`)}
              className="px-5 py-2.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white text-sm font-semibold rounded-lg transition-all"
            >
              Discard Changes
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setContent("");
                }}
                className="px-5 py-2.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-sm font-semibold rounded-lg transition-all"
              >
                Clear All
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-cyan-500/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
            </div>
          </div>

          {/* Helper Text */}
          <div className="flex items-start gap-3 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
            <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-slate-400 text-sm">
              <p className="font-semibold text-slate-300 mb-1">Markdown Tips</p>
              <p># Heading 1 • ** bold text ** • * italic * • [link](url) • ` code ` • ``` code block ```</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}