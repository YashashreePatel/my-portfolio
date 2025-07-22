'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const RotatingGlobe = () => {
  const globeRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005; // Adjust rotation speed
    }
  });

  return (
    <Sphere ref={globeRef} args={[1, 64, 64]} castShadow>
      <meshPhysicalMaterial
        transmission={1} // Makes it glass-like
        roughness={0} // Smooth and reflective
        thickness={0.5} // Controls depth of transparency
        clearcoat={1} // Adds shine
        clearcoatRoughness={0}
        color="lightblue"
      />
    </Sphere>
  );
};

const Globe = () => {
  return (
    <div className="fixed bottom-[30px] right-[35px] pointer-events-none z-50">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 3]} castShadow />
        <RotatingGlobe />
      </Canvas>
    </div>
  );
};

export default Globe;
