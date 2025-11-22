import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Stats } from './components/Stats';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Philosophy } from './components/Philosophy';
import { Footer } from './components/Footer';
import { Background } from './components/Background';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    // Force dark mode class on mount
    document.documentElement.classList.add('dark');
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`font-sans antialiased selection:bg-red-600 selection:text-white bg-[#050505] text-white min-h-screen`}>
      <AnimatePresence mode="wait">
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Background />
          <Navbar />
          <main className="relative z-0">
            <Hero />
            <Stats />
            <About />
            <Skills />
            <Projects />
            <Philosophy />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;