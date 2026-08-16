import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IndustrialScene } from '../components/3d/IndustrialScene';
import { Shield, ChevronRight, Activity } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <IndustrialScene isScanning={true} />
      </div>
      
      {/* HUD Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background"></div>
      
      {/* Top Bar */}
      <div className="absolute top-0 w-full h-16 border-b border-white/10 flex items-center justify-between px-10 z-20 pointer-events-none">
        <div className="flex items-center gap-3">
          <Shield size={24} className="text-primary" />
          <span className="font-mono text-2xl tracking-[0.2em] text-white font-bold">INSPECT<span className="text-primary">AI</span></span>
        </div>
        <div className="font-mono text-xs text-primary/70 tracking-widest flex items-center gap-2">
          <Activity size={14} className="animate-pulse" />
          SYSTEM ONLINE
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col justify-center px-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="font-mono text-primary text-sm tracking-[0.3em] mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-primary block"></span>
            INDUSTRIAL VISION ENGINE
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            ADVANCED AI <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              INSPECTION
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-xl font-mono leading-relaxed border-l border-primary/30 pl-4">
            GPU-accelerated computer vision platform for high-precision manufacturing and industrial defect detection.
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="btn-primary flex items-center gap-2 py-3 px-8 text-base"
            >
              INITIALIZE SYSTEM
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Technical Decals */}
      <div className="absolute bottom-10 left-10 font-mono text-[10px] text-gray-600 tracking-widest pointer-events-none">
        YOLOv8 INFERENCE PIPELINE v2.4.1 <br/>
        COORD: 34.0522° N, 118.2437° W
      </div>
      <div className="absolute bottom-10 right-10 font-mono text-[10px] text-gray-600 tracking-widest text-right pointer-events-none">
        GPU: ACTIVE <br/>
        VRAM: ALLOCATED
      </div>
    </div>
  );
};

export default Landing;
