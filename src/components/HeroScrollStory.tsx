import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

// Ingredients vector data for SVG renders
const EggSVG = () => (
  <svg className="w-20 h-20 filter drop-shadow-md" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="eggGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFDF7" />
        <stop offset="70%" stopColor="#FFF2D6" />
        <stop offset="100%" stopColor="#FAD390" />
      </linearGradient>
    </defs>
    <path d="M50 10C25 10 10 45 10 75C10 99.8 27.9 110 50 110C72.1 110 90 99.8 90 75C90 45 75 10 50 10Z" fill="url(#eggGrad)" />
    <path d="M45 40C45 35 48 30 52 30" stroke="#FFF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const FlourSVG = () => (
  <svg className="w-24 h-24 filter drop-shadow-md" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="flourGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FAF8F5" />
        <stop offset="100%" stopColor="#E6DEC9" />
      </linearGradient>
    </defs>
    <path d="M25 35 L95 35 L105 110 L15 110 Z" fill="url(#flourGrad)" rx="10" />
    <path d="M25 35 C25 25 35 20 60 20 C85 20 95 25 95 35" stroke="#C5A059" strokeWidth="4" fill="none" />
    <rect x="35" y="55" width="50" height="35" rx="4" fill="#FAF6F0" stroke="#C5A059" strokeWidth="2" />
    <text x="60" y="78" fill="#2C1A17" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">FLOUR</text>
  </svg>
);

const ButterSVG = () => (
  <svg className="w-24 h-20 filter drop-shadow-md" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="butterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF9DB" />
        <stop offset="60%" stopColor="#FFF3B0" />
        <stop offset="100%" stopColor="#FFD43B" />
      </linearGradient>
    </defs>
    <path d="M10 80 L110 80 L100 90 L20 90 Z" fill="#EFEAE2" stroke="#2C1A17" strokeWidth="2" />
    <rect x="25" y="30" width="70" height="45" rx="6" fill="url(#butterGrad)" stroke="#E5C478" strokeWidth="2" />
    <path d="M25 40 H95" stroke="#FFF" strokeWidth="3" opacity="0.5" />
    <path d="M40 30 V75 M60 30 V75 M80 30 V75" stroke="#E5C478" strokeWidth="1.5" strokeDasharray="3 3" />
  </svg>
);

const ChocolateSVG = () => (
  <svg className="w-20 h-20 filter drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="chocoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5C3E35" />
        <stop offset="100%" stopColor="#2C1A17" />
      </linearGradient>
    </defs>
    <rect x="15" y="15" width="70" height="70" rx="8" fill="url(#chocoGrad)" />
    <rect x="23" y="23" width="22" height="22" rx="3" fill="#422922" stroke="#2C1A17" strokeWidth="2" />
    <rect x="55" y="23" width="22" height="22" rx="3" fill="#422922" stroke="#2C1A17" strokeWidth="2" />
    <rect x="23" y="55" width="22" height="22" rx="3" fill="#422922" stroke="#2C1A17" strokeWidth="2" />
    <rect x="55" y="55" width="22" height="22" rx="3" fill="#422922" stroke="#2C1A17" strokeWidth="2" />
  </svg>
);

const SugarSVG = () => (
  <svg className="w-20 h-20 filter drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sugarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E2F1F3" />
      </linearGradient>
    </defs>
    <rect x="15" y="45" width="35" height="35" rx="4" fill="url(#sugarGrad)" stroke="#C5A059" strokeWidth="2" />
    <rect x="45" y="35" width="35" height="35" rx="4" fill="url(#sugarGrad)" stroke="#C5A059" strokeWidth="2" />
    <rect x="30" y="15" width="35" height="35" rx="4" fill="url(#sugarGrad)" stroke="#C5A059" strokeWidth="2" />
  </svg>
);

