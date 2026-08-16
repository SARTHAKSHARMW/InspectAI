import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { inspectionService } from '../services/inspectionService';
import { Upload, Cpu, Activity, Zap, CheckCircle, AlertTriangle, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndustrialScene } from '../components/3d/IndustrialScene';
import { DetectionOverlay } from '../components/ui/DetectionOverlay';

const ProcessingSteps = [
  'INITIALIZING AI ENGINE',
  'UPLOADING IMAGE',
  'CONNECTING TO VISION SERVICE',
  'YOLO INFERENCE',
  'ANALYZING OBJECTS',
  'CALCULATING CONFIDENCE',
  'GENERATING INSPECTION RESULT'
];

const NewInspection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) processFile(selectedFile);
  };

  const processFile = (selectedFile: File) => {
    if (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png') {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    } else {
      setError('Only JPG and PNG files are supported.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) processFile(droppedFile);
  };

  const startInspection = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setStepIndex(0);
    setError(null);

    // Simulate steps for UI before actual request completes (or concurrently)
    const stepInterval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < ProcessingSteps.length - 2) return prev + 1;
        return prev;
      });
    }, 500);

    try {
      const response = await inspectionService.createInspection(file);
      clearInterval(stepInterval);
      setStepIndex(ProcessingSteps.length - 1);
      
      setTimeout(() => {
        setIsProcessing(false);
        setResult(response);
      }, 1000);
      
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsProcessing(false);
      setError(err.response?.data?.message || 'Inference failed. Check vision service connection.');
    }
  };

  const getDetections = () => {
    if (!result || !result.detections) return [];
    try {
      return JSON.parse(result.detections);
    } catch (e) {
      return [];
    }
  };

  const parsedDetections = getDetections();

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight uppercase">INSPECTION WORKSPACE</h1>
          <div className="font-mono text-xs text-primary tracking-widest mt-1">VISION INFERENCE LAB</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[500px]">
        {/* Left: Controls */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="panel p-6 flex-1 flex flex-col">
            <div className="text-[10px] font-mono text-gray-400 tracking-wider mb-6 border-b border-border pb-2">INPUT PARAMETERS</div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
            />
            
            {!previewUrl ? (
              <div 
                className={`flex-1 border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors group ${isDragging ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 hover:bg-primary/5'}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center mb-4 transition-colors ${isDragging ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,210,255,0.5)]' : 'bg-background border-border group-hover:border-primary/50 group-hover:text-primary'}`}>
                  <Upload size={20} />
                </div>
                <div className="font-mono text-sm text-gray-300 mb-2">{isDragging ? 'DROP TO LOAD' : 'LOAD IMAGE DATA OR DRAG HERE'}</div>
                <div className="font-mono text-[10px] text-gray-500">JPG, PNG MAX 10MB</div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col gap-4">
                <div className="relative w-full aspect-video bg-background border border-border overflow-hidden">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain opacity-50 grayscale" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-panel px-3 py-1 font-mono text-[10px] text-gray-400 border border-border">SOURCE LOADED</span>
                  </div>
                </div>
                
                <button 
                  className="btn-secondary w-full"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                >
                  REPLACE SOURCE
                </button>
              </div>
            )}
            
            <button 
              className={`btn-primary w-full h-14 mt-6 flex items-center justify-center gap-3 ${(!file || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={startInspection}
              disabled={!file || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Activity size={18} className="animate-pulse" />
                  PROCESSING...
                </>
              ) : (
                <>
                  <Zap size={18} />
                  EXECUTE INFERENCE
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center: Visualization */}
        <div className="col-span-1 lg:col-span-2 panel relative overflow-hidden border border-border flex flex-col">
          <div className="absolute top-4 left-4 z-10 flex gap-4 pointer-events-none">
             <div className="flex items-center gap-2 text-[10px] font-mono text-white bg-background/50 px-2 py-1 rounded backdrop-blur-sm border border-border">
               WORK AREA
             </div>
          </div>

          <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
            {!previewUrl ? (
              // Empty Chamber
              <div className="absolute inset-0">
                <IndustrialScene isScanning={false} showParticles={false} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 border border-primary/20 rounded-full flex items-center justify-center relative">
                    <div className="w-24 h-24 border border-primary/10 rounded-full animate-[spin_10s_linear_infinite] border-t-primary/50"></div>
                    <Cpu size={24} className="text-primary/50 absolute" />
                  </div>
                  <div className="font-mono text-xs text-primary/50 mt-6 tracking-widest">CHAMBER EMPTY</div>
                </div>
              </div>
            ) : (
              // Loaded Image / Result
              <div className="relative w-full h-full p-4 flex items-center justify-center">
                <img 
                  src={previewUrl} 
                  alt="Target" 
                  className={`max-w-full max-h-full object-contain transition-all duration-700 ${isProcessing ? 'contrast-125 brightness-110 saturate-0' : 'contrast-100'}`} 
                />
                
                {isProcessing && <DetectionOverlay detections={[]} />}
                
                {result && !isProcessing && (
                  <DetectionOverlay detections={parsedDetections} />
                )}
                
                {/* Processing Overlay */}
                <AnimatePresence>
                  {isProcessing && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center"
                    >
                      <div className="w-48 h-48 relative mb-8">
                        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_4s_linear_infinite]">
                          <circle cx="50" cy="50" r="48" fill="none" stroke="#2a2a2e" strokeWidth="1" />
                          <circle cx="50" cy="50" r="48" fill="none" stroke="#00d2ff" strokeWidth="2" strokeDasharray="30 200" strokeLinecap="round" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#2a2a2e" strokeWidth="1" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="20 200" strokeLinecap="round" className="animate-[spin_3s_linear_infinite_reverse]" style={{ transformOrigin: 'center' }} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Activity className="text-primary animate-pulse" size={32} />
                        </div>
                      </div>
                      <div className="font-mono text-sm text-primary tracking-widest mb-2 animate-pulse">AI VISION ENGINE</div>
                      <div className="font-mono text-[10px] text-gray-400 tracking-wider h-4">{ProcessingSteps[stepIndex]}</div>
                      
                      {/* Progress bar */}
                      <div className="w-64 h-1 bg-background mt-6 border border-border">
                        <motion.div 
                          className="h-full bg-primary"
                          initial={{ width: '0%' }}
                          animate={{ width: `${(stepIndex / (ProcessingSteps.length - 1)) * 100}%` }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Right: Telemetry / Results */}
        <div className="col-span-1 panel p-6 flex flex-col">
          <div className="text-[10px] font-mono text-gray-400 tracking-wider mb-6 border-b border-border pb-2">TELEMETRY & RESULTS</div>
          
          {error && (
            <div className="p-4 bg-error/10 border border-error/50 text-error font-mono text-xs flex flex-col gap-2">
              <div className="flex items-center gap-2 font-bold"><AlertTriangle size={14} /> INFERENCE ERROR</div>
              <div>{error}</div>
            </div>
          )}

          {!result && !isProcessing && !error && (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
              <Database size={32} className="mb-4" />
              <div className="font-mono text-xs tracking-widest">AWAITING DATA</div>
            </div>
          )}

          {isProcessing && (
            <div className="flex-1 flex flex-col gap-6 mt-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-gray-500">
                  <span>LATENCY</span>
                  <span className="text-primary animate-pulse">CALCULATING...</span>
                </div>
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 bg-background border border-border flex items-center px-3 animate-pulse opacity-50">
                    <div className="w-4 h-4 bg-gray-800 mr-3"></div>
                    <div className="h-2 bg-gray-800 flex-1 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result && (
            <div className="flex-1 flex flex-col gap-6 animate-in fade-in duration-500">
              <div className="p-4 bg-background border border-border">
                <div className="flex items-center gap-3 mb-2">
                  {result.status === 'SUCCESS' ? (
                    <CheckCircle className="text-success" size={20} />
                  ) : (
                    <AlertTriangle className="text-warning" size={20} />
                  )}
                  <div className="font-mono font-bold tracking-widest text-white">INSPECTION COMPLETE</div>
                </div>
                <div className="font-mono text-[10px] text-gray-500 grid grid-cols-2 gap-2 mt-4">
                  <div>ID:</div><div className="text-gray-300">{result.id || 'N/A'}</div>
                  <div>TIME:</div><div className="text-gray-300">{result.processingTimeSeconds?.toFixed(3)}s</div>
                  <div>OBJECTS:</div><div className="text-primary">{result.totalDetections}</div>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="text-[10px] font-mono text-gray-400 tracking-wider mb-3">DETECTED OBJECTS</div>
                <div className="space-y-2 overflow-y-auto pr-2 no-scrollbar">
                  {parsedDetections.length === 0 ? (
                    <div className="font-mono text-xs text-gray-500 italic p-3 text-center border border-dashed border-border">No objects detected.</div>
                  ) : (
                    parsedDetections.map((det: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-background border border-border hover:border-primary/30 transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full group-hover:shadow-[0_0_8px_rgba(0,210,255,0.8)] transition-all"></div>
                          <span className="font-mono text-xs text-gray-300 uppercase">{det.name}</span>
                        </div>
                        <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-sm">
                          {(det.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <button 
                className="btn-secondary w-full"
                onClick={() => navigate(`/inspections/${result.id}`)}
              >
                VIEW FULL REPORT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewInspection;
