import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useParams } from "react-router-dom";

export default function BlogView() {
  const { id } = useParams();

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState("true");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
        setError("Post not found");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">
        {post.title || "Untitled Post"}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        By {post.author?.name || "Unknown"} •{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <article className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
