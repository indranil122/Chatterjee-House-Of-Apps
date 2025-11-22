import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TIMELINE, FOUNDER_NAME } from '../constants';
import { Heart } from 'lucide-react';

export const About: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="about" className="py-32 px-6 relative bg-[#050505] overflow-hidden" ref={containerRef}>
      
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-[10%] w-[40%] h-[40%] bg-red-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Content - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sticky top-32"
          >
            
            <span className="text-red-600 font-bold tracking-wider uppercase text-sm mb-4 flex items-center gap-2">
               <Heart size={16} className="fill-red-600 animate-pulse" /> The Founder's Story
            </span>
            
            <h2 className="text-5xl font-display font-bold text-white mb-8 leading-tight">
              Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">{FOUNDER_NAME}</span>.
            </h2>
            
            <div className="prose prose-lg text-neutral-400 space-y-6 relative z-10">
                <p className="text-xl font-light leading-relaxed">
                I don't just write code; I craft digital experiences from pure curiosity. My journey began with a simple question: <span className="italic text-white font-medium">"How can technology actually help people?"</span>
                </p>
                <p className="leading-relaxed">
                At <strong>Chatterjee House of Apps</strong>, code is our paintbrush and society is our canvas. Whether it's empowering rural students through <span className="text-red-500 font-bold">PoroBangla AI</span> or creating open-source tools, the mission is singular: build cool things that solve real problems, for free.
                </p>
            </div>
            
            <div className="mt-12 flex gap-6">
                <motion.div 
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] transition-all"
                >
                    <h4 className="text-4xl font-display font-bold text-white mb-1">100%</h4>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide font-bold">Free & Open</p>
                </motion.div>
                <motion.div 
                     whileHover={{ scale: 1.05, rotate: 2 }}
                     className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] transition-all"
                >
                    <h4 className="text-4xl font-display font-bold text-white mb-1">Social</h4>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide font-bold">Impact First</p>
                </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Animated Timeline */}
          <div className="relative pl-4 md:pl-10">
            {/* Line Container */}
            <div className="absolute left-[19px] md:left-[43px] top-0 bottom-0 w-[1px] bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                    className="w-full h-full bg-gradient-to-b from-red-600 via-red-500 to-orange-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                />
            </div>

            <div className="space-y-16 relative z-10 py-10">
                {TIMELINE.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="relative pl-12 md:pl-16 group"
                    >
                        {/* Glowing Dot */}
                        <div className="absolute left-0 md:left-6 top-0 w-10 h-10 md:w-12 md:h-12 -translate-x-1/2 flex items-center justify-center bg-[#0a0a0a] border border-white/10 rounded-full z-10 shadow-sm group-hover:border-red-600 transition-colors duration-500 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                            <div className="w-2 h-2 md:w-3 md:h-3 bg-neutral-600 rounded-full group-hover:bg-red-500 transition-all duration-500 group-hover:scale-150"></div>
                        </div>
                        
                        <div className="bg-white/[0.02] p-6 md:p-8 rounded-2xl border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.04] hover:border-red-500/20 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                            
                            <span className="inline-block px-3 py-1 text-xs font-bold text-red-500 bg-red-900/20 rounded-full mb-3 border border-red-900/30">
                                {item.year}
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-neutral-400 text-base leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};