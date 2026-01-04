import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogView({ post }) {
  return (
    <article className="prose max-w-4xl mx-auto">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
}
