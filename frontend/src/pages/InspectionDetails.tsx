import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inspectionService } from '../services/inspectionService';
import { ArrowLeft, Activity, Cpu, ShieldAlert, CheckCircle } from 'lucide-react';
import { DetectionOverlay } from '../components/ui/DetectionOverlay';

const InspectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inspection, setInspection] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInspection = async () => {
      try {
        if (id) {
          const data = await inspectionService.getInspection(id);
          setInspection(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInspection();
  }, [id]);

  if (isLoading) {
    return <div className="h-full flex items-center justify-center font-mono text-primary animate-pulse tracking-widest">RETRIEVING RECORD #{id}...</div>;
  }

  if (!inspection) {
    return <div className="h-full flex flex-col items-center justify-center font-mono text-error">RECORD NOT FOUND</div>;
  }

  const detections = inspection.detections ? JSON.parse(inspection.detections) : [];

  return (
    <div className="h-full flex flex-col gap-6 relative z-10">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/inspections')} className="w-10 h-10 flex items-center justify-center bg-panel border border-border text-gray-400 hover:text-primary hover:border-primary transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight uppercase">INSPECTION REPORT #{inspection.id}</h1>
          <div className="font-mono text-xs text-gray-500 tracking-widest mt-1">TIMESTAMP: {new Date(inspection.createdAt).toLocaleString()}</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Metadata */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="panel p-6 flex flex-col gap-4">
            <div className="text-[10px] font-mono text-gray-400 tracking-wider border-b border-border pb-2">SYSTEM METADATA</div>
            
            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="text-gray-500 mb-1">SOURCE FILE</div>
                <div className="text-white truncate" title={inspection.originalFilename}>{inspection.originalFilename}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">PREDICTION ID</div>
                <div className="text-white">{inspection.predictionId || 'N/A'}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">INFERENCE LATENCY</div>
                <div className="text-primary flex items-center gap-2">
                  <Activity size={12} /> {inspection.processingTimeSeconds?.toFixed(4)}s
                </div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">VISION MODEL</div>
                <div className="text-white flex items-center gap-2">
                  <Cpu size={12} className="text-secondary" /> YOLOv8
                </div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">FINAL STATUS</div>
                {inspection.totalDetections > 0 ? (
                  <div className="text-error flex items-center gap-2"><ShieldAlert size={14} /> DEFECT DETECTED</div>
                ) : (
                  <div className="text-success flex items-center gap-2"><CheckCircle size={14} /> VERIFIED PASS</div>
                )}
              </div>
            </div>
          </div>

          <div className="panel p-6 flex-1 flex flex-col">
            <div className="text-[10px] font-mono text-gray-400 tracking-wider border-b border-border pb-2 mb-4">DETECTION LOGS</div>
            <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-2">
              {detections.length === 0 ? (
                <div className="text-gray-500 font-mono text-xs italic">No anomalies detected.</div>
              ) : (
                detections.map((det: any, idx: number) => (
                  <div key={idx} className="bg-background border border-border p-3 flex justify-between items-center font-mono text-xs">
                    <span className="text-gray-300 uppercase">{det.name}</span>
                    <span className="text-primary">{(det.confidence * 100).toFixed(2)}%</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Visual Result */}
        <div className="col-span-1 lg:col-span-2 panel p-4 flex flex-col relative overflow-hidden">
          <div className="text-[10px] font-mono text-gray-400 tracking-wider mb-4 border-b border-border pb-2 absolute top-4 left-4 z-10 bg-panel/80 px-2 backdrop-blur-sm">VISUAL ANALYSIS</div>
          
          <div className="flex-1 bg-black relative flex items-center justify-center mt-8 border border-border">
             {/* If we had the saved image URL, we would show it here.
                 Currently backend just returns the data, but no direct URL to the image is in InspectionResponse.
                 So we'll show a stylized placeholder or the original image if we can fetch it (requires backend route).
                 Since we don't have the image bytes, we'll display a technical schematic representation.
             */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
             
             <div className="relative z-10 flex flex-col items-center">
                <Cpu size={64} className="text-primary/30 mb-6" />
                <div className="font-mono text-sm text-primary tracking-widest bg-primary/10 px-4 py-2 border border-primary/30">
                  VISUAL DATA ARCHIVED
                </div>
                <div className="font-mono text-[10px] text-gray-500 mt-4 max-w-sm text-center">
                  Original image data is stored in the vault. Detection metrics are displayed on the left panel.
                </div>
             </div>
             
             {/* Scanning lines effect */}
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIi8+CjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMCwyMTAsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] pointer-events-none opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionDetails;
