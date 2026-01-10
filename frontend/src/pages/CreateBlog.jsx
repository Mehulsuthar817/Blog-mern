import { useState } from "react";
import api from "../api/axios";
import MarkdownEditor from "../components/MarkdownEditor.jsx";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("Content is Required");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/posts", { title, content });

      navigate(`/blogs/${res.data._id}`);
    } catch (err) {
      console.log(err);
      setError("Failed to publish post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1>{error && <p>{error}</p>}</h1>
      <form onSubmit={submit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <MarkdownEditor value={content} onChange={setContent} />
        <button disabled={loading}>
          {loading ? "publishing..." : "publish"}
        </button>
      </form>
    </div>
  );
}
