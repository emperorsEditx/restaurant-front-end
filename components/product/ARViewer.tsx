// components/product/ARViewer.tsx
'use client';

import { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { MenuItem } from '@/types';
import { motion } from 'framer-motion';

// Simple 3D model placeholder (replace with actual GLB loading)
function BurgerModel() {
  const meshRef = useRef<any>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 1.5, 2]} />
      <meshStandardMaterial color="#f59e0b" roughness={0.4} metalness={0.1} />
      <Html position={[0, 1.2, 0]}>
        <div className="text-xs bg-black/80 px-2 py-1 rounded text-white">Burger</div>
      </Html>
    </mesh>
  );
}

export default function ARViewer({ item }: { item: MenuItem }) {
  const [isARSupported, setIsARSupported] = useState<boolean | null>(null);
  const [isARActive, setIsARActive] = useState(false);

  // Check WebXR support
  if (typeof window !== 'undefined' && isARSupported === null) {
    const supported = 'xr' in navigator;
    setIsARSupported(supported);
  }

  const launchAR = async () => {
    if (!navigator.xr) {
      alert('AR not supported on this device');
      return;
    }
    try {
      // For demo, we just simulate AR. In production, you'd load a model and set up XRSession.
      setIsARActive(true);
      // In real implementation: navigator.xr.requestSession('immersive-ar')
    } catch (e) {
      console.error('AR launch failed', e);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">3D Preview & AR</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={launchAR}
          className="px-4 py-2 bg-primary text-black font-bold rounded-lg text-sm hover:bg-primary/90 transition"
          disabled={!isARSupported}
        >
          {isARSupported ? 'View in AR' : 'AR not supported'}
        </motion.button>
      </div>

      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black/30">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/40">Loading 3D...</div>}>
          <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 7]} intensity={1} />
            <Environment preset="city" />
            <BurgerModel />
            <OrbitControls enablePan enableZoom autoRotate autoRotateSpeed={1.5} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}