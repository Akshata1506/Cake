import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAssetPath } from '../utils/assets';

const Hero: React.FC = () => {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      className="relative w-full max-w-full min-h-screen overflow-hidden flex items-center pt-20"
      style={{ background: '#0a0a0a' }}
    >
      {/* Subtle pink ambient glow */}
      <div className="absolute top-1/4 right-1/3 w-72 h-72 md:w-96 md:h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(229,91,117,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(229,91,117,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 py-12 md:py-16">

        {/* ── LEFT: Text Content ── */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex-1 flex flex-col z-10 w-full"
        >
          {/* Brand badge */}
          <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
            <span className="block w-8 h-px" style={{ background: '#e55b75' }} />
            <span
              className="text-xs font-bold font-inter tracking-[4px] uppercase"
              style={{ color: '#e55b75' }}
            >
              Pâtisserie Artisanale
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold leading-tight mb-4 md:mb-6"
            style={{ color: '#ffffff' }}
          >
            Handcrafted<br />
            Cakes <span style={{ color: '#e55b75' }}>&amp;</span>
            <br />
            <span style={{ color: '#e55b75' }}>Brownies</span>
          </h1>

          <p
            className="font-inter text-sm sm:text-base md:text-lg mb-8 md:mb-10 max-w-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Premium ingredients, crafted with love. Every bite tells a story —
            order fresh for your celebration and get it delivered to your door.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 md:mb-12">
            <Link to="/all-cakes" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(229,91,117,0.3)' }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-inter font-bold tracking-widest uppercase text-xs sm:text-sm text-center"
                style={{ background: '#e55b75', color: '#ffffff' }}
              >
                View All Pastries
              </motion.button>
            </Link>
            <Link to="/customize" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-inter font-bold tracking-widest uppercase text-xs sm:text-sm border-2 transition-colors text-center"
                style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#ffffff', background: 'transparent' }}
              >
                Customize Your Cake
              </motion.button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-6 sm:gap-8 pt-6 sm:pt-8 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            {[
              { value: '500+', label: 'Happy Orders' },
              { value: '4.9★', label: 'Customer Rating' },
              { value: '2hr',  label: 'Express Delivery' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xl sm:text-2xl font-playfair font-bold" style={{ color: '#e55b75' }}>
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs font-inter" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Single Dark Beautiful Image ── */}
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          className="flex-1 relative flex items-center justify-center w-full"
        >
          {/* Subtle pink glow behind image */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(229,91,117,0.12) 0%, transparent 70%)',
              filter: 'blur(30px)',
              transform: 'scale(1.1)',
            }}
          />

          {/* Pink decorative frame */}
          <div
            className="absolute -inset-2 rounded-3xl pointer-events-none opacity-20"
            style={{ border: '1.5px solid #e55b75' }}
          />

          {/* The beautiful dark cake image */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden"
            style={{
              boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(229,91,117,0.15)',
            }}
          >
            <img
              src={getAssetPath('/hero_cake_dark.png')}
              alt="Handcrafted luxury cake by Sweet Slice Studio"
              className="w-full h-auto object-cover"
              style={{ display: 'block', minHeight: '420px', objectFit: 'cover' }}
            />

            {/* Bottom overlay badge */}
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-5"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)' }}
            >
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[3px] uppercase font-inter mb-1"
                    style={{ color: '#e55b75' }}>
                    ✦ Signature Collection
                  </p>
                  <p className="text-lg font-playfair font-bold text-white">
                    Handcrafted with Love
                  </p>
                </div>
                <Link to="/all-cakes">
                  <motion.button
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 rounded-full text-xs font-bold font-inter tracking-widest uppercase"
                    style={{ background: '#e55b75', color: '#ffffff' }}
                  >
                    Order Now
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
