import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownEditor({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4 h-[80vh]">
      <textarea
        className="w-full p-4 bg-zinc-900 text-white rounded-xl resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your blog in Markdown..."
      />

      <div className="p-4 bg-white rounded-xl overflow-y-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {value}
        </ReactMarkdown>
      </div>
    </div>
  );
}
