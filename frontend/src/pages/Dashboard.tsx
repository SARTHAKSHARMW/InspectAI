import React from 'react';
import { IndustrialScene } from '../components/3d/IndustrialScene';
import { Activity, Database, Server, Cpu, Box, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MetricCard = ({ title, value, sub, icon: Icon, color = "primary" }: any) => {
  const colorMap: any = {
    primary: "text-primary border-primary",
    secondary: "text-secondary border-secondary",
    success: "text-success border-success",
    error: "text-error border-error"
  };

  return (
    <div className="panel p-4 flex flex-col justify-between group hover:border-gray-500 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="text-[10px] font-mono text-gray-400 tracking-wider">{title}</div>
        <Icon size={16} className={colorMap[color].split(' ')[0]} />
      </div>
      <div>
        <div className="text-3xl font-bold text-white font-mono tracking-tight">{value}</div>
        <div className={`text-[10px] font-mono mt-1 ${colorMap[color].split(' ')[0]}`}>{sub}</div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight uppercase">COMMAND CENTER</h1>
          <div className="font-mono text-xs text-primary tracking-widest mt-1">SYSTEM OVERVIEW & TELEMETRY</div>
        </div>
        <div className="text-right font-mono text-[10px] text-gray-500">
          <div>LAST SYNC: {new Date().toLocaleTimeString()}</div>
          <div className="text-success animate-pulse">ALL SYSTEMS NOMINAL</div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[400px]">
        {/* Left Stats */}
        <div className="flex flex-col gap-4">
          <MetricCard title="TOTAL INSPECTIONS" value="1,248" sub="+12 THIS HOUR" icon={Database} />
          <MetricCard title="AVG INFERENCE" value="45ms" sub="YOLOv8 ENGINE" icon={Cpu} color="secondary" />
          <MetricCard title="DEFECT RATE" value="1.2%" sub="-0.4% FROM YESTERDAY" icon={AlertCircle} color="error" />
          
          <div className="panel p-4 flex-1">
            <div className="text-[10px] font-mono text-gray-400 tracking-wider mb-4 border-b border-border pb-2">SYSTEM STATUS</div>
            <div className="space-y-4">
              {[
                { name: 'VISION PIPELINE', status: 'ACTIVE', color: 'text-success' },
                { name: 'POSTGRESQL', status: 'CONNECTED', color: 'text-success' },
                { name: 'GPU COMPUTE', status: 'ALLOCATED', color: 'text-success' },
                { name: 'TENSORRT', status: 'OPTIMIZED', color: 'text-secondary' },
              ].map((sys) => (
                <div key={sys.name} className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-400">{sys.name}</span>
                  <span className={`${sys.color} tracking-widest`}>[{sys.status}]</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center 3D Scene */}
        <div className="col-span-1 lg:col-span-2 panel relative p-0 overflow-hidden border border-border shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="absolute top-4 left-4 z-10 flex gap-4 pointer-events-none">
             <div className="flex items-center gap-2 text-[10px] font-mono text-primary bg-background/50 px-2 py-1 rounded backdrop-blur-sm border border-primary/20">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
               LIVE FEED
             </div>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none flex justify-between items-end">
            <div className="font-mono text-xs text-white/50 tracking-widest">
              COMPONENT: IC-74HC595<br/>
              SCANNING MODE: CONTINUOUS
            </div>
            <div className="w-16 h-16 border border-primary/30 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-primary/10"></div>
               <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
               <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
               <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary"></div>
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>
               <Box size={24} className="text-primary opacity-50" />
            </div>
          </div>

          <IndustrialScene isScanning={true} />
          
          {/* Overlay Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none mix-blend-overlay"></div>
        </div>

        {/* Right Telemetry */}
        <div className="panel p-4 flex flex-col">
          <div className="text-[10px] font-mono text-gray-400 tracking-wider mb-4 border-b border-border pb-2 flex items-center justify-between">
            <span>LIVE TELEMETRY</span>
            <Activity size={12} className="text-primary animate-pulse" />
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400">INFERENCE LOAD</span>
                <span className="text-primary">84%</span>
              </div>
              <div className="w-full h-1 bg-background overflow-hidden relative">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-primary"
                  animate={{ width: ['80%', '88%', '84%', '90%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400">MEMORY UTILIZATION</span>
                <span className="text-secondary">42%</span>
              </div>
              <div className="w-full h-1 bg-background overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 bg-secondary w-[42%]"></div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="text-[10px] font-mono text-gray-500 mb-2">RECENT DETECTIONS</div>
              {[
                { id: 'INS-8942', type: 'DEFECT', conf: '98.2%', time: '2s ago', err: true },
                { id: 'INS-8941', type: 'PASS', conf: '99.5%', time: '14s ago', err: false },
                { id: 'INS-8940', type: 'PASS', conf: '99.1%', time: '42s ago', err: false },
                { id: 'INS-8939', type: 'PASS', conf: '98.9%', time: '1m ago', err: false },
              ].map((det, i) => (
                <div key={i} className="flex justify-between items-center text-xs font-mono p-2 bg-background/50 border border-border">
                  <span className="text-gray-400">{det.id}</span>
                  <div className="flex items-center gap-4">
                    <span className={det.err ? 'text-error' : 'text-success'}>{det.type}</span>
                    <span className="text-gray-500 w-12 text-right">{det.conf}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
