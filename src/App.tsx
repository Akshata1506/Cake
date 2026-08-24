import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import AllCakes from './pages/AllCakes';
import CustomizeCake from './pages/CustomizeCake';
import { getAssetPath } from './utils/assets';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Always scroll to top on reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Simulate loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Premium Brand Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              y: '-100vh',
              opacity: 0,
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: '#0a0a0a' }}
          >
            {/* Pink glow pulse behind logo */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-72 h-72 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(229,91,117,0.25) 0%, transparent 70%)' }}
            />

            {/* Logo with dark border */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="mb-8 relative"
            >
              <img 
                src={getAssetPath('/logo.png')} 
                alt="Sweet Slice Logo" 
                className="w-40 h-40 md:w-56 md:h-56 object-contain rounded-3xl"
                style={{ 
                  border: '3px solid rgba(229,91,117,0.3)',
                  boxShadow: '0 0 60px rgba(229,91,117,0.2), 0 20px 60px rgba(0,0,0,0.5)',
                  background: 'rgba(255,252,248,0.95)'
                }} 
              />
            </motion.div>
            
            {/* Animated Brand Name - Letter by letter */}
            <div className="flex items-center gap-1 mb-3 overflow-hidden">
              {'Sweet Slice'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-playfair font-bold text-3xl md:text-5xl"
                  style={{ 
                    color: letter === ' ' ? 'transparent' : '#ffffff',
                    display: 'inline-block',
                    width: letter === ' ' ? '12px' : 'auto',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
              className="h-[2px] rounded-full mb-3"
              style={{ background: 'linear-gradient(90deg, transparent, #e55b75, transparent)' }}
            />

            {/* Tagline with fade */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: '2px' }}
              animate={{ opacity: 1, letterSpacing: '6px' }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-[10px] uppercase font-inter font-bold"
              style={{ color: '#e55b75' }}
            >
              Baked with Love
            </motion.p>

            {/* Pink shimmer load bar */}
            <div className="absolute bottom-16 w-48 h-[2px] overflow-hidden rounded-full"
              style={{ background: 'rgba(229,91,117,0.1)' }}>
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-24 rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, #e55b75, #ffffff, transparent)' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Content */}
      <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <div className="relative min-h-screen bg-cream selection:bg-gold selection:text-chocolate">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-cakes" element={<AllCakes />} />
            <Route path="/customize" element={<CustomizeCake />} />
            <Route path="/order" element={<LandingPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
};
export default App;
