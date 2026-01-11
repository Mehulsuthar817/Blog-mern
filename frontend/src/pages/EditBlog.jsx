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

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Title"
        />

        <div className="grid grid-cols-2 gap-4 h-[70vh]">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full p-4 border rounded resize-none font-mono"
          />
          <div className="p-4 border rounded overflow-y-auto prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>

        <button className="px-6 py-2 bg-black text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
