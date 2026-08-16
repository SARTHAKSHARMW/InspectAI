import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { inspectionService } from '../services/inspectionService';
import { Database, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

const MetricCard = ({ title, value, sub, icon: Icon, color = "primary" }: any) => {
  const colorMap: any = {
    primary: "text-primary border-primary",
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

const Analytics = () => {
  const [inspections, setInspections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await inspectionService.getUserInspections();
        // Sort chronologically (oldest first)
        data.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        setInspections(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Compute metrics
  const totalInspections = inspections.length;
  let totalDefects = 0;
  let totalConfidence = 0;
  let confidenceCount = 0;
  let passed = 0;
  let failed = 0;

  const activityData: any[] = [];
  const confData: any[] = [];

  inspections.forEach((ins, idx) => {
    totalDefects += ins.totalDetections;
    if (ins.totalDetections > 0) failed++; else passed++;
    
    // Calculate average confidence for this inspection
    let insConfSum = 0;
    let insConfCount = 0;
    if (ins.detections) {
      try {
        const dets = JSON.parse(ins.detections);
        dets.forEach((d: any) => {
          insConfSum += d.confidence;
          insConfCount++;
          totalConfidence += d.confidence;
          confidenceCount++;
        });
      } catch (e) {}
    }

    const timeLabel = new Date(ins.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Group into activity chart (let's just plot all or group them by some factor, for now plot all as series)
    activityData.push({
      name: `ID ${ins.id}`,
      defects: ins.totalDetections,
      status: ins.totalDetections > 0 ? 'FAIL' : 'PASS'
    });

    if (insConfCount > 0) {
      confData.push({
        name: `ID ${ins.id}`,
        conf: (insConfSum / insConfCount) * 100
      });
    }
  });

  const avgConfidence = confidenceCount > 0 ? (totalConfidence / confidenceCount) * 100 : 0;
  
  const pieData = [
    { name: 'PASS', value: passed },
    { name: 'FAIL', value: failed }
  ];
  const pieColors = ['#10b981', '#ef4444'];

  return (
    <div className="h-full flex flex-col gap-6 relative z-10 overflow-y-auto no-scrollbar">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight uppercase">SYSTEM ANALYTICS</h1>
        <div className="font-mono text-xs text-primary tracking-widest mt-1">REAL-TIME PERFORMANCE & DEFECT TRENDS</div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center font-mono text-primary animate-pulse tracking-widest">
          AGGREGATING DATA...
        </div>
      ) : (
        <>
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard title="TOTAL INSPECTIONS" value={totalInspections} sub="ALL TIME" icon={Database} color="primary" />
            <MetricCard title="PASS RATE" value={totalInspections > 0 ? `${Math.round((passed / totalInspections) * 100)}%` : '0%'} sub={`${passed} PASSED`} icon={CheckCircle} color="success" />
            <MetricCard title="DEFECTS DETECTED" value={totalDefects} sub={`${failed} FAILED SCANS`} icon={AlertTriangle} color="error" />
            <MetricCard title="AVG CONFIDENCE" value={`${avgConfidence.toFixed(1)}%`} sub="YOLO PREDICTIONS" icon={Activity} color="primary" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="panel p-6 h-[400px] flex flex-col">
              <div className="text-[10px] font-mono text-gray-400 tracking-wider mb-6 border-b border-border pb-2">DEFECT HISTORY</div>
              <div className="flex-1 w-full">
                {activityData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData.slice(-20)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" vertical={false} />
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#121214', border: '1px solid #2a2a2e', borderRadius: '0' }}
                        itemStyle={{ fontFamily: 'monospace', fontSize: '12px' }}
                        labelStyle={{ color: '#9ca3af', fontFamily: 'monospace', fontSize: '10px', marginBottom: '8px' }}
                      />
                      <Bar dataKey="defects" fill="#ef4444" name="DEFECTS" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                   <div className="flex-1 flex items-center justify-center font-mono text-xs text-gray-500">NO DATA AVAILABLE</div>
                )}
              </div>
            </div>

            <div className="panel p-6 h-[400px] flex flex-col">
              <div className="text-[10px] font-mono text-gray-400 tracking-wider mb-6 border-b border-border pb-2">CONFIDENCE TREND (LAST 20 SCANS)</div>
              <div className="flex-1 w-full">
                {confData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={confData.slice(-20)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" vertical={false} />
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#121214', border: '1px solid #2a2a2e', borderRadius: '0' }}
                        itemStyle={{ fontFamily: 'monospace', fontSize: '12px', color: '#00d2ff' }}
                        labelStyle={{ display: 'none' }}
                      />
                      <Line type="monotone" dataKey="conf" stroke="#00d2ff" strokeWidth={2} dot={{ fill: '#00d2ff', strokeWidth: 0, r: 4 }} name="CONFIDENCE %" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex-1 flex items-center justify-center font-mono text-xs text-gray-500">NO DATA AVAILABLE</div>
                )}
              </div>
            </div>
            
            <div className="col-span-1 lg:col-span-2 panel p-6 h-[300px] flex flex-col items-center justify-center relative">
               <div className="absolute top-6 left-6 text-[10px] font-mono text-gray-400 tracking-wider border-b border-border pb-2 w-[calc(100%-48px)] text-left">PASS / FAIL DISTRIBUTION</div>
               {totalInspections > 0 ? (
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={pieData}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="value"
                       stroke="none"
                     >
                       {pieData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                       ))}
                     </Pie>
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#121214', border: '1px solid #2a2a2e', borderRadius: '0' }}
                        itemStyle={{ fontFamily: 'monospace', fontSize: '12px', color: '#fff' }}
                      />
                   </PieChart>
                 </ResponsiveContainer>
               ) : (
                 <div className="font-mono text-xs text-gray-500">NO DATA AVAILABLE</div>
               )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
