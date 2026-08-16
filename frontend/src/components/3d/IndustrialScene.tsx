import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

import { ParticleField } from './ParticleField';
import { ScanBeam } from './ScanBeam';
import { InspectionModel } from './InspectionModel';

interface IndustrialSceneProps {
  isScanning?: boolean;
  showParticles?: boolean;
  interactive?: boolean;
}

export const IndustrialScene: React.FC<IndustrialSceneProps> = ({ 
  isScanning = false, 
  showParticles = true,
  interactive = true 
}) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />
      
      <color attach="background" args={['#0a0a0c']} />
      <fog attach="fog" args={['#0a0a0c', 5, 20]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <spotLight 
        position={[5, 5, 5]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        color="#ffffff" 
      />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#00d2ff" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#f59e0b" />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Components */}
      <InspectionModel isScanning={isScanning} />
      {isScanning && <ScanBeam active={isScanning} />}
      {showParticles && <ParticleField count={300} />}

      {/* Controls */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={interactive} 
        enableRotate={interactive}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />

      {/* Post Processing */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2} 
          mipmapBlur 
          intensity={1.5} 
        />
        <Noise opacity={0.03} />
        <ChromaticAberration 
          offset={new THREE.Vector2(0.001, 0.001)} 
        />
      </EffectComposer>
    </Canvas>
  );
};
