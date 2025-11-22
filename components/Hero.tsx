
import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BRAND_NAME } from '../constants';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

// Magnetic Button Component
const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className, href, onClick }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const xPos = clientX - (left + width / 2);
    const yPos = clientY - (top + height / 2);
    x.set(xPos / 2); 
    y.set(yPos / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

export const Hero: React.FC = () => {
  
  return (
    <section className="min-h-screen bg-[#050505] relative overflow-hidden flex flex-col justify-center text-white">
      
      {/* Global Background Noise/Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-10"></div>
      
      {/* Subtle Center Glow - Reduced size and opacity for minimal look */}
       <motion.div 
         animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-red-900 rounded-full blur-[120px] opacity-20 z-0 pointer-events-none"
       />
       
      {/* Subtle Edge Accents to blend with dark theme */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-0 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 h-full relative z-20 pt-20 flex flex-col items-center justify-center min-h-screen text-center">
          
            {/* Decorative Line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-24 h-[1px] bg-red-900/50 mb-12"
            />

            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black tracking-tighter leading-[0.9] mb-4 text-white mix-blend-normal drop-shadow-2xl"
            >
              OUR VERSION
            </motion.h2>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl md:text-5xl lg:text-6xl font-sans font-bold text-red-600 tracking-tight mb-10 drop-shadow-lg"
            >
              {BRAND_NAME.toUpperCase()}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-neutral-400 text-lg md:text-xl max-w-3xl font-light tracking-wide leading-relaxed mb-16"
            >
              A UNIVERSE OF APPS, CREATIVITY, DESIGN, AND INNOVATION <br className="hidden md:block" />
              — BUILT BY CHATTERJEE.
            </motion.p>

            <div className="flex items-center justify-center gap-6">
              <MagneticButton
                href="#work"
                className="group relative px-12 py-5 rounded-full border border-white/10 hover:border-red-600/50 transition-all duration-500 overflow-hidden bg-white/[0.02] backdrop-blur-md"
              >
                <span className="relative z-10 text-sm md:text-base font-bold tracking-[0.2em] uppercase flex items-center gap-3 text-white group-hover:text-red-500 transition-colors">
                  See More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </MagneticButton>
            </div>
            
            {/* Pagination - Bottom Center */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-xs font-mono text-neutral-600"
            >
               <span>01</span>
               <div className="w-16 h-[1px] bg-neutral-800 relative overflow-hidden">
                 <motion.div 
                   initial={{ x: '-100%' }}
                   animate={{ x: '0%' }}
                   transition={{ duration: 2, ease: "easeInOut" }}
                   className="absolute inset-0 bg-red-800" 
                 />
               </div>
               <span>03</span>
            </motion.div>
      </div>
      
      {/* Floating particles - Very Subtle */}
       <div className="absolute inset-0 pointer-events-none z-20 opacity-30">
         <motion.div 
            animate={{ y: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/3 right-[15%] w-1 h-1 bg-red-500 rounded-full blur-[1px]"
         />
         <motion.div 
            animate={{ y: [10, -10, 10], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-1/3 left-[15%] w-1 h-1 bg-white rounded-full blur-[1px]"
         />
       </div>

    </section>
  );
};
