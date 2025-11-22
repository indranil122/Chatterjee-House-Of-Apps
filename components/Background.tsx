import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Background: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x1 = useSpring(mouseX, springConfig);
  const y1 = useSpring(mouseY, springConfig);
  const x2 = useSpring(mouseX, { ...springConfig, damping: 35 }); // Slower
  const y2 = useSpring(mouseY, { ...springConfig, damping: 35 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Calculate offset from center
      mouseX.set((clientX - centerX) * 0.05); // Slight movement
      mouseY.set((clientY - centerY) * 0.05);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050505]">
      
      {/* Aurora Effect with Parallax - Red/Black/Gray Theme */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 mix-blend-screen">
        <motion.div 
          style={{ x: x1, y: y1 }}
          className="absolute -top-[40%] -left-[20%] w-[140%] h-[140%] bg-gradient-to-tr from-red-900/40 via-neutral-900 to-transparent rounded-full blur-[150px] animate-blob" 
        />
        <motion.div 
          style={{ x: x2, y: y2 }}
          className="absolute top-[20%] -right-[20%] w-[100%] h-[100%] bg-gradient-to-bl from-red-800/30 via-black to-transparent rounded-full blur-[150px] animate-blob animation-delay-2000" 
        />
        <motion.div 
          style={{ x: x1, y: y2 }}
          className="absolute -bottom-[40%] left-[20%] w-[120%] h-[120%] bg-gradient-to-t from-orange-900/20 via-red-900/20 to-transparent rounded-full blur-[150px] animate-blob animation-delay-4000" 
        />
      </div>

      {/* Floating Particles with Mouse Interaction */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20 blur-[1px]"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [null, Math.random() * -100],
              x: [null, Math.random() * 50 - 25],
              opacity: [0.05, 0.2, 0.05],
            }}
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              background: Math.random() > 0.8 ? '#ef4444' : '#ffffff' // Occasional red particle
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222222_1px,transparent_1px),linear-gradient(to_bottom,#222222_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
    </div>
  );
};