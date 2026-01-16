import FloatingLines from '../components/FloatingLines.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleWriteClick = () => {
    if (user) {
      navigate('/create');
    } else {
      navigate('/login');
    }
  };

  const handleReadClick = () => {
    navigate('/blogs');
  };

  return (
    <div className="  min-h-screen bg-[#0a0e1a] relative overflow-hidden">
      {/* Floating Lines Background - Primary Layer */}
      <div className=" absolute inset-0 opacity-40 pointer-events-none">
        <FloatingLines 
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[10, 15, 20]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>




      {/* Mouse tracking layer - captures mouse events for FloatingLines */}
      <div 
        className="absolute inset-0 z-0  "
        onPointerMove={(e) => {
          // Dispatch a custom event that FloatingLines can listen to
          
          const event = new PointerEvent('pointermove', {
            bubbles: true,
            cancelable: true,
            clientX: e.clientX,
            clientY: e.clientY
          });
          
          // Find the canvas and dispatch event to it
          const canvas = document.querySelector('.floating-lines-container canvas');
          if (canvas) {
            canvas.dispatchEvent(event);
          }
        }}
        onPointerLeave={() => {
          const canvas = document.querySelector('.floating-lines-container canvas');
          if (canvas) {
            canvas.dispatchEvent(new PointerEvent('pointerleave', {
              bubbles: true,
              cancelable: true
            }));
          }
        }}
      />

      <div className=" md:h-100 h-180 relative max-w-5xl mx-auto px-6 py-12 mt-18 lg:py-20">
        <div className="  grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content Section */}
          <div className="  max-w-[300px] lg:max-w-2xl space-y-10">
            {/* Main Heading with Blue/Cyan gradient to match floating lines */}
            <div className="space-y-2">
              <h1 className="text-2xl max-w-[300px] lg:max-w-2xl  lg:text-5xl font-black leading-[0.9] tracking-tight">
                <span className="md:block inline me-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">Write.</span>
                <span className="md:block inline me-2 text-white">Think.</span>
                <span className="md:block inline me-2 text-white">Build.</span>
                <span className="md:block inline me-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">Repeat.</span>
              </h1>
              {/* Decorative underline matching floating lines color */}
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent shadow-lg shadow-cyan-500/50"></div>
            </div>

            {/* Description with accent bar matching theme */}
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400/50 via-blue-400 to-cyan-400/50 shadow-lg shadow-cyan-500/30"></div>
              <h2 className="text-md  lg:text-xl text-slate-200 leading-relaxed pl-6 font-light">
                Write freely, read deeply, and share ideas that matter.
              </h2>
            </div>

            {/* Action Buttons with cyan/blue theme */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={handleReadClick}
                className="group relative px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold text-sm rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 overflow-hidden">
                <span className="relative z-10 flex items-center gap-1">
                  Read
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={handleWriteClick}
                className="group px-6 py-3 bg-slate-900/50 hover:bg-slate-800/70 backdrop-blur-xl border-2 border-slate-700/50 hover:border-cyan-500/50 text-white font-bold text-sm rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Write
                </span>
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className=" relative group lg:order-last">
            {/* Decorative corner frames with cyan/blue */}
            <div className="absolute -top-6 -left-6 w-28 h-28 border-t-4 border-l-4 border-cyan-500/40 rounded-tl-3xl shadow-lg shadow-cyan-500/20 pointer-events-none"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-4 border-r-4 border-blue-500/40 rounded-br-3xl shadow-lg shadow-blue-500/20 pointer-events-none"></div>

            {/* Main image container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-900/40">
              {/* Ambient glow effect matching floating lines */}
              <div className="absolute -inset-8 bg-linear-to-br from-cyan-600/30 via-blue-600/20 to-indigo-600/20 rounded-3xl blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Image */}
              <div className=" lg:h-100 h-80 relative">
                <img
                  className="w-full h-[400px] lg:h-[500px] object-cover transition-all duration-700 group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop"
                  alt="Coding workspace"
                />
                
                {/* Dark gradient overlay with blue tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-blue-950/20 to-transparent pointer-events-none"></div>
                

         
              </div>
            </div>

            {/* Floating accent elements with cyan/blue colors */}
            <div className="absolute top-1/2 -left-12 w-24 h-24 bg-cyan-500/15 rounded-full blur-2xl animate-float pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-12 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl animate-float-delayed pointer-events-none"></div>
          </div>
        </div>

        {/* Bottom decorative line with cyan accent */}
        <div className="mt-24 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 shadow-lg shadow-cyan-500/50"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 3s;
        }
      `}</style>
    </div>
  );
}