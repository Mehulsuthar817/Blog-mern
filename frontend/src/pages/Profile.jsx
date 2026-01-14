import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios";
import { Cast } from "lucide-react";

export default function Profile() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/${id}/profile`);
        setProfile(res.data);
        setFormData({ name: res.data.user.name, bio: res.data.user.bio || "" });
      } catch (err) {
        console.error("PROFILE FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <p className="text-slate-400 text-lg">Profile not found</p>
        </div>
      </div>
    );
  }

  const { user: profileUser, posts, totalPosts } = profile;

  const isOwnProfile = user && user._id === profileUser._id;
  

  const handleSave = async () => {
    try {
      const res = await api.put(`/users/${user._id}`, formData, {
        withCredentials: true,
      });

      setProfile((prev) => ({ ...prev, user: res.data }));

      setEditing(false);
    } catch (err) {
      console.error("UPDATE PROFILE ERROR", err);
    }
  };


  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
        >
          <svg
            className="w-4 h-4"
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
          Back to Authors
        </button>
      </div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left - Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-48 h-48 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-6xl font-bold text-white shadow-2xl">
              {profileUser.name[0].toUpperCase()}
            </div>

            {/* Pencil Badge - Only show if it's the logged-in user's profile */}
            {isOwnProfile && !editing && (
              <div className="absolute bottom-2 right-2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center border-4 border-[#0a0e1a] cursor-pointer hover:bg-orange-400 transition-colors">
                <button
                  onClick={() => {
                    setEditing(true);
                  }}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
            )}
            {/* tick Badge= only shows when editing */}
            {isOwnProfile && editing && (
              <div className="absolute bottom-2 right-2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center border-4 border-[#0a0e1a] cursor-pointer hover:bg-orange-400 transition-colors">
                <button onClick={handleSave}>
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Right - Info */}
          <div className="flex-1">
            {/* Name */}
            {!editing && (
              <h1 className="text-5xl font-bold text-white mb-4">
                {profileUser.name}
              </h1>
            )}

            {editing && (
              <div className="text-5xl font-bold text-white mb-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
            )}

            {/* Bio */}
            <p className="text-lg text-slate-300 mb-6 max-w-2xl">
              {editing && (
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                  rows={3}
                />
              )}

              {profileUser.bio || " "}
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-2xl font-bold">{totalPosts}</span>
                </div>
                <p className="text-xs text-slate-500">Articles</p>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="text-2xl font-bold">
                    {posts.reduce((acc, p) => acc + (p.likes?.length || 0), 0)}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Total Likes</p>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
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
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <span className="text-2xl font-bold">
                    {posts.reduce((acc, p) => acc + (p.commentCount || 0), 0)}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Comments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="bg-gradient-to-b from-transparent to-[#0a0e1a] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-3">
              Articles by {profileUser.name.split(" ")[0]}
            </h2>
            <p className="text-slate-400">
              Explore all {totalPosts} articles written by this author
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500">No posts yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blogs/${post._id}`}
                  className="group block"
                >
                  <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-56 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                      <img
                        src={`https://source.unsplash.com/800x600/?technology,coding&sig=${post._id}`}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-semibold rounded">
                          Technology
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-grow">
                        {post.content
                          ? post.content.substring(0, 120) + "..."
                          : "Exploring technology and innovation..."}
                      </p>

                      {/* Footer */}
                      <div className="text-xs text-slate-500">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
