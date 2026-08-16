import React from 'react';
import { Settings as SettingsIcon, Database, Cpu, Globe } from 'lucide-react';

const Settings = () => {
  return (
    <div className="h-full flex flex-col gap-6 relative z-10">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight uppercase">SYSTEM CONFIGURATION</h1>
        <div className="font-mono text-xs text-primary tracking-widest mt-1">GLOBAL PARAMETERS</div>
      </div>

      <div className="panel p-0 max-w-3xl">
        <div className="border-b border-border flex text-sm font-mono">
           <button className="px-6 py-4 border-b-2 border-primary text-primary bg-primary/5">GENERAL</button>
           <button className="px-6 py-4 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">VISION ENGINE</button>
           <button className="px-6 py-4 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">INTEGRATION</button>
        </div>
        
        <div className="p-8 space-y-8">
          <section>
            <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-widest mb-4">
              <Globe size={16} /> API ENDPOINTS
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gray-500 mb-1 block">SPRING BOOT BACKEND URL</label>
                <input type="text" className="input-field max-w-md bg-background/50" defaultValue="http://localhost:8080" disabled />
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-widest mb-4">
              <Cpu size={16} /> AI ENGINE THRESHOLDS
            </div>
            <div className="space-y-4 max-w-md">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-500 mb-1">
                  <label>CONFIDENCE THRESHOLD</label>
                  <span>0.85</span>
                </div>
                <input type="range" className="w-full accent-primary" min="0" max="1" step="0.01" defaultValue="0.85" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-500 mb-1">
                  <label>IOU THRESHOLD</label>
                  <span>0.45</span>
                </div>
                <input type="range" className="w-full accent-primary" min="0" max="1" step="0.01" defaultValue="0.45" />
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-widest mb-4">
              <Database size={16} /> STORAGE RETENTION
            </div>
            <div className="space-y-4">
               <label className="flex items-center gap-3 font-mono text-sm text-gray-300">
                 <input type="checkbox" className="w-4 h-4 accent-primary bg-background border-border" defaultChecked />
                 SAVE INFERENCE IMAGES TO DISK
               </label>
               <label className="flex items-center gap-3 font-mono text-sm text-gray-300">
                 <input type="checkbox" className="w-4 h-4 accent-primary bg-background border-border" defaultChecked />
                 ARCHIVE RESULTS AFTER 30 DAYS
               </label>
            </div>
          </section>
        </div>
        
        <div className="p-4 border-t border-border bg-black/20 flex justify-end">
          <button className="btn-primary">SAVE CONFIGURATION</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
