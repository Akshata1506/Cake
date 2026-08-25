import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { Leaf, Award, Flame, Palette, Gift, Truck, X, Sparkles } from 'lucide-react';
import { getAssetPath } from '../utils/assets';

interface Step {
  icon: React.ReactNode;
  title: string;
  desc: string;
  chefQuote: string;
}

interface CarouselCake {
  id: number;
  title: string;
  price: string;
  image: string;
  tag: string;
}

const CAROUSEL_CAKES: CarouselCake[] = [
  { id: 1, title: "Royal Ivory Fondant", price: "₹5,000+", image: getAssetPath("/wedding_1.png"), tag: "Wedding Tier" },
  { id: 2, title: "Rose Pétale Meringue", price: "₹1,800", image: getAssetPath("/cake_featured_2.png"), tag: "Signature" },
  { id: 3, title: "L'Aura d'Or Truffle", price: "₹2,500", image: getAssetPath("/cake_featured_1.png"), tag: "Best Seller" },
  { id: 4, title: "Golden Drip Elegance", price: "₹4,500+", image: getAssetPath("/wedding_2.png"), tag: "Luxury Drip" },
  { id: 5, title: "Velours Pistache", price: "₹2,200", image: getAssetPath("/cake_featured_3.png"), tag: "Artisanal" },
];

const TIMELINE_STEPS: Step[] = [
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "1. Sourcing Premium Ingredients",
    desc: "We scan the globe for unparalleled elements: dark cocoa from Madagascar, vanilla beans from Tahiti, butter from Normandy, and local organic eggs. Quality is our absolute foundation.",
    chefQuote: "“Only when the source is pure can the result be transcendent.”"
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: "2. Precision Batter Blending",
    desc: "Ingredients are scaled to a tenth of a gram. We cream, sift, and blend at precise temperature ranges to trap micro-air bubbles, guaranteeing a crumb structure that is light yet moisture-dense.",
    chefQuote: "“Air and temperature are as critical as sugar and flour.”"
  },
  {
    icon: <Flame className="w-5 h-5" />,
    title: "3. Slow Stone-Hearth Baking",
    desc: "Cakes bake in custom copper stone-hearth ovens. Heat distributions are adjusted dynamically. We bake slowly, caramelizing natural sugars to lock in structural moisture.",
    chefQuote: "“Baking is a slow conversation between dough and fire.”"
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "4. Haute Decorating & Styling",
    desc: "Every swirl of strawberry cream is piped by hand. We crown the cake with edible gold sheets, chocolate curls, and hand-plucked micro-meringues. It is sculpture on a plate.",
    chefQuote: "“We do not decorate cakes; we sculpt memories.”"
  },
  {
    icon: <Gift className="w-5 h-5" />,
    title: "5. Luxury Box Packaging",
    desc: "Your cake is housed in a bespoke, insulated, rose-tinted case with a gold wax seal. Fitted with thermal grids, it maintains structural temperature stability for hours.",
    chefQuote: "“Unboxing is the first taste of luxury.”"
  },
  {
    icon: <Truck className="w-5 h-5" />,
    title: "6. White-Glove Courier Delivery",
    desc: "Dispatched in climate-controlled boutique vans. Our specialized couriers transport each pastry with delicate precision, delivering it directly to your banquet in immaculate shape.",
    chefQuote: "“The final step must be as flawless as the first.”"
  }
];

const inp = 'w-full border-b bg-transparent py-2 text-sm font-inter focus:outline-none transition-colors';
const lbl = 'block text-[10px] font-bold uppercase tracking-[2px] mb-1.5';
const BORDER  = 'rgba(0,0,0,0.18)';
const FOCUS   = '#e55b75';

export const Timeline: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCake, setSelectedCake] = useState<CarouselCake | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: ''
  });

  const progress = useMotionValue(0);

  useEffect(() => {
    let controls: any;

    const startLoop = () => {
      controls = animate(progress, 1, {
        duration: 18,
        ease: 'linear',
        onComplete: () => {
          progress.set(0);
          if (!isPaused) startLoop();
        },
      });
    };

    if (!isPaused) startLoop();

    return () => controls?.stop();
  }, [isPaused, progress]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const buildMsg = (cake: string, f: typeof formData) =>
    `*New Order from Process Showcase!* 🎂\n\n*Cake:* ${cake}\n\n*Customer Details:*\n👤 Name: ${f.name}\n📱 Phone: ${f.phone}\n📍 Address: ${f.address}\n📅 Date: ${f.date}\n⏰ Time: ${f.time}\n📝 Instructions: ${f.notes || 'None'}\n\nPlease confirm my order.`;

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCake) return;
    setSubmittedSummary({ cake: selectedCake.title, image: selectedCake.image, ...formData });
    window.open(`https://wa.me/919172633991?text=${encodeURIComponent(buildMsg(selectedCake.title, formData))}`, '_blank');
  };

  const closeModal = () => {
    setSelectedCake(null);
    setSubmittedSummary(null);
    setFormData({ name: '', phone: '', address: '', date: '', time: '', notes: '' });
  };

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 md:px-12 relative w-full overflow-hidden max-w-full" style={{ background: '#130f0c' }}>
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-[50%] w-[1px] hidden md:block" style={{ background: 'rgba(229,91,117,0.08)' }} />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-bold tracking-[4px] uppercase font-inter" style={{ color: '#e55b75' }}>
            The Heritage Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mt-2 text-white">
            The Journey of a Cake
          </h2>
          <p className="font-inter max-w-md mx-auto mt-4 text-xs sm:text-sm md:text-base px-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Behind every delicate mouthful lies a rigorous symphony of sourcing, baking, and handcrafting.
          </p>
        </div>

        {/* ── RESPONSIVE CAKE CAROUSEL GALLERY ── */}
        <div className="mb-16 md:mb-24 w-full overflow-hidden">
          <div className="text-center mb-4">
            <span className="text-xs font-bold tracking-[2px] uppercase font-inter" style={{ color: '#e55b75' }}>
              Pastry Progress Gallery
            </span>
          </div>

          {/* Desktop Version: 3D animated slider */}
          <div 
            className="hidden md:flex relative w-full h-[420px] items-center justify-center overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
              {CAROUSEL_CAKES.map((cake, index) => (
                <CarouselItem
                  key={cake.id}
                  cake={cake}
                  index={index}
                  total={CAROUSEL_CAKES.length}
                  globalProgress={progress}
                  onSelectCake={(cake) => { setSelectedCake(cake); setSubmittedSummary(null); }}
                />
              ))}
            </div>
          </div>

          {/* Mobile Version: Auto-scrolling marquee */}
          <div className="md:hidden overflow-hidden relative w-full py-2">
            <motion.div
              className="flex gap-4 px-2 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 20,
                repeat: Infinity,
              }}
            >
              {[...CAROUSEL_CAKES, ...CAROUSEL_CAKES].map((cake, idx) => (
                <div
                  key={`${cake.id}-${idx}`}
                  onClick={() => { setSelectedCake(cake); setSubmittedSummary(null); }}
                  className="shrink-0 w-[220px] sm:w-[240px] rounded-2xl p-4 border flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
                  style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(229,91,117,0.2)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                >
                  <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden relative mb-3">
                    <img src={cake.image} alt={cake.title} className="w-full h-full object-cover object-center" />
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded-full text-[9px] text-[#e55b75] font-bold uppercase tracking-wider shadow-sm">
                      {cake.tag}
                    </div>
                  </div>
                  <h3 className="font-playfair text-sm sm:text-base font-bold text-white text-center">{cake.title}</h3>
                  <p className="text-xs font-inter font-semibold text-[#e55b75] mt-1">{cake.price}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="text-center mt-4">
            <span className="text-[10px] font-mono tracking-[3px] uppercase animate-pulse" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Tap Cake to Order
            </span>
          </div>
        </div>

        {/* Steps Flow */}
        <div className="relative w-full">
          {TIMELINE_STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row items-center justify-between mb-12 sm:mb-16 md:mb-28 last:mb-0 relative w-full ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Dot for Desktop */}
                <div className="absolute top-0 md:top-[20px] left-[50%] -translate-x-1/2 z-20 hidden md:block">
                  <motion.div 
                    initial={{ scale: 0.8, backgroundColor: "#ffffff" }}
                    whileInView={{ 
                      scale: 1, 
                      backgroundColor: "#e55b75",
                      borderColor: "#000000" 
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-white shadow-premium"
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Left/Right Text Content Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full md:w-[45%] rounded-3xl p-6 sm:p-8 md:p-10 shadow-premium border relative hover:shadow-premium-hover transition-shadow duration-300"
                  style={{ borderColor: 'rgba(229,91,117,0.2)', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}
                >
                  <div className="flex items-center gap-3 md:hidden mb-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(229,91,117,0.12)', color: '#e55b75' }}>
                      {step.icon}
                    </div>
                    <span className="font-mono text-xs font-bold text-[#e55b75]">Step 0{idx + 1}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-playfair font-bold mb-3 text-white">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm font-inter leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {step.desc}
                  </p>

                  <div className="border-t pt-4 text-xs font-inter italic font-medium" style={{ color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.1)' }}>
                    {step.chefQuote}
                  </div>
                </motion.div>

                {/* Spacer to push opposite content block */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>

      </div>

      {/* ── SPLIT ORDER FORM MODAL WHEN CAKE IS CLICKED ── */}
      <AnimatePresence>
        {selectedCake && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}
          >
            <motion.div
              initial={{ scale: 0.93, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 24, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col md:flex-row relative"
              style={{ background: '#fff', boxShadow: '0 30px 80px rgba(0,0,0,0.25)', maxHeight: '90vh' }}
            >
              {/* Close */}
              <button onClick={closeModal}
                className="absolute top-3 right-3 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                style={{ background: '#1a1a1a', border: '2px solid rgba(229,91,117,0.3)' }}>
                <X className="w-5 h-5" style={{ color: '#e55b75' }} />
              </button>

              {/* ── LEFT: Cake Image ── */}
              <div className="md:w-2/5 relative overflow-hidden" style={{ minHeight: '260px' }}>
                <img
                  src={selectedCake.image}
                  alt={selectedCake.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[10px] font-bold tracking-[3px] uppercase font-inter" style={{ color: '#e55b75' }}>
                    ✦ Your Order
                  </span>
                  <h3 className="text-xl font-playfair font-bold text-white mt-1">{selectedCake.title}</h3>
                  <p className="text-sm font-bold font-inter mt-0.5" style={{ color: '#fff' }}>
                    {selectedCake.price}
                  </p>
                </div>
              </div>

              {/* ── RIGHT: Form / Receipt ── */}
              <div className="md:w-3/5 p-7 pt-14 overflow-y-auto" style={{ maxHeight: '90vh' }}>
                {submittedSummary ? (
                  /* Summary Receipt */
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                      style={{ background: '#dcfce7', color: '#166534' }}>
                      ✓ Request Sent to WhatsApp
                    </span>
                    <h3 className="text-xl font-playfair font-bold mb-1" style={{ color: '#000000' }}>Order Summary</h3>
                    <p className="text-xs font-inter mb-4" style={{ color: 'rgba(0,0,0,0.5)' }}>Check WhatsApp for pricing and confirmation.</p>

                    <div className="space-y-2.5 text-sm font-inter mb-5 p-4 rounded-xl"
                      style={{ background: '#fcfcfc', border: '1px solid rgba(229,91,117,0.15)' }}>
                      {[
                        ['Cake', submittedSummary.cake],
                        ['Name', submittedSummary.name],
                        ['Phone', submittedSummary.phone],
                        ['Address', submittedSummary.address],
                        ['Date & Time', `${submittedSummary.date} at ${submittedSummary.time}`],
                        ...(submittedSummary.notes ? [['Instructions', submittedSummary.notes]] : []),
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between border-b pb-2" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(0,0,0,0.45)' }}>{k}</span>
                          <span className="font-semibold text-right" style={{ color: '#000000' }}>{v}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => window.open(`https://wa.me/919172633991?text=${encodeURIComponent(buildMsg(submittedSummary.cake, submittedSummary))}`, '_blank')}
                        className="flex-1 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all hover:opacity-90"
                        style={{ background: '#25D366', color: '#fff' }}>
                        📱 Open WhatsApp
                      </button>
                      <button onClick={closeModal}
                        className="flex-1 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all"
                        style={{ background: '#000000', color: '#ffffff' }}>
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Form */
                  <form onSubmit={submitOrder} className="space-y-4">
                    <div className="mb-2">
                      <h3 className="text-xl font-playfair font-bold" style={{ color: '#000000' }}>Complete Your Order</h3>
                      <p className="text-xs font-inter mt-0.5" style={{ color: 'rgba(0,0,0,0.5)' }}>
                        Selected: <span className="font-bold" style={{ color: '#e55b75' }}>{selectedCake.title}</span>
                      </p>
                    </div>

                    {/* Name + Phone */}
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className={lbl} style={{ color: 'rgba(0,0,0,0.5)' }}>Name</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleInputChange}
                          className={inp} style={{ borderColor: BORDER, color: '#000000' }}
                          onFocus={e => (e.target.style.borderColor = FOCUS)} onBlur={e => (e.target.style.borderColor = BORDER)}
                          placeholder="Your full name" />
                      </div>
                      <div>
                        <label className={lbl} style={{ color: 'rgba(0,0,0,0.5)' }}>Phone</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                          className={inp} style={{ borderColor: BORDER, color: '#000000' }}
                          onFocus={e => (e.target.style.borderColor = FOCUS)} onBlur={e => (e.target.style.borderColor = BORDER)}
                          placeholder="Your phone number" />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className={lbl} style={{ color: 'rgba(0,0,0,0.5)' }}>Delivery Address</label>
                      <textarea required name="address" value={formData.address} onChange={handleInputChange}
                        className={inp + ' resize-none h-14'} style={{ borderColor: BORDER, color: '#000000' }}
                        onFocus={e => (e.target.style.borderColor = FOCUS)} onBlur={e => (e.target.style.borderColor = BORDER)}
                        placeholder="Full delivery address" />
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className={lbl} style={{ color: 'rgba(0,0,0,0.5)' }}>Date</label>
                        <input required type="date" name="date" value={formData.date} onChange={handleInputChange}
                          className={inp} style={{ borderColor: BORDER, color: '#000000' }}
                          onFocus={e => (e.target.style.borderColor = FOCUS)} onBlur={e => (e.target.style.borderColor = BORDER)} />
                      </div>
                      <div>
                        <label className={lbl} style={{ color: 'rgba(0,0,0,0.5)' }}>Time</label>
                        <input required type="time" name="time" value={formData.time} onChange={handleInputChange}
                          className={inp} style={{ borderColor: BORDER, color: '#000000' }}
                          onFocus={e => (e.target.style.borderColor = FOCUS)} onBlur={e => (e.target.style.borderColor = BORDER)} />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className={lbl} style={{ color: 'rgba(0,0,0,0.5)' }}>Instructions</label>
                      <textarea name="notes" value={formData.notes} onChange={handleInputChange}
                        className={inp + ' resize-none h-14'} style={{ borderColor: BORDER, color: '#000000' }}
                        onFocus={e => (e.target.style.borderColor = FOCUS)} onBlur={e => (e.target.style.borderColor = BORDER)}
                        placeholder="Special messages, design requests..." />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-1">
                      <button type="button" onClick={closeModal}
                        className="w-1/3 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all"
                        style={{ background: '#ffffff', color: '#000000', border: '1px solid rgba(0,0,0,0.15)' }}>
                        Back
                      </button>
                      <button type="submit"
                        className="w-2/3 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all hover:opacity-90"
                        style={{ background: '#000000', color: '#ffffff' }}>
                        Send via WhatsApp
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Carousel Sub-component (Desktop only)
const CarouselItem: React.FC<{
  cake: CarouselCake;
  index: number;
  total: number;
  globalProgress: any;
  onSelectCake: (cake: CarouselCake) => void;
}> = ({ cake, index, total, globalProgress, onSelectCake }) => {
  const [renderProps, setRenderProps] = useState({
    x: 0,
    scale: 0.7,
    opacity: 0,
    zIndex: 1
  });

  useEffect(() => {
    const updatePosition = () => {
      const p = globalProgress.get();
      const offsetP = ((p + (index / total)) % 1 + 1) % 1; 

      const xPercent = (0.5 - offsetP) * 150; 
      const distanceFromCenter = Math.abs(offsetP - 0.5) * 2; 

      const scale = Math.max(0.65, 1.15 - distanceFromCenter * 0.5);
      const opacity = offsetP < 0.05 || offsetP > 0.95 ? 0 : Math.max(0.3, 1 - Math.pow(distanceFromCenter, 2));
      const zIndex = Math.round((1 - distanceFromCenter) * 30) + 1;

      setRenderProps({ x: xPercent, scale, opacity, zIndex });
    };

    const unsubscribe = globalProgress.on("change", updatePosition);
    updatePosition(); 

    return () => unsubscribe();
  }, [globalProgress, index, total]);

  return (
    <motion.div
      onClick={() => onSelectCake(cake)}
      className="absolute cursor-pointer select-none group"
      style={{
        left: '50%',
        x: `${renderProps.x}vw`,
        scale: renderProps.scale,
        opacity: renderProps.opacity,
        zIndex: renderProps.zIndex,
      }}
      whileHover={{ scale: renderProps.scale * 1.08 }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3 + index % 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.4
        }}
        className="relative flex flex-col items-center"
      >
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-xl border-2 border-white/60 bg-cream-dark transition-all duration-300 group-hover:border-[#e55b75] group-hover:shadow-gold-glow">
          <img 
            src={cake.image} 
            alt={cake.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] text-[#e55b75] font-bold tracking-wider uppercase flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3" />
            {cake.tag}
          </div>
        </div>

        <div className="w-36 h-4 bg-black/5 rounded-full filter blur-md mt-3 transition-all duration-300 group-hover:bg-[#e55b75]/20 group-hover:w-44" />

        <motion.div className="mt-3 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/10 shadow-md text-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
          <div className="text-xs font-playfair font-bold tracking-wide">{cake.title}</div>
          <div className="text-[10px] font-mono text-[#e55b75] group-hover:text-white font-semibold">{cake.price}</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Timeline;
