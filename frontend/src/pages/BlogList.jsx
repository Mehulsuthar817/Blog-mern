import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get("/posts");
        console.log(res.data);
        setPost(res.data.posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">All Blogs</h1>
        {posts.length === 0 && <p className="text-gray-500">No post yet</p>}

        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/blogs/${post._id}`}
            className="block p-4 border rounded-lg hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">
              {post.title || "Untitled post"}
            </h2>

            <p className="text-sm text-gray-500">
              {" "}
              by {post.author?.name || "Unknown"}{" "}
            </p>

            <p className="text-xs text-gray-400">
              {" "}
              {new Date(post.createdAt).toLocaleDateString()}{" "}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
