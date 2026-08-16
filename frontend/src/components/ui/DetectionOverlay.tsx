import React from 'react';
import { motion } from 'framer-motion';

interface Detection {
  name: string;
  confidence: number;
  // If backend returns bounding box in the future, we could add:
  // bbox?: [number, number, number, number] // [x, y, w, h] in percentages
}

interface DetectionOverlayProps {
  detections: Detection[];
}

export const DetectionOverlay: React.FC<DetectionOverlayProps> = ({ detections }) => {
  // Since the current backend (AiPredictionResponse.DetectionItem) only provides name and confidence,
  // we will randomly generate bounding box positions visually just for the premium effect,
  // OR we can just show technical markers if bounding boxes are missing.
  // The prompt says "If the backend provides coordinates, use the REAL coordinates. Do not invent bounding boxes."
  // Wait, the prompt says "If the backend provides coordinates, use the REAL coordinates. Do not invent bounding boxes."
  // So if there are no coordinates, we just show technical markers that pulse on the image, or we just list them on the side.
  // Actually, I will check if coordinates exist. If not, I will show a centralized marker or just not show fake boxes.
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Scanning effect overlay */}
      <motion.div 
        className="absolute left-0 right-0 h-1 bg-primary/50 shadow-[0_0_15px_rgba(0,210,255,0.8)]"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
      />
      
      {/* Reticle in center */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-[80%] h-[80%] border border-primary/20 relative">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
        </div>
      </div>
    </div>
  );
};
