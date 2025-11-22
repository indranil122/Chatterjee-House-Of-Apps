import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { SOCIAL_LINKS, BRAND_NAME, FOUNDER_NAME } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#050505] relative pt-32 pb-10 overflow-hidden">
      
      {/* Animated Wave Top Border - Dark Fill */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px] sm:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#050505] opacity-50"></path>
            {/* We don't really need a wave if background is same color, but keeping it for potential separation effect if sections vary slightly */}
        </svg>
      </div>

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        
        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/[0.03] border border-white/[0.05] rounded-[3rem] p-10 md:p-20 text-center mb-24 relative overflow-hidden shadow-2xl"
        >
          {/* Animated Background in CTA */}
          <div className="absolute inset-0">
             <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-900/20 rounded-full blur-[100px] animate-pulse"></div>
             <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-900/20 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
                Have an idea?
            </h2>
            <p className="text-neutral-400 mb-10 max-w-xl mx-auto text-lg">
              Let's build something extraordinary together. Whether you have a vision or just want to say hello.
            </p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:contact@example.com" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-red-600 hover:text-white hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-300"
            >
              <Mail size={22} />
              Get in Touch
            </motion.a>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-white mb-2">{BRAND_NAME}</h3>
            <p className="text-neutral-500">Building for the future, with curiosity.</p>
          </div>

          <div className="flex gap-6">
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, rotate: 5 }}
                className="p-4 bg-white/[0.05] text-neutral-400 rounded-full hover:bg-white hover:text-black shadow-sm transition-all border border-white/[0.05]"
                aria-label={social.name}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-neutral-500">
          <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
          <p className="flex items-center gap-1.5 bg-white/[0.03] px-4 py-2 rounded-full border border-white/5">
            Made with <Heart size={14} className="text-red-600 fill-red-600 animate-pulse" /> by <span className="text-white">{FOUNDER_NAME}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};