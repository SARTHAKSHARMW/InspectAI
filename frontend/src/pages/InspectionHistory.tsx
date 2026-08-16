import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inspectionService } from '../services/inspectionService';
import { Search, Filter, ArrowRight, ShieldAlert, CheckCircle, Database } from 'lucide-react';

const InspectionHistory = () => {
  const [inspections, setInspections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const data = await inspectionService.getUserInspections();
        setInspections(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInspections();
  }, []);

  const filteredInspections = inspections.filter(ins => 
    ins.originalFilename?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ins.id?.toString().includes(searchTerm)
  );

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight uppercase">INSPECTION ARCHIVE</h1>
          <div className="font-mono text-xs text-primary tracking-widest mt-1">HISTORICAL TELEMETRY DATABASE</div>
        </div>
      </div>

      <div className="panel p-6 flex-1 flex flex-col gap-6 relative z-10">
        {/* Toolbar */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-500" />
            </div>
            <input 
              type="text" 
              className="input-field pl-10" 
              placeholder="SEARCH BY ID OR FILENAME..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={16} />
            FILTER LOGS
          </button>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto border border-border bg-background relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-mono text-primary animate-pulse tracking-widest">QUERYING DATABASE...</div>
            </div>
          ) : filteredInspections.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50">
              <Database size={48} className="mb-4 text-gray-500" />
              <div className="font-mono text-gray-400 tracking-widest">NO RECORDS FOUND</div>
            </div>
          ) : (
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-panel sticky top-0 border-b border-border text-gray-500 tracking-wider">
                <tr>
                  <th className="p-4 font-normal">ID</th>
                  <th className="p-4 font-normal">TIMESTAMP</th>
                  <th className="p-4 font-normal">SOURCE</th>
                  <th className="p-4 font-normal">DETECTIONS</th>
                  <th className="p-4 font-normal">LATENCY</th>
                  <th className="p-4 font-normal">STATUS</th>
                  <th className="p-4 font-normal text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-gray-300">
                {filteredInspections.map((ins) => (
                  <tr key={ins.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="p-4 text-primary">#{ins.id}</td>
                    <td className="p-4">{new Date(ins.createdAt).toLocaleString()}</td>
                    <td className="p-4 truncate max-w-[200px]">{ins.originalFilename}</td>
                    <td className="p-4">{ins.totalDetections}</td>
                    <td className="p-4">{ins.processingTimeSeconds?.toFixed(3)}s</td>
                    <td className="p-4">
                      {ins.totalDetections > 0 ? (
                        <span className="flex items-center gap-2 text-warning"><ShieldAlert size={14} /> DEFECT</span>
                      ) : (
                        <span className="flex items-center gap-2 text-success"><CheckCircle size={14} /> PASS</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ml-auto"
                        onClick={() => navigate(`/inspections/${ins.id}`)}
                      >
                        VIEW <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspectionHistory;
