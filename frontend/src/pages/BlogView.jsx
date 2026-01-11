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
    // console.log("post");
    // console.log(res.data);
    setLoading(false);
  };
  const fetchcomment = async () => {
    // console.log("comment obj");
    const res = await api.get(`comments/posts/${id}/comments`);
    // console.log("comment");
    // console.log(res.data);
    setCommentPage(res.data);
  };

  useEffect(() => {
    if (hasfetched.current) return;
    hasfetched.current = true;
    fetchPost();
    fetchcomment();
    // console.log(post);
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

  // const handleComDel = async () => {
  //   await api.delete(`/${}`);
  // };

  // console.log("user");
  // console.log(user);
  // console.log("post");
  // console.log(post);
  // console.log("userID");
  // console.log(user._id);
  const isOwner = user && post?.author?._id === user._id;
  // const isOwner = false;
  const isComOwn = user && commentpage.map((c) => c?.author._id === user._id);
  console.log(isComOwn);
  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      {isOwner && (
        <div>
          <button
            onClick={() => {
              navigate(`/blogs/${id}/edit`);
            }}
          >
            edit
          </button>

          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      <article className="prose max-w-none mb-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>

      <div className="flex items-center gap-4 mb-6">
        {user && (
          <button onClick={likePost} className="px-4 py-1 border rounded">
            ❤️ Like
          </button>
        )}
        <span>{post.likes?.length || 0} likes</span>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Comments</h2>

        {commentpage?.length === 0 && (
          <p className="text-gray-500">No comments yet</p>
        )}

        {commentpage?.map((c) => (
          <div key={c._id} className="border-b py-2">
            <p className="text-sm font-medium">{c.author?.name || "User"}</p>
            {c.author?._id === user._id && (
              <button
                onClick={async () => {
                  if (!confirm("are you sure")) return;
                  await api.delete(`comments/${c._id}`);
                  fetchcomment();
                }}
              >
                Delete
              </button>
            )}
            <p>{c.content}</p>
          </div>
        ))}
        {user ? (
          <form onSubmit={addComment} className="mt-4 flex gap-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border p-2 rounded"
            />
            <button className="px-4 bg-black text-white rounded">Send</button>
          </form>
        ) : (
          <p className="text-sm text-gray-500 mt-2">
            Login to like or see comment
          </p>
        )}
      </div>
    </div>
  );
}
