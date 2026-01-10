import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownEditor({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4 h-[70vh]">
      {/* Editor */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your blog in Markdown..."
        className="w-full h-full p-4 border rounded resize-none font-mono"
      />

      {/* Preview */}
      <div className="p-4 border rounded overflow-y-auto prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {value || "_Nothing to preview yet_"}
        </ReactMarkdown>
      </div>
    </div>
  );
}
