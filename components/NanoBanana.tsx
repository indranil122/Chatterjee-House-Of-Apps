
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Stars, SpotLight, Cylinder, Box } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// --- 3D Elements ---

const Pedestal = () => {
  return (
    <group position={[0, -3.2, 0]}>
      {/* Base Block */}
      <Box args={[3, 0.2, 3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#111" roughness={0.5} metalness={0.8} />
      </Box>
      {/* Middle Step */}
      <Box args={[2.5, 0.2, 2.5]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.8} />
      </Box>
      {/* Column Base Cylinder */}
      <Cylinder args={[1.2, 1.4, 0.5, 32]} position={[0, 0.55, 0]}>
        <meshStandardMaterial color="#222" roughness={0.3} metalness={0.6} />
      </Cylinder>
      {/* Top Ring */}
      <Cylinder args={[1.1, 1.1, 0.1, 32]} position={[0, 0.85, 0]}>
        <meshStandardMaterial color="#ef4444" emissive="#7f1d1d" emissiveIntensity={0.5} />
      </Cylinder>
    </group>
  );
};

const Atoms = ({ curve }: { curve: THREE.CatmullRomCurve3 }) => {
  const atomCount = 40;
  const atoms = useMemo(() => {
    const temp = [];
    for (let i = 0; i < atomCount; i++) {
      const t = Math.random();
      const point = curve.getPoint(t);
      // Add some random offset from the center line to simulate being on surface
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.6; // Approx tube radius
      point.x += Math.cos(angle) * radius;
      point.z += Math.sin(angle) * radius;
      temp.push(point);
    }
    return temp;
  }, [curve]);

  return (
    <group>
      {atoms.map((pos, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial 
              color="#ef4444" 
              emissive="#ef4444" 
              emissiveIntensity={2} 
              toneMapped={false}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const BananaMesh = ({ 
  speed, 
  isWireframe, 
  toggleWireframe 
}: { 
  speed: number; 
  isWireframe: boolean; 
  toggleWireframe: () => void 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Define the curved shape
  const curve = useMemo(() => {
    // A curve that goes up and bends slightly like a banana/column
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -2.5, 0),
      new THREE.Vector3(0.2, -1, 0.2),
      new THREE.Vector3(-0.5, 1, -0.2),
      new THREE.Vector3(0, 3, 0),
    ]);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed * delta;
    }
  });

  return (
    <group>
      {/* Main Structure */}
      <mesh 
        ref={meshRef} 
        onClick={toggleWireframe}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <tubeGeometry args={[curve, 64, 0.6, 16, false]} />
        <meshPhysicalMaterial 
          color={isWireframe ? "#ef4444" : "#1a1a1a"}
          wireframe={isWireframe}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glow Halo inside/around if solid */}
      {!isWireframe && (
        <mesh position={[0,0,0]} scale={[1.05, 1, 1.05]}>
           <tubeGeometry args={[curve, 64, 0.65, 16, false]} />
           <meshBasicMaterial color="#ef4444" transparent opacity={0.05} side={THREE.BackSide} />
        </mesh>
      )}

      {/* Atoms attached to structure */}
      <group ref={meshRef}> 
        {/* We nest this so atoms rotate WITH the banana */}
        <Atoms curve={curve} />
      </group>
    </group>
  );
};

// --- Main Component ---

export const NanoBanana: React.FC = () => {
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [isWireframe, setIsWireframe] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between h-[800px]">
        
        {/* Left Controls / Info */}
        <div className="lg:w-1/3 z-10 mb-10 lg:mb-0 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
             <h3 className="text-red-600 font-bold tracking-[0.3em] text-sm mb-4">INTERACTIVE PROTOTYPE</h3>
             <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
               Nano Banana <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Genesis</span>
             </h2>
             <p className="text-slate-400 mb-8 leading-relaxed">
               Exploring the architectural potential of carbon nanotubes arranged in organic, neoclassical structures. 
               Click the model to analyze the mesh topology.
             </p>

             {/* Controls */}
             <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 inline-block w-full max-w-md">
                <div className="mb-4">
                  <label className="flex justify-between text-xs font-bold text-slate-300 uppercase mb-2">
                    <span>Rotation Speed</span>
                    <span>{Math.round(rotationSpeed * 10)} RPM</span>
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="5" 
                    step="0.1"
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Mode: {isWireframe ? 'Topology' : 'Surface'}</span>
                    <button 
                      onClick={() => setIsWireframe(!isWireframe)}
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-500 text-xs font-bold uppercase rounded border border-red-600/50 transition-colors"
                    >
                      Toggle Wireframe
                    </button>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Right 3D Canvas */}
        <div className="lg:w-2/3 w-full h-full relative">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent blur-3xl -z-10 pointer-events-none"></div>
           
           <Canvas shadows camera={{ position: [5, 2, 5], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true }}>
              <color attach="background" args={['transparent']} /> {/* Transparent for HTML bg */}
              
              <OrbitControls 
                enableZoom={false} 
                minPolarAngle={Math.PI / 4} 
                maxPolarAngle={Math.PI / 2}
                autoRotate={false}
              />

              {/* Lighting */}
              <ambientLight intensity={0.2} />
              <SpotLight 
                position={[10, 10, 10]} 
                angle={0.15} 
                penumbra={1} 
                intensity={2} 
                color="#ffffff" 
                castShadow 
              />
              <pointLight position={[-5, 5, -5]} intensity={1.5} color="#ef4444" />
              <pointLight position={[0, -5, 0]} intensity={0.5} color="#blue" />

              <group position={[0, -0.5, 0]}>
                <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                   <BananaMesh 
                      speed={rotationSpeed} 
                      isWireframe={isWireframe} 
                      toggleWireframe={() => setIsWireframe(!isWireframe)} 
                   />
                </Float>
                <Pedestal />

                {/* 3D Label */}
                <Text
                   position={[2, 3, 0]}
                   fontSize={0.4}
                   color="white"
                   font="https://fonts.gstatic.com/s/outfit/v6/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1.woff" // Direct font URL fallback
                   anchorX="center"
                   anchorY="middle"
                   rotation={[0, -Math.PI / 6, 0]}
                >
                  GENESIS v1.0
                  <meshStandardMaterial emissive="white" emissiveIntensity={0.2} />
                </Text>
              </group>
              
              <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
           </Canvas>
        </div>

      </div>
    </section>
  );
};