const StoryChapterOverlay = ({ index, scrollYProgress, chapter }: { index: number, scrollYProgress: any, chapter: any }) => {
  const start = index * (1 / 6);
  const end = (index + 1) * (1 / 6);
  
  const start1 = start;
  const start2 = start + 0.02;
  const end1 = end - 0.02;
  const end2 = end;

  const opacity = useTransform(
    scrollYProgress,
    [start1, start2, end1, end2],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    scrollYProgress,
    [start1, start2, end1, end2],
    [20, 0, 0, -20]
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center"
      style={{ opacity, y }}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair text-chocolate font-bold mb-1">
        {chapter.title}
      </h2>
      <p className="text-xs sm:text-sm text-chocolate/70 font-inter max-w-md">
        {chapter.desc}
      </p>
    </motion.div>
  );
};

const TimelineDot = ({ index, scrollYProgress }: { index: number, scrollYProgress: any }) => {
  const startDot = index * 0.15;
  const start1 = Math.max(0, startDot - 0.05);
  const start2 = Math.max(0.001, startDot);
  const bgStart = Math.max(0, startDot - 0.01);
  const bgEnd = Math.max(0.001, startDot);

  const scale = useTransform(scrollYProgress, [start1, start2, startDot + 0.1], [0.8, 1.3, 1]);
  const backgroundColor = useTransform(
    scrollYProgress, 
    [bgStart, bgEnd], 
    ["#FAF6F0", "#C5A059"]
  );
  const borderColor = useTransform(
    scrollYProgress, 
    [bgStart, bgEnd], 
    ["rgba(44, 26, 23, 0.2)", "#2C1A17"]
  );

  return (
    <div className="relative z-10 flex flex-col items-center">
      <motion.div
        style={{ scale, backgroundColor, borderColor }}
        className="w-4 h-4 rounded-full border-2 transition-colors duration-200 cursor-pointer flex items-center justify-center"
      />
      <span className="text-[8px] text-chocolate/50 font-mono tracking-wider mt-1 absolute top-5 font-semibold whitespace-nowrap">
        0{index + 1}
      </span>
    </div>
  );
};

export const HeroScrollStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const progress = useMotionValue(0);

  useEffect(() => {
    let controls: any;
    if (isInView) {
      progress.set(0); // Reset to Step 01 every time section comes into view
      controls = animate(progress, 1, {
        duration: 30, // 30 seconds for full story cycle
        ease: "linear",
        repeat: Infinity
      });
    } else {
      progress.set(0);
    }
    return () => controls?.stop();
  }, [isInView, progress]);

  const scrollYProgress = progress;

  // 1. Ingredients Animations (Progress: 0% to 30%)
  const eggX = useTransform(scrollYProgress, [0, 0.12, 0.25], [-250, -150, 0]);
  const eggY = useTransform(scrollYProgress, [0, 0.12, 0.25], [-100, -50, 250]);
  const eggRotate = useTransform(scrollYProgress, [0, 0.25], [15, 360]);
  const eggScale = useTransform(scrollYProgress, [0.2, 0.28], [1, 0]);
  const eggOpacity = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.28], [0, 1, 1, 0]);

  const flourX = useTransform(scrollYProgress, [0, 0.12, 0.25], [250, 150, 0]);
  const flourY = useTransform(scrollYProgress, [0, 0.12, 0.25], [-120, -60, 250]);
  const flourRotate = useTransform(scrollYProgress, [0, 0.25], [-20, -180]);
  const flourScale = useTransform(scrollYProgress, [0.2, 0.28], [1, 0]);
  const flourOpacity = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.28], [0, 1, 1, 0]);

  const sugarX = useTransform(scrollYProgress, [0, 0.12, 0.25], [-350, -200, 0]);
  const sugarY = useTransform(scrollYProgress, [0, 0.12, 0.25], [150, 100, 250]);
  const sugarRotate = useTransform(scrollYProgress, [0, 0.25], [-45, 180]);
  const sugarScale = useTransform(scrollYProgress, [0.2, 0.28], [1, 0]);
  const sugarOpacity = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.28], [0, 1, 1, 0]);

  const butterX = useTransform(scrollYProgress, [0, 0.12, 0.25], [350, 200, 0]);
  const butterY = useTransform(scrollYProgress, [0, 0.12, 0.25], [180, 120, 250]);
  const butterRotate = useTransform(scrollYProgress, [0, 0.25], [30, -90]);
  const butterScale = useTransform(scrollYProgress, [0.2, 0.28], [1, 0]);
  const butterOpacity = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.28], [0, 1, 1, 0]);

  const chocoX = useTransform(scrollYProgress, [0, 0.12, 0.25], [0, 0, 0]);
  const chocoY = useTransform(scrollYProgress, [0, 0.12, 0.25], [-250, -180, 250]);
  const chocoRotate = useTransform(scrollYProgress, [0, 0.25], [-15, 270]);
  const chocoScale = useTransform(scrollYProgress, [0.2, 0.28], [1, 0]);
  const chocoOpacity = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.28], [0, 1, 1, 0]);

  // 2. Mixing Bowl & Blending Animations (Progress: 20% to 45%)
  const bowlOpacity = useTransform(scrollYProgress, [0.18, 0.24, 0.42, 0.46], [0, 1, 1, 0]);
  const bowlScale = useTransform(scrollYProgress, [0.18, 0.24, 0.42, 0.46], [0.8, 1, 1, 0.7]);
  const bowlY = useTransform(scrollYProgress, [0.18, 0.46], [0, -30]);

  // Rotating Whisk
  const whiskOpacity = useTransform(scrollYProgress, [0.26, 0.3, 0.4, 0.44], [0, 1, 1, 0]);
  const whiskRotate = useTransform(scrollYProgress, [0.28, 0.42], [0, 1080]);
  const whiskY = useTransform(scrollYProgress, [0.26, 0.3, 0.4, 0.44], [-100, 30, 30, -100]);

  // Splashing/Blending gooey batter visual
  const batterOpacity = useTransform(scrollYProgress, [0.28, 0.32, 0.42, 0.45], [0, 1, 1, 0]);
  const batterScale = useTransform(scrollYProgress, [0.28, 0.32, 0.42], [0.3, 1, 0.9]);
  const batterRotate = useTransform(scrollYProgress, [0.28, 0.42], [0, 360]);

  // 3. Oven Baking & Rising (Progress: 44% to 65%)
  const ovenOpacity = useTransform(scrollYProgress, [0.44, 0.48, 0.62, 0.65], [0, 1, 1, 0]);
  const ovenScale = useTransform(scrollYProgress, [0.44, 0.48, 0.62, 0.65], [0.8, 1, 1, 0.8]);
  const ovenGlow = useTransform(
    scrollYProgress,
    [0.48, 0.52, 0.58, 0.62],
    [
      "rgba(197, 160, 89, 0)",
      "rgba(197, 160, 89, 0.4)",
      "rgba(197, 160, 89, 0.6)",
      "rgba(197, 160, 89, 0)"
    ]
  );
  
  // Baking tin inside oven
  const tinOpacity = useTransform(scrollYProgress, [0.46, 0.49, 0.62, 0.65], [0, 1, 1, 0]);
  const riseScaleY = useTransform(scrollYProgress, [0.49, 0.58], [0.3, 1.1]);
  const riseScaleX = useTransform(scrollYProgress, [0.49, 0.58], [0.85, 1.05]);
  const smokeOpacity = useTransform(scrollYProgress, [0.52, 0.56, 0.6], [0, 0.8, 0]);

  // 4. Premium Cake Reveal & Frosting/Decorating (Progress: 63% to 80%)
  const cakeOpacity = useTransform(scrollYProgress, [0.63, 0.67, 0.82, 0.85], [0, 1, 1, 0]);
  const cakeScale = useTransform(scrollYProgress, [0.63, 0.67, 0.82, 0.85], [0.7, 1, 1, 0.7]);
  const cakeY = useTransform(scrollYProgress, [0.63, 0.82, 0.85], [100, 0, -250]);

  const creamDraw = useTransform(scrollYProgress, [0.67, 0.74], [0, 1]);
  const nozzleOpacity = useTransform(scrollYProgress, [0.66, 0.68, 0.73, 0.75], [0, 1, 1, 0]);
  const nozzleX = useTransform(scrollYProgress, [0.67, 0.74], [-120, 120]);
  const nozzleY = useTransform(
    scrollYProgress,
    [0.67, 0.69, 0.71, 0.73, 0.74],
    [-110, -120, -110, -125, -110]
  );

  const sprinklesOpacity = useTransform(scrollYProgress, [0.72, 0.74, 0.79], [0, 1, 0]);
  const sprinkleY1 = useTransform(scrollYProgress, [0.72, 0.77], [-150, -40]);
  const sprinkleY2 = useTransform(scrollYProgress, [0.73, 0.78], [-170, -35]);
  const sprinkleY3 = useTransform(scrollYProgress, [0.71, 0.76], [-130, -45]);
  const sprinkleY4 = useTransform(scrollYProgress, [0.74, 0.79], [-160, -30]);

  // 5. Luxury Box Packaging (Progress: 78% to 92%)
  const boxContainerOpacity = useTransform(scrollYProgress, [0.78, 0.82, 0.92, 0.94], [0, 1, 1, 0]);
  const boxContainerScale = useTransform(scrollYProgress, [0.78, 0.82, 0.92, 0.94], [0.8, 1, 1, 0.8]);
  const boxContainerY = useTransform(scrollYProgress, [0.78, 0.92, 0.94], [100, 0, -100]);

  const lidY = useTransform(scrollYProgress, [0.83, 0.88], [-250, -38]);
  const bowScale = useTransform(scrollYProgress, [0.87, 0.9], [0, 1]);

  // 6. Delivery Animation (Progress: 90% to 100%)
  const deliveryOpacity = useTransform(scrollYProgress, [0.9, 0.93, 0.99, 1.0], [0, 1, 1, 0]);
  const deliveryX = useTransform(scrollYProgress, [0.91, 0.99], [600, -600]);
  const deliveryScale = useTransform(scrollYProgress, [0.9, 0.98], [0.8, 1.1]);

  const storyChapters = [
    { title: "Pure Ingredients Sourced", desc: "Organic farm eggs, French butter, gourmet dark chocolate, and unrefined sugars, floating in perfect harmony." },
    { title: "Gently Blended & Whipped", desc: "Whisked into a luxurious, smooth batter. The micro-textures and consistency are balanced by hand." },
    { title: "Baked in Golden Light", desc: "Rising to a flawless height inside our copper ovens. The air is rich with sweet caramelized notes." },
    { title: "Artisanal Decorating", desc: "Frosted with velvety strawberry creme and finished with delicate gold flakes and sugar droplets." },
    { title: "The Luxury Unboxing", desc: "Placed with care into our signature pastel rose presentation case, locked with a hand-tied gold ribbon." },
    { title: "Delivered to Your Doorstep", desc: "Dispatched instantly by our white-glove couriers to arrive fresh, cool, and stunningly intact." }
  ];

  return (
    <div ref={containerRef} className="relative w-full h-screen min-h-[700px] bg-cream overflow-hidden">
      <div className="absolute inset-0 w-full h-full flex flex-col justify-between items-center py-12 px-6">
        
        {/* Top Header - Narrative */}
        <div className="z-20 text-center max-w-xl px-4 mt-8">
          <motion.div
            style={{
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#C5A059'
            }}
          >
            The Journey of Sweet Artistry
          </motion.div>
          
          <div className="relative h-40 mt-2">
            {storyChapters.map((chapter, index) => (
              <StoryChapterOverlay key={index} index={index} scrollYProgress={scrollYProgress} chapter={chapter} />
            ))}
          </div>
        </div>

        {/* Central Stage */}
        <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none">
          
          {/* SVG Gooey Filter for Blending Liquid Effect */}
          <svg className="hidden">
            <defs>
              <filter id="gooey-filter">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>

          {/* STAGE 1: Floating Ingredients (Progress: 0% to 30%) */}
          <div className="absolute w-[600px] h-[400px] flex justify-center items-center">
            
            <motion.div
              style={{ x: eggX, y: eggY, rotate: eggRotate, scale: eggScale, opacity: eggOpacity }}
              className="absolute left-[8%] top-[15%]"
            >
              <motion.div
                animate={{ y: [0, -12] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                <EggSVG />
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: flourX, y: flourY, rotate: flourRotate, scale: flourScale, opacity: flourOpacity }}
              className="absolute right-[8%] top-[10%]"
            >
              <motion.div
                animate={{ y: [0, -15] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
              >
                <FlourSVG />
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: sugarX, y: sugarY, rotate: sugarRotate, scale: sugarScale, opacity: sugarOpacity }}
              className="absolute left-[5%] bottom-[15%]"
            >
              <motion.div
                animate={{ y: [0, -10] }}
                transition={{ duration: 1.75, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
              >
                <SugarSVG />
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: butterX, y: butterY, rotate: butterRotate, scale: butterScale, opacity: butterOpacity }}
              className="absolute right-[5%] bottom-[15%]"
            >
              <motion.div
                animate={{ y: [0, -8] }}
                transition={{ duration: 2.25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1.5 }}
              >
                <ButterSVG />
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: chocoX, y: chocoY, rotate: chocoRotate, scale: chocoScale, opacity: chocoOpacity }}
              className="absolute top-[5%]"
            >
              <motion.div
                animate={{ y: [0, -12] }}
                transition={{ duration: 2.1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.2 }}
              >
                <ChocolateSVG />
              </motion.div>
            </motion.div>

          </div>

          {/* STAGE 2: Mixing Bowl & Liquid Blending (Progress: 20% to 46%) */}
          <motion.div
            style={{ opacity: bowlOpacity, scale: bowlScale, y: bowlY }}
            className="absolute flex flex-col justify-center items-center w-[300px] h-[300px]"
          >
            {/* The Ceramic Mixing Bowl */}
            <svg className="w-80 h-80 z-10" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="100" cy="85" rx="75" ry="25" fill="#EFEAE2" stroke="#2C1A17" strokeWidth="2.5" />
              
              <g className="gooey" opacity="0.95">
                <motion.ellipse
                  style={{ scale: batterScale, rotate: batterRotate, opacity: batterOpacity }}
                  cx="100" cy="85" rx="70" ry="22" 
                  fill="#FFF2D6" 
                />
                <motion.circle cx="75" cy="80" r="12" fill="#E6DEC9" style={{ opacity: batterOpacity }} />
                <motion.circle cx="120" cy="88" r="10" fill="#FFEC99" style={{ opacity: batterOpacity }} />
                <motion.circle cx="100" cy="92" r="14" fill="#D2B48C" style={{ opacity: batterOpacity }} />
              </g>

              <path d="M25 85 C25 145 175 145 175 85" fill="#FAF6F0" stroke="#2C1A17" strokeWidth="3" />
              <path d="M25 85 C25 90 175 90 175 85" fill="#FAF6F0" stroke="#2C1A17" strokeWidth="2" />
              <path d="M30 87 C40 100 160 100 170 87" fill="none" stroke="#C5A059" strokeWidth="1.5" opacity="0.6" />
            </svg>

            <motion.div
              style={{ opacity: whiskOpacity, rotate: whiskRotate, y: whiskY }}
              className="absolute z-20 top-[-80px]"
            >
              <svg className="w-16 h-48" viewBox="0 0 50 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="22" y="10" width="6" height="50" rx="3" fill="#C5A059" stroke="#2C1A17" strokeWidth="2" />
                <path d="M25 60 C10 85 10 120 25 130 C40 120 40 85 25 60" stroke="#2C1A17" strokeWidth="2" fill="none" />
                <path d="M25 60 C18 85 18 120 25 130 C32 120 32 85 25 60" stroke="#2C1A17" strokeWidth="1.5" fill="none" opacity="0.8" />
                <circle cx="25" cy="130" r="3" fill="#2C1A17" />
              </svg>
            </motion.div>
          </motion.div>

          {/* STAGE 3: Oven Baking (Progress: 44% to 65%) */}
          <motion.div
            style={{ opacity: ovenOpacity, scale: ovenScale }}
            className="absolute flex justify-center items-center w-[350px] h-[350px]"
          >
            <motion.div 
              style={{ backgroundColor: ovenGlow }}
              className="absolute inset-0 rounded-3xl filter blur-xl transition-all duration-300"
            />

            <div className="relative w-80 h-80 glass-panel rounded-3xl border-2 border-chocolate/20 flex flex-col justify-between p-4 shadow-premium">
              <div className="w-full h-10 border-b border-chocolate/10 flex justify-between items-center px-2">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                  <div className="w-2.5 h-2.5 rounded-full bg-chocolate/30" />
                </div>
                <div className="text-[10px] text-chocolate/60 font-mono tracking-wider">180°C - BAKING</div>
              </div>

              <div className="relative flex-1 flex justify-center items-center">
                <motion.div 
                  style={{ opacity: smokeOpacity }}
                  className="absolute top-4 flex gap-4 text-chocolate/20"
                >
                  <svg className="w-4 h-12 animate-bounce" viewBox="0 0 10 30">
                    <path d="M5 30 C8 20 2 10 5 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                  <svg className="w-4 h-12 animate-bounce" style={{ animationDelay: '0.2s' }} viewBox="0 0 10 30">
                    <path d="M5 30 C2 20 8 10 5 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                </motion.div>

                <motion.div style={{ opacity: tinOpacity }} className="relative mt-8 flex flex-col justify-end items-center">
                  <motion.div
                    style={{ scaleY: riseScaleY, scaleX: riseScaleX }}
                    className="w-40 h-20 bg-gradient-to-t from-gold-dark via-gold to-[#FFE2A4] rounded-t-xl origin-bottom border border-chocolate/10 shadow-inner"
                  >
                    <div className="absolute top-2 left-6 right-6 h-4 bg-[#FFE2A4]/40 rounded-full blur-xs" />
                  </motion.div>

                  <div className="w-44 h-14 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500 border-2 border-chocolate/40 rounded-b-xl relative z-10 shadow-md">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-slate-200" />
                    <div className="absolute inset-y-2 inset-x-4 bg-slate-600/10 rounded" />
                  </div>
                </motion.div>
              </div>
              
              <div className="w-full h-4 border-t border-chocolate/10 flex justify-center pt-2">
                <div className="w-32 h-2 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full border border-chocolate/30" />
              </div>
            </div>
          </motion.div>

          {/* STAGE 4: Cake Reveal & Frosting/Sprinkles (Progress: 63% to 82%) */}
          <motion.div
            style={{ opacity: cakeOpacity, scale: cakeScale, y: cakeY }}
            className="absolute flex flex-col justify-center items-center w-[400px] h-[400px]"
          >
            <div className="relative flex flex-col justify-end items-center">
              <motion.div
                style={{ opacity: nozzleOpacity, x: nozzleX, y: nozzleY }}
                className="absolute z-30"
              >
                <svg className="w-16 h-28" viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 5 H45 L27 80 L23 80 Z" fill="#FAD0C4" stroke="#2C1A17" strokeWidth="2.5" />
                  <rect x="22" y="80" width="6" height="10" fill="#EFEAE2" stroke="#2C1A17" strokeWidth="1.5" />
                  <path d="M25 90 C22 92 28 92 25 98" stroke="#2C1A17" strokeWidth="1.5" />
                  <circle cx="25" cy="12" r="4" fill="#C5A059" />
                  <circle cx="25" cy="93" r="5" fill="#FFF" className="animate-pulse" />
                </svg>
              </motion.div>

              <motion.svg
                style={{ scaleX: creamDraw }}
                className="absolute z-20 top-[-10px] w-48 h-12"
                viewBox="0 0 200 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="creamGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#FFF0F2" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 35 C30 15 50 15 70 35 C90 15 110 15 130 35 C150 15 170 15 190 35 C200 45 200 50 190 50 L10 50 Z"
                  fill="url(#creamGrad)"
                  stroke="#2C1A17"
                  strokeWidth="2.5"
                />
                <circle cx="40" cy="28" r="4" fill="#FFC0CB" />
                <circle cx="100" cy="28" r="4" fill="#FFC0CB" />
                <circle cx="160" cy="28" r="4" fill="#FFC0CB" />
              </motion.svg>

              <div className="w-56 h-24 bg-gradient-to-b from-[#D4A373] to-[#A67C52] border-2 border-chocolate rounded-xl relative shadow-lg flex flex-col justify-between overflow-hidden">
                <div className="w-full h-3 bg-[#FFE2A4]/40" />
                <div className="w-full h-4 bg-white border-y border-chocolate/10 flex justify-around items-center">
                  <div className="w-4 h-1 bg-red-300 rounded-full" />
                  <div className="w-6 h-1.5 bg-red-300 rounded-full" />
                  <div className="w-4 h-1 bg-red-300 rounded-full" />
                  <div className="w-5 h-1.5 bg-red-300 rounded-full" />
                </div>
                <div className="w-full h-4 bg-chocolate/10" />
              </div>

              <div className="w-64 h-4 bg-gradient-to-r from-gold-light via-gold to-gold-dark border-2 border-chocolate rounded-full mt-1 relative z-10 shadow-md">
                <div className="absolute inset-x-6 top-0.5 h-1 bg-white/40 rounded-full" />
              </div>

              <motion.div style={{ opacity: sprinklesOpacity }} className="absolute inset-0 pointer-events-none z-30">
                <motion.div style={{ y: sprinkleY1 }} className="absolute left-[30%] w-1.5 h-4 bg-[#FFC0CB] rounded-full rotate-45" />
                <motion.div style={{ y: sprinkleY2 }} className="absolute left-[45%] w-1.5 h-4 bg-[#C5A059] rounded-full -rotate-12" />
                <motion.div style={{ y: sprinkleY3 }} className="absolute left-[60%] w-1.5 h-4 bg-[#90CAF9] rounded-full rotate-30" />
                <motion.div style={{ y: sprinkleY4 }} className="absolute left-[70%] w-1.5 h-4 bg-[#A5D6A7] rounded-full -rotate-45" />
              </motion.div>
            </div>
          </motion.div>

          {/* STAGE 5: Luxury Gift Box (Progress: 78% to 94%) */}
          <motion.div
            style={{ opacity: boxContainerOpacity, scale: boxContainerScale, y: boxContainerY }}
            className="absolute flex flex-col justify-center items-center w-[400px] h-[400px]"
          >
            <div className="relative w-72 h-72 flex flex-col justify-end items-center">
              <div className="w-60 h-32 bg-rose border-2 border-chocolate rounded-b-xl relative z-10 shadow-premium flex items-center justify-center">
                <div className="px-4 py-1.5 border border-gold rounded bg-white text-center shadow-sm">
                  <div className="text-[7px] tracking-[4px] uppercase text-gold font-bold">L'ANTIGRAVITÉ</div>
                  <div className="text-[5px] tracking-[2px] uppercase text-chocolate/50">HAUTE PÂTISSERIE</div>
                </div>
                <div className="absolute top-0 bottom-0 left-[47%] w-7 bg-gold border-x-2 border-chocolate z-[-1]" />
              </div>

              <motion.div
                style={{ y: lidY }}
                className="absolute left-4 right-4 z-20 h-16 bg-rose-dark border-2 border-chocolate rounded-t-xl shadow-md flex justify-center"
              >
                <div className="absolute top-0 bottom-0 left-[45%] w-7 bg-gold border-x-2 border-chocolate" />
                <motion.div
                  style={{ scale: bowScale }}
                  className="absolute top-[-30px] flex justify-center items-center"
                >
                  <svg className="w-16 h-10" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 35 C20 15 10 25 50 35" fill="#C5A059" stroke="#2C1A17" strokeWidth="2.5" />
                    <path d="M50 35 C80 15 90 25 50 35" fill="#C5A059" stroke="#2C1A17" strokeWidth="2.5" />
                    <rect x="42" y="27" width="16" height="16" rx="4" fill="#C5A059" stroke="#2C1A17" strokeWidth="2.5" />
                    <path d="M44 42 L25 55 L35 42 Z" fill="#C5A059" stroke="#2C1A17" strokeWidth="2" />
                    <path d="M56 42 L75 55 L65 42 Z" fill="#C5A059" stroke="#2C1A17" strokeWidth="2" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* STAGE 6: Scooter Delivery (Progress: 90% to 100%) */}
          <motion.div
            style={{ opacity: deliveryOpacity, x: deliveryX, scale: deliveryScale }}
            className="absolute flex justify-center items-center w-[450px] h-[350px]"
          >
            <div className="relative w-96 h-64 flex items-end">
              <svg className="w-full h-full" viewBox="0 0 350 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="20" y1="210" x2="330" y2="210" stroke="#2C1A17" strokeWidth="3" strokeLinecap="round" />
                <circle cx="95" cy="180" r="30" fill="#FAF6F0" stroke="#2C1A17" strokeWidth="4" />
                <circle cx="95" cy="180" r="14" fill="#EFEAE2" stroke="#2C1A17" strokeWidth="2" />
                <circle cx="255" cy="180" r="30" fill="#FAF6F0" stroke="#2C1A17" strokeWidth="4" />
                <circle cx="255" cy="180" r="14" fill="#EFEAE2" stroke="#2C1A17" strokeWidth="2" />
                <path d="M95 180 C95 130 160 130 190 150 L255 180" stroke="#2C1A17" strokeWidth="4" fill="none" />
                <path d="M70 170 C70 145 120 145 120 180" stroke="#2C1A17" strokeWidth="3" fill="#FFF0F2" />
                <path d="M230 180 C230 145 280 145 280 180" stroke="#2C1A17" strokeWidth="3" fill="#FFF0F2" />
                <path d="M190 150 L210 100 L200 90 L220 90" stroke="#2C1A17" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M210 100 L215 75 L200 70 L230 70" stroke="#2C1A17" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="215" cy="75" r="8" fill="#FFF" stroke="#2C1A17" strokeWidth="2" />
                <path d="M115 135 C115 125 180 125 180 135 Z" fill="#2C1A17" stroke="#2C1A17" strokeWidth="2" />
                <rect x="65" y="90" width="45" height="40" rx="4" fill="#FAF6F0" stroke="#2C1A17" strokeWidth="3" />
                <rect x="85" y="90" width="6" height="40" fill="#C5A059" />
                <path d="M40 120 H10" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                <path d="M30 140 H5" stroke="#C5A059" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                <path d="M45 160 H15" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Bottom Progress Bar & Indicator */}
        <div className="z-20 w-full max-w-lg px-6 flex flex-col items-center gap-4 mb-4">
          <div className="flex justify-between w-full relative">
            <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-chocolate/10 z-0" />
            <motion.div 
              style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              className="absolute top-[50%] left-0 h-[2px] bg-gold z-1" 
            />
            {storyChapters.map((_, index) => (
              <TimelineDot key={index} index={index} scrollYProgress={scrollYProgress} />
            ))}
          </div>

          <div className="flex flex-col items-center mt-6">
            <span className="text-[10px] text-chocolate/40 font-mono tracking-[4px] uppercase animate-pulse">
              Sweet Artistry in Motion
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
export default HeroScrollStory;

