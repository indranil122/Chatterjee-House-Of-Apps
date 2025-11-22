import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

const StatueModel = () => {
  const group = useRef<THREE.Group>(null);
  // Using the standard Lee Perry Smith model from Three.js examples
  const { scene } = useGLTF('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb');
  
  // Apply Stone/Marble Material
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#CCCCCC'), // Brighter grey/white
          roughness: 0.2, // More polished
          metalness: 0.3, // Slight sheen
          normalScale: new THREE.Vector2(1, 1),
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (group.current) {
      // Smooth look-at / rotation following mouse
      const targetRotationY = (state.mouse.x * Math.PI) / 6; 
      const targetRotationX = (state.mouse.y * Math.PI) / 10;
      
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.05);
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
       <primitive object={scene} scale={0.8} />
    </group>
  );
};

const Lights = () => {
  return (
    <>
      {/* Increased Ambient Light */}
      <ambientLight intensity={2.0} color="#222222" />
      
      {/* Main Dramatic Red Light - Side/Back - High Intensity */}
      <spotLight 
        position={[-4, 2, 4]} 
        angle={0.6} 
        penumbra={0.5} 
        intensity={80} 
        color="#ef4444" 
        castShadow 
        shadow-bias={-0.0001}
      />
      
      {/* Soft Red Fill - Right - Increased Intensity */}
      <pointLight position={[4, 0, 2]} intensity={60} color="#b91c1c" />
      
      {/* Front White Key Light - To make face visible */}
      <directionalLight position={[0, 2, 5]} intensity={3} color="#ffffff" />

      {/* Rim Light - Cool Blue - Separation */}
      <spotLight 
        position={[0, 5, -5]} 
        angle={0.5} 
        intensity={15} 
        color="#cbd5e1" 
      />
    </>
  );
};

const Loader = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center w-40">
      <div className="text-xs font-bold tracking-[0.3em] text-red-600 mb-2 animate-pulse">LOADING ART</div>
      <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
         <div className="absolute inset-0 bg-red-600 animate-shimmer"></div>
      </div>
    </div>
  </Html>
);

export const GreekStatueViewer: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 6], fov: 35 }} // Closer camera
        gl={{ 
          alpha: true, 
          antialias: true, 
          toneMapping: THREE.ReinhardToneMapping, 
          toneMappingExposure: 1.8 // Increased exposure
        }}
        shadows
      >
        <React.Suspense fallback={<Loader />}>
           <Lights />
           <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
              <StatueModel />
           </Float>
        </React.Suspense>
      </Canvas>
    </div>
  );
};