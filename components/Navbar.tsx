import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface MagneticLinkProps {
  children: React.ReactNode;
  href: string;
}

const MagneticLink: React.FC<MagneticLinkProps> = ({ children, href }) => {
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className="relative px-4 py-2 text-xs md:text-sm font-bold tracking-widest uppercase text-neutral-400 hover:text-white transition-colors group"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-x-2 -bottom-1 h-[1px] bg-red-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
    </motion.a>
  );
};

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Specific links requested for the cinematic look
  const navLinks = [
    { name: 'APPS', href: '#work' },
    { name: 'PROJECTS', href: '#work' },
    { name: 'GALLERY', href: '#skills' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? 'py-4 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-3 items-center">
        
        {/* Mobile: Logo Left. Desktop: Logo hidden (or integrated), Links Center */}
        <div className="flex items-center justify-start">
           <a href="#" className="block md:hidden text-xl font-display font-bold tracking-tighter text-white">
             C/HOA
           </a>
           {/* Desktop Logo - Minimal */}
           <a href="#" className="hidden md:block text-sm font-bold tracking-widest text-white/30 hover:text-red-500 transition-colors">
             C/HOA
           </a>
        </div>

        {/* Desktop Centered Menu */}
        <div className="hidden md:flex items-center justify-center space-x-1">
          {navLinks.map((link, i) => (
            <React.Fragment key={link.name}>
              <MagneticLink href={link.href}>
                {link.name}
              </MagneticLink>
              {i < navLinks.length - 1 && (
                <span className="text-white/10 font-light px-1">—</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Right Side: Mobile Toggle */}
        <div className="flex items-center justify-end gap-4">
          <button
            className="text-white md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full bg-[#050505] z-40 flex flex-col justify-center items-center overflow-hidden"
          >
            <button 
               onClick={() => setMobileMenuOpen(false)}
               className="absolute top-8 right-6 text-white"
            >
               <X size={32} />
            </button>
            <div className="flex flex-col space-y-8 items-center">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-display font-black tracking-tighter text-white hover:text-red-600 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};