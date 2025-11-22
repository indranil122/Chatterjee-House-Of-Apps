import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { STATS } from '../constants';

const Counter = ({ value }: { value: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0; 
  
  const springValue = useSpring(0, { bounce: 0, duration: 2500 });
  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      springValue.set(numericValue);
    }
  }, [isInView, numericValue, springValue]);

  return (
    <span ref={nodeRef} className="inline-block tabular-nums">
      <motion.span>{displayValue}</motion.span>
    </span>
  );
};

export const Stats: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-[#050505] relative z-10">
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-[#050505] to-[#050505] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              animate={{ y: [0, -5, 0] }} 
            >
                <div className="relative group text-center p-8 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.05] hover:border-red-500/30 transition-all duration-500 overflow-hidden">
                    
                    {/* Animated Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent z-10 pointer-events-none" />

                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white group-hover:text-red-500 transition-colors duration-300 mb-3 relative z-20">
                        <Counter value={stat.value} />
                        <span className="text-2xl ml-1 align-top text-neutral-500 group-hover:text-red-400 transition-colors">{stat.suffix}</span>
                    </h3>
                    <p className="text-xs md:text-xs font-bold uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors relative z-20">
                        {stat.label}
                    </p>
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};