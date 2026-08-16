import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Wireframe, Float, Edges } from '@react-three/drei';
import * as THREE from 'three';

export const InspectionModel = ({ isScanning = false }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron args={[1.5, 1]} castShadow receiveShadow>
          <meshStandardMaterial 
            color="#2a2a2e"
            metalness={0.9}
            roughness={0.2}
            envMapIntensity={1}
          />
          <Edges 
            linewidth={2}
            threshold={15} 
            color={isScanning ? "#00d2ff" : "#444"} 
          />
        </Icosahedron>
        
        {/* Core glowing element */}
        <Icosahedron args={[0.8, 1]}>
          <meshBasicMaterial color={isScanning ? "#00d2ff" : "#f59e0b"} wireframe transparent opacity={0.3} />
        </Icosahedron>
      </Float>
    </group>
  );
};
