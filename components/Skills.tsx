import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { Cpu, Code, Database, Layout, Smartphone } from 'lucide-react';

// Mapping string icons to Lucide components for visual consistency in orbit
const iconMap: Record<string, any> = {
  'React': Code,
  'TypeScript': Code, // Using Code as generic
  'AI/ML': Cpu,
  'Node.js': Database,
  'UI/UX': Layout,
  'Flutter': Smartphone
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden min-h-screen flex items-center bg-[#050505]">
      <div className="container mx-auto max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div className="text-center lg:text-left">
             <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-red-600 font-bold tracking-wider uppercase text-sm mb-4 block"
             >
                Technical Arsenal
             </motion.span>
             
             <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight"
             >
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Universe</span> of <br/> Technologies
             </motion.h2>
             
             <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-neutral-400 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
             >
                I orbit around modern web and mobile technologies, constantly expanding my gravitational pull to include new tools like AI and Machine Learning.
             </motion.p>

             {/* Linear list for mobile readability */}
             <div className="flex flex-wrap gap-3 justify-center lg:justify-start lg:hidden">
                {SKILLS.map(skill => (
                    <span key={skill.name} className="px-4 py-2 bg-neutral-900 rounded-full text-sm font-bold shadow-sm border border-neutral-800 text-white">
                        {skill.name}
                    </span>
                ))}
             </div>
        </div>

        {/* Orbital Animation - Visible on large screens */}
        <div className="hidden lg:block relative h-[600px] w-full flex items-center justify-center perspective-1000">
             
             {/* Central Planet */}
             <motion.div 
                animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(220,38,38,0.2)", "0 0 50px rgba(220,38,38,0.5)", "0 0 20px rgba(220,38,38,0.2)"] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center z-20 shadow-2xl relative border border-red-500/30"
             >
                <span className="text-4xl font-bold text-white">IC</span>
                {/* Rings around core */}
                <div className="absolute inset-0 border border-red-500/20 rounded-full scale-125 opacity-50"></div>
                <div className="absolute inset-0 border border-red-500/10 rounded-full scale-150 opacity-30"></div>
             </motion.div>

             {/* Orbit Container */}
             <div className="absolute inset-0 flex items-center justify-center">
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="w-[450px] h-[450px] border border-white/5 rounded-full absolute"
                 >
                    {/* Planets (Skills) */}
                    {SKILLS.map((skill, index) => {
                        const angle = (index / SKILLS.length) * 360;
                        return (
                            <div 
                                key={skill.name}
                                className="absolute top-1/2 left-1/2 -mt-8 -ml-8 w-16 h-16"
                                style={{
                                    transform: `rotate(${angle}deg) translate(225px) rotate(-${angle}deg)`
                                }}
                            >
                                <motion.div 
                                    animate={{ rotate: -360 }} 
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                    whileHover={{ scale: 1.2, zIndex: 50 }}
                                    className="w-16 h-16 bg-[#0a0a0a] rounded-full border border-white/10 shadow-lg flex items-center justify-center group cursor-pointer relative hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all"
                                >
                                    <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all duration-300">{skill.icon}</span>
                                    
                                    {/* Tooltip */}
                                    <div className="absolute top-full mt-2 px-3 py-1 bg-neutral-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                                        {skill.name} • {skill.level}%
                                    </div>

                                    {/* Glow on hover */}
                                    <div className="absolute inset-0 bg-red-600/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </motion.div>
                            </div>
                        );
                    })}
                 </motion.div>
                 
                 {/* Inner decorative orbit */}
                 <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="w-[280px] h-[280px] border border-dashed border-white/5 rounded-full absolute"
                 />
             </div>
        </div>

        {/* Decorative background elements */}
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 left-10 text-white/5 -z-10">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="20"/></svg>
        </motion.div>
        <motion.div animate={{ y: [0, 30, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-10 right-10 text-white/5 -z-10">
             <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor"><rect x="20" y="20" width="60" height="60" rx="10"/></svg>
        </motion.div>
      </div>
    </section>
  );
};