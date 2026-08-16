import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar />
      <main className={`flex-1 relative flex flex-col overflow-hidden bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h40v40H0z" fill="none"/%3E%3Cpath d="M0 39.5h40v1H0z" fill="rgba(255,255,255,0.02)"/%3E%3Cpath d="M39.5 0v40h1V0z" fill="rgba(255,255,255,0.02)"/%3E%3C/svg%3E')]`}>
        {/* Subtle grid background */}
        
        {/* Top telemetry bar simulation */}
        <div className="h-10 border-b border-border bg-panel_light/30 backdrop-blur-sm flex items-center justify-between px-6 z-10 flex-shrink-0">
          <div className="flex gap-6 text-[10px] font-mono text-gray-500 tracking-wider">
            <span>SYS: ONLINE</span>
            <span className="text-primary animate-pulse">VISION_SERVICE: CONNECTED</span>
          </div>
          <div className="flex gap-4 text-[10px] font-mono text-gray-500 tracking-wider">
            <span>MEM: {Math.floor(Math.random() * 20 + 30)}%</span>
            <span>GPU: READY</span>
          </div>
        </div>

        <motion.div 
          className="flex-1 overflow-y-auto p-6 relative z-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
