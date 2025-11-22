import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 px-6 bg-[#050505] text-white relative overflow-hidden">
      {/* Background decorative glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-900/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8 flex justify-center"
        >
            <Quote size={48} className="text-neutral-700" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-display font-bold mb-10 leading-tight"
        >
          "Innovation without purpose is just a toy. Innovation with <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">purpose</span> is a revolution."
        </motion.h2>
        
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 100 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-12"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-xl text-neutral-400 font-light leading-relaxed max-w-3xl mx-auto"
        >
          At Chatterjee House of Apps, we believe that technology should be a bridge, not a barrier. 
          Every line of code we write is dedicated to solving real problems, fostering education, 
          and bringing people together. We don't just build apps; we build pathways to a better future.
        </motion.p>
      </div>
    </section>
  );
};