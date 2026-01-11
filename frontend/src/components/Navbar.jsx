import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="flex items-center justify-between px-5 py-2 border-2 border-amber-950 ">
        <Link className=" font-bold " to="/">
          Blog App
        </Link>

        <div className="flex items-center gap-4 px-5">
          <Link className="text-md font-serif " to="/blogs">
            Blogs
          </Link>

          {user ? (
            <>
              <Link className="px-3 py-1 border rounded"
               to="/create">
                Write
              </Link>

              <span className="px-3 py-1 border rounded">{user.name}</span>

              <button
                className="px-3 py-1 bg-black text-white rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className=" hover:text-amber-500 " to="/login">
                Login
              </Link>

              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
