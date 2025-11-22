import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, Layers } from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../constants';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="work" className="py-32 px-6 relative overflow-hidden bg-[#050505]">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/3 w-1/3 h-1/3 bg-red-900/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute left-0 bottom-1/3 w-1/3 h-1/3 bg-orange-900/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <span className="text-red-500 font-bold tracking-wider uppercase text-xs flex items-center gap-2">
              <Layers size={12} /> Selected Works
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-8"
          >
            Turning <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 relative inline-block">
                Ideas
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-600 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
            </span> into Reality
          </motion.h2>

          {/* Categories Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {PROJECT_CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden group ${
                        activeCategory === cat
                        ? 'text-white shadow-lg shadow-red-600/25 ring-1 ring-red-600'
                        : 'bg-white/[0.05] text-neutral-400 hover:bg-white/[0.1] hover:text-white border border-white/10'
                    }`}
                >
                    {activeCategory === cat && (
                        <motion.div
                            layoutId="activeCategory"
                            className="absolute inset-0 bg-red-700"
                        />
                    )}
                    <span className={`relative z-10 ${activeCategory === cat ? 'text-white' : ''}`}>
                        {cat}
                    </span>
                </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-1000">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
                <TiltCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const TiltCard: React.FC<{ project: Project, index: number }> = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[480px] w-full group cursor-pointer"
    >
      <div 
        style={{ transform: "translateZ(0px)" }}
        className="absolute inset-0 bg-[#0a0a0a] rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:shadow-red-900/20 overflow-hidden border border-white/[0.05] transition-all duration-500"
      >
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30">
             <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-red-600/50" />
        </div>

        {/* Holographic Sheen - Red Shifted */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-40 pointer-events-none transform -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out mix-blend-overlay" />

        {/* Card Image / Gradient Area */}
        <div className={`h-[55%] w-full bg-gradient-to-br ${project.color} relative p-8 flex flex-col justify-between overflow-hidden`}>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
            
            <div className="flex justify-between items-start z-10 transform translate-z-10">
                <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20 shadow-lg">
                    {project.category}
                </span>
            </div>

            <div className="z-10 transform translate-z-30 group-hover:translate-x-2 transition-transform duration-500">
                <h3 className="text-4xl font-display font-bold text-white tracking-tight drop-shadow-lg leading-none">{project.title}</h3>
            </div>
        </div>

        {/* Card Content Area */}
        <div className="h-[45%] p-8 flex flex-col justify-between relative bg-[#0a0a0a]">
             <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 group-hover:text-neutral-200 transition-colors">
                {project.description}
             </p>
             
             <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={tag} 
                        className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 bg-white/5 rounded-md border border-white/5 group-hover:border-red-900/50 transition-colors"
                    >
                        {tag}
                    </motion.span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-red-900/30 transition-colors">
                    <div className="flex gap-3 transform translate-z-20">
                        <a href="#" className="p-2.5 rounded-full bg-white/5 text-neutral-400 hover:bg-white hover:text-black transition-all hover:scale-110">
                            <Github size={18} />
                        </a>
                        <a href="#" className="p-2.5 rounded-full bg-white/5 text-neutral-400 hover:bg-red-600 hover:text-white transition-all hover:scale-110 shadow-lg hover:shadow-red-600/30">
                            <ExternalLink size={18} />
                        </a>
                    </div>
                    <span className="text-xs font-bold text-neutral-500 group-hover:text-white transition-colors flex items-center gap-1">
                        Details <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                </div>
             </div>
        </div>
      </div>
    </motion.div>
  );
};