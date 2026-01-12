import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Menu, X, Search, PenLine } from "lucide-react";
import "../index.css"

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/90 backdrop-blur-xl border-b border-slate-800/50">
        {/* Ambient glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5">
          {/* Logo */}
          <Link 
            className="relative group text-xl font-bold tracking-tight" 
            to="/"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Blog App
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></div>
          </Link>

          {/* Navigation Links & Actions */}
          <div className="flex items-center gap-6">
            {/* Blogs Link */}
            <Link
              className="relative text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200 group"
              to="/blogs"
            >
              Blogs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {user ? (
              <>
                {/* Write Button */}
                <Link 
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20" 
                  to="/create"
                >
                  <PenLine className="w-3.5 h-3.5" />
                  Write
                </Link>

                {/* User Profile */}
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-200 text-sm font-medium">{user.name}</span>
                </div>

                {/* Logout Button */}
                <button
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 rounded-lg text-sm font-semibold transition-all duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login Link */}
                <Link 
                  className="relative text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200 group" 
                  to="/login"
                >
                  Login
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </Link>

                {/* Register Button */}
                <Link 
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30" 
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}