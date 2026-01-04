import { useState } from "react";
import api from "../api/axios";
import MarkdownEditor from "../components/MarkdownEditor.jsx";

export default function CreateBlog() {
  const [content, setContent] = useState("");
  const submit = async () => {
    await api.post("/posts", { content });
    alert("blog published");
  };

  return (
    <div className="p-6">
      <MarkdownEditor value={content} onChange={setContent} />
      <button
        onClick={submit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl"
      >
        publish
      </button>
    </div>
  );
}
