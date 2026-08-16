import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ScanBeam = ({ active = true, position = [0, 0, 0], scale = [3, 0.05, 3] }: any) => {
  const beamRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (beamRef.current && active) {
      beamRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 2;
      (beamRef.current.material as THREE.Material).opacity = 0.5 + Math.sin(state.clock.elapsedTime * 10) * 0.2;
    }
  });

  return (
    <mesh ref={beamRef} position={new THREE.Vector3(...position)} scale={new THREE.Vector3(...scale)}>
      <boxGeometry />
      <meshBasicMaterial color="#00d2ff" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
};
