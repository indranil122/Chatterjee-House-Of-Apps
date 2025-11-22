import React from 'react';
import { motion, useScroll } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-900 via-red-600 to-orange-500 origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};