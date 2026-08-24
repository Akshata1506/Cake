import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getAssetPath } from '../utils/assets';

export const SplitScreenReveal: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging]);

  // Add event listeners for mouse move and touch move when dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  // Ambient mouse track reveal when not dragging
  const handleContainerMouseMove = (e: React.MouseEvent) => {
    if (isDragging) return;
    // We can smoothly slide towards the hover coordinate if the user is just hovering near
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const hoverX = e.clientX - rect.left;
    const hoverPercent = (hoverX / rect.width) * 100;
    
    // Smooth transition using simple lerp or Framer Motion
    // For simplicity, we can let it drift towards it slightly to look interactive
    // but not jump violently, or just follow it directly for maximum responsiveness.
    // Let's do a soft follow if user hovers
    setSliderPosition(prev => prev + (hoverPercent - prev) * 0.12);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-cream-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Narrative Header */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[4px] text-xs font-bold font-inter">Before & After</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-chocolate mt-2">
            The Metamorphosis
          </h2>
          <p className="text-chocolate/60 font-inter max-w-lg mx-auto mt-4 text-sm sm:text-base">
            Drag or hover across the frame to witness raw organic elements transform into a handcrafted pastry masterpiece.
          </p>
        </div>

        {/* Visual Split Screen Frame */}
        <div 
          ref={containerRef}
          onMouseMove={handleContainerMouseMove}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          className="relative w-full max-w-4xl mx-auto h-[350px] sm:h-[450px] rounded-3xl overflow-hidden shadow-premium border border-chocolate/10 cursor-ew-resize select-none"
        >
          {/* Right Side: Finished Cake (Always underneath) */}
          <div className="absolute inset-0 w-full h-full bg-cream-dark">
            <img 
              src={getAssetPath("/cake_finished.png")} 
              alt="Finished Handcrafted Cake" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-chocolate/30 via-transparent to-transparent pointer-events-none" />
            
            {/* Label Right */}
            <div className="absolute right-8 bottom-8 text-right z-10 hidden sm:block">
              <span className="text-white/80 font-mono text-xs tracking-[4px] uppercase font-semibold">The Masterpiece</span>
              <h3 className="text-2xl font-playfair text-white font-bold mt-1">Finished Perfection</h3>
            </div>
          </div>

          {/* Left Side: Raw Ingredients (Clipped layer) */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <img 
              src={getAssetPath("/cake_raw_ingredients.png")} 
              alt="Raw Ingredients" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-chocolate/30 via-transparent to-transparent pointer-events-none" />

            {/* Label Left */}
            <div className="absolute left-8 bottom-8 text-left z-10 hidden sm:block">
              <span className="text-white/80 font-mono text-xs tracking-[4px] uppercase font-semibold">The Harvest</span>
              <h3 className="text-2xl font-playfair text-white font-bold mt-1">Raw Craftsmanship</h3>
            </div>
          </div>

          {/* Divider Line */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-light via-gold to-gold-dark z-20 pointer-events-none shadow-gold-glow"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Soft ripple glow on the dividing line */}
            <div className="absolute top-0 bottom-0 left-[-4px] right-[-4px] bg-white/20 blur-[2px]" />
          </div>

          {/* Glassmorphic Drag Handle Button */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-white/40 shadow-premium flex items-center justify-center z-30 select-none cursor-grab active:cursor-grabbing backdrop-blur-md"
            style={{ 
              left: `${sliderPosition}%`,
              background: 'rgba(255, 255, 255, 0.45)',
            }}
          >
            {/* Double arrows SVG */}
            <svg className="w-6 h-6 text-chocolate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-3 3m0 0l3 3m-3-3h14m-3-6l3 3m0 0l-3 3" />
            </svg>
          </div>

          {/* Centered Hint overlay (fades out as you drag) */}
          {sliderPosition === 50 && (
            <motion.div 
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-x-0 bottom-24 flex justify-center pointer-events-none z-10"
            >
              <div className="px-5 py-2 rounded-full glass-panel border border-white/30 text-chocolate text-xs tracking-widest font-mono uppercase shadow-sm">
                ← Drag to Reveal →
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};
export default SplitScreenReveal;
