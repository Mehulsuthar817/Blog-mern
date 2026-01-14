import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { PenLine } from "lucide-react";
import "../index.css"

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <div className="liquid-glass-pill">
          {/* Liquid glass effect layers */}
          <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-xl"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
          <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
          
          {/* Glow effects */}
          <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-400/30 to-cyan-500/0 blur-sm"></div>
          <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.2)]"></div>
          
          <div className="  relative flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <Link 
              className="relative group text-sm md:text-lg font-bold tracking-tight z-10" 
              to="/"
            >
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                Blog App
              </span>
            </Link>

            {/* Navigation Links & Actions */}
            <div className="flex items-center gap-4 z-10">
              {/* Blogs Link */}
              <Link
                className="relative text-slate-100 hover:text-white text-sm md:text-sm font-medium transition-all duration-200 group drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                to="/blogs"
              >
                Blogs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></span>
              </Link>

              {user ? (
                <>
                  {/* Write Button */}
                  <Link 
                    className="glass-button flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 text-cyan-200 text-sm font-semibold transition-all duration-300" 
                    to="/create"
                  >
                    <PenLine className="w-3.5 h-3.5" />
                    Write
                  </Link>

                  {/* User Profile */}
                  <div className="glass-button px-2 py-1 md:px-4 md:py-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                    <Link to={`/profile/${user._id}`} ><span className=" text-white text-sm font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{user.name}</span></Link>
                    
                  </div>

                  {/* Logout Button */}
                  <button
                    className="glass-button px-2 py-1 md:px-4 md:py-2 text-white text-sm font-semibold transition-all duration-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Login Link */}
                  <Link 
                    className="relative text-slate-100 hover:text-white text-sm font-medium transition-all duration-200 group drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" 
                    to="/login"
                  >
                    Login
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></span>
                  </Link>

                  {/* Register Button */}
                  <Link 
                    className="glass-button-primary px-4 py-2 text-white text-sm font-bold transition-all duration-300" 
                    to="/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .liquid-glass-pill {
          position: relative;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .liquid-glass-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.05));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .glass-button {
          position: relative;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2),
                      0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(34, 211, 238, 0.4);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3),
                      0 4px 16px rgba(34, 211, 238, 0.2);
          transform: translateY(-1px);
        }

        .glass-button-primary {
          position: relative;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(34, 211, 238, 0.3), rgba(59, 130, 246, 0.3));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(34, 211, 238, 0.4);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3),
                      0 4px 12px rgba(34, 211, 238, 0.3);
        }

        .glass-button-primary:hover {
          background: linear-gradient(135deg, rgba(34, 211, 238, 0.4), rgba(59, 130, 246, 0.4));
          border-color: rgba(34, 211, 238, 0.6);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4),
                      0 4px 16px rgba(34, 211, 238, 0.4);
          transform: translateY(-1px);
        }

        .glass-badge {
          position: relative;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}