import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-6 px-6 py-4 border-b">
      <Link to="/">Home</Link>
      <Link to="/blogs">Blogs</Link>
      <Link to="/create">Write</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}
