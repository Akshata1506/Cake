import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ── Inline SVG Bakery Doodles ── */
const DoodleCupcake = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="45" rx="18" ry="10" fill="#d4a373" opacity="0.3"/>
    <rect x="14" y="42" width="32" height="16" rx="4" fill="#d4a373" opacity="0.35"/>
    <path d="M18 42 Q30 20 42 42" fill="#e0c9b8" opacity="0.4"/>
    <circle cx="30" cy="24" r="5" fill="#d4a373" opacity="0.4"/>
    <circle cx="22" cy="28" r="3" fill="#b8834a" opacity="0.3"/>
    <circle cx="38" cy="28" r="3" fill="#b8834a" opacity="0.3"/>
  </svg>
);

const DoodleCookie = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="22" fill="#d4a373" opacity="0.25" stroke="#b8834a" strokeWidth="1.5" strokeOpacity="0.3"/>
    <circle cx="22" cy="24" r="3" fill="#3d2314" opacity="0.2"/>
    <circle cx="35" cy="20" r="2.5" fill="#3d2314" opacity="0.2"/>
    <circle cx="26" cy="35" r="2.5" fill="#3d2314" opacity="0.2"/>
    <circle cx="38" cy="33" r="3" fill="#3d2314" opacity="0.2"/>
    <circle cx="30" cy="27" r="2" fill="#3d2314" opacity="0.15"/>
  </svg>
);

const DoodleWheat = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="75" x2="20" y2="10" stroke="#d4a373" strokeWidth="1.5" strokeOpacity="0.4"/>
    <ellipse cx="20" cy="10" rx="5" ry="8" fill="#d4a373" opacity="0.35"/>
    <ellipse cx="13" cy="22" rx="5" ry="7" fill="#d4a373" opacity="0.3" transform="rotate(-25 13 22)"/>
    <ellipse cx="27" cy="22" rx="5" ry="7" fill="#d4a373" opacity="0.3" transform="rotate(25 27 22)"/>
    <ellipse cx="11" cy="36" rx="5" ry="7" fill="#d4a373" opacity="0.25" transform="rotate(-20 11 36)"/>
    <ellipse cx="29" cy="36" rx="5" ry="7" fill="#d4a373" opacity="0.25" transform="rotate(20 29 36)"/>
  </svg>
);

const DoodleBerry = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="35" r="10" fill="#d4a373" opacity="0.3"/>
    <circle cx="35" cy="28" r="12" fill="#b8834a" opacity="0.25"/>
    <circle cx="50" cy="35" r="10" fill="#d4a373" opacity="0.3"/>
    <line x1="20" y1="25" x2="18" y2="10" stroke="#3d2314" strokeWidth="1.5" strokeOpacity="0.3"/>
    <line x1="35" y1="16" x2="33" y2="5" stroke="#3d2314" strokeWidth="1.5" strokeOpacity="0.3"/>
    <line x1="50" y1="25" x2="52" y2="10" stroke="#3d2314" strokeWidth="1.5" strokeOpacity="0.3"/>
  </svg>
);

const DoodleStar = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2 L23 14 L36 14 L26 22 L29 35 L20 27 L11 35 L14 22 L4 14 L17 14 Z"
      fill="#d4a373" opacity="0.25" stroke="#b8834a" strokeWidth="0.5" strokeOpacity="0.3"/>
  </svg>
);

/* ── Main Landing Page Component ── */
const LandingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    cakeType: 'Birthday Cake',
    weight: '1 kg',
    eggPref: 'Eggless',
    pastryAddon: '',
    pastryQty: '1 pc',
    pastryEggPref: 'Eggless',
  });
  const [pastryFile, setPastryFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formStep, setFormStep] = useState(1);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
`🎂 *New Cake Order — Bakery Delight*

*Order Specifications:*
🥚 Egg Preference: ${formData.eggPref}
⚖️ Weight: ${formData.weight}
🍰 Pastry Add-ons: ${formData.pastryAddon || 'None'}${formData.pastryAddon ? ` (${formData.pastryQty}, ${formData.pastryEggPref})` : ''}${pastryFile ? `\n🖼️ Ref Image: ${pastryFile.name}` : ''}
🍰 Cake Type: ${formData.cakeType}

*Customer Details:*
👤 Name: ${formData.name}
📱 Phone: ${formData.phone}
📍 Address: ${formData.address}
📅 Delivery Date: ${formData.date}

Please confirm my order!`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/919172633991?text=${encodeURIComponent(msg)}`, '_blank');
    }, 600);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(145deg, #e8f4f8 0%, #dff0f5 40%, #eaf4f0 100%)' }}
    >

      {/* ── Bakery Doodles — Corners & Edges ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left */}
        <DoodleWheat  className="absolute top-4  left-4  w-10 opacity-70 rotate-12" />
        <DoodleCupcake className="absolute top-14 left-20 w-14 opacity-60" />
        <DoodleBerry  className="absolute top-32 left-6  w-16 opacity-55" />
        {/* Top-right */}
        <DoodleWheat  className="absolute top-4  right-4  w-10 opacity-70 -rotate-12 scale-x-[-1]" />
        <DoodleCookie className="absolute top-12 right-20 w-12 opacity-60" />
        <DoodleStar   className="absolute top-28 right-8  w-10 opacity-55" />
        {/* Bottom-left */}
        <DoodleBerry  className="absolute bottom-8  left-8  w-16 opacity-60" />
        <DoodleCookie className="absolute bottom-20 left-24 w-12 opacity-55" />
        <DoodleWheat  className="absolute bottom-4  left-36 w-10 opacity-50 rotate-6" />
        {/* Bottom-right */}
        <DoodleCupcake className="absolute bottom-6  right-6  w-14 opacity-60 scale-x-[-1]" />
        <DoodleBerry   className="absolute bottom-24 right-24 w-14 opacity-55" />
        <DoodleStar    className="absolute bottom-10 right-40 w-8  opacity-50" />
        {/* Mid edges */}
        <DoodleStar   className="absolute top-1/2 left-3  w-8 opacity-40 -translate-y-1/2" />
        <DoodleStar   className="absolute top-1/2 right-3 w-8 opacity-40 -translate-y-1/2" />
        <DoodleCupcake className="absolute top-1/3 left-12 w-10 opacity-40" />
        <DoodleCupcake className="absolute top-2/3 right-12 w-10 opacity-40 scale-x-[-1]" />
      </div>

      {/* ── TOP NAVBAR ── */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-6 text-xs font-bold tracking-widest uppercase"
          style={{ color: '#3d2314', opacity: 0.7 }}>
          <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
          <Link to="/all-cakes" className="hover:opacity-100 transition-opacity">Menu</Link>
          <Link to="/customize" className="hover:opacity-100 transition-opacity">Customize</Link>
        </div>
        <div className="flex items-center gap-6 text-xs font-bold tracking-widest uppercase"
          style={{ color: '#3d2314', opacity: 0.7 }}>
          <a href="tel:9172633991" className="hover:opacity-100 transition-opacity">📞 Call Us</a>
          <Link to="/all-cakes">
            <button
              className="px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-md transition-all hover:scale-105"
              style={{ background: '#3d2314', color: '#fff8f0' }}
            >
              View All Cakes
            </button>
          </Link>
        </div>
      </nav>

      {/* ── LOGO ── */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-col items-center mt-2 mb-4"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden shadow-lg"
          style={{
            background: '#fff8f0',
            border: '2px solid #d4a373',
            boxShadow: '0 4px 20px rgba(212,163,115,0.35)',
          }}
        >
          <img
            src="/bakery_logo.png"
            alt="Bakery Delight Logo"
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback: emoji cake
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<span style="font-size:2.2rem">🎂</span>';
            }}
          />
        </div>
        <div className="text-center mt-2">
          <h1
            className="font-playfair font-bold tracking-[3px] text-xl uppercase"
            style={{ color: '#3d2314' }}
          >
            Bakery Delight
          </h1>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <span className="block w-10 h-px" style={{ background: '#d4a373' }} />
            <span className="text-[9px] font-inter tracking-[3px] uppercase" style={{ color: '#b8834a' }}>
              Handcrafted with Love
            </span>
            <span className="block w-10 h-px" style={{ background: '#d4a373' }} />
          </div>
        </div>
      </motion.div>

      {/* ── MAIN SPLIT CARD ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pb-6">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          style={{
            background: 'rgba(255,252,248,0.85)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(212,163,115,0.3)',
            boxShadow: '0 25px 60px rgba(61,35,20,0.18), 0 0 0 1px rgba(212,163,115,0.1)',
          }}
        >
          {/* ── LEFT: YOUR ORDER ── */}
          <div
            className="md:w-2/5 relative flex flex-col items-center justify-center p-10 overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #2b1810 0%, #3d2314 60%, #5c2f18 100%)' }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full opacity-10"
              style={{ background: '#d4a373' }} />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-10"
              style={{ background: '#d4a373' }} />

            {/* Label */}
            <div className="relative z-10 text-center mb-4">
              <span
                className="text-[10px] font-bold font-inter tracking-[4px] uppercase"
                style={{ color: '#d4a373' }}
              >
                ✦ Your Order ✦
              </span>
            </div>

            {/* Cake Image */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-52 h-52 rounded-2xl overflow-hidden shadow-2xl mb-4"
              style={{
                border: '2px solid rgba(229,91,117,0.4)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              }}
            >
              <img
                src="/birthday_cake_order.png"
                alt="Birthday Cake"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/cake_featured_1.png';
                }}
              />
            </motion.div>

            {/* Cake info badges */}
            <div className="relative z-10 flex flex-col gap-2 w-full mt-2">
              {[
                { icon: '🍰', label: 'Multi-Tier Cakes' },
                { icon: '🎂', label: 'Custom Brownies' },
                { icon: '🚚', label: 'Home Delivery' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-inter font-semibold"
                  style={{ background: 'rgba(212,163,115,0.15)', color: '#e0c9b8' }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: ORDER DETAILS FORM ── */}
          <div className="md:w-3/5 p-10 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-6">
              <span
                className="text-[10px] font-bold tracking-[4px] uppercase font-inter"
                style={{ color: '#d4a373' }}
              >
                Place Your Order
              </span>
              <h2
                className="text-2xl font-playfair font-bold mt-1"
                style={{ color: '#3d2314' }}
              >
                Order Details
              </h2>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-playfair font-bold mb-2" style={{ color: '#3d2314' }}>
                    Order Placed!
                  </h3>
                  <p className="text-sm font-inter mb-4" style={{ color: '#7b4a2e' }}>
                    WhatsApp is opening with your order details...
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase"
                    style={{ background: '#3d2314', color: '#fff8f0' }}
                  >
                    Place Another Order
                  </button>
                </motion.div>
              ) : (
                <div
                  key="form"
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <span className="text-xs font-bold uppercase tracking-[2px]" style={{ color: '#e55b75' }}>Quick Order</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${formStep === 1 ? 'bg-[#e55b75] text-white' : 'bg-[#e55b75]/20 text-[#e55b75]'}`}>1</div>
                      <div className={`w-8 h-0.5 transition-all ${formStep === 2 ? 'bg-[#e55b75]' : 'bg-[#e55b75]/20'}`} />
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${formStep === 2 ? 'bg-[#e55b75] text-white' : 'bg-[#e55b75]/10 text-[#e55b75]/40'}`}>2</div>
                    </div>
                  </div>
                  <p className="text-[10px] font-inter mb-4" style={{ color: '#b8834a' }}>
                    {formStep === 1 ? 'Step 1 of 2 — Order Specifications' : 'Step 2 of 2 — Delivery Details'}
                  </p>

                  <AnimatePresence mode="wait">
                  {formStep === 1 ? (
                    <motion.form key="lp-s1"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                      className="space-y-5"
                      onSubmit={e => { e.preventDefault(); setFormStep(2); }}
                    >
                      {/* SECTION 1: Order Specifications */}
                      <div className="pb-2 mb-3" style={{ borderBottom: '2px solid rgba(229,91,117,0.25)' }}>
                        <h3 className="text-xs font-bold tracking-widest uppercase font-inter" style={{ color: '#e55b75' }}>Order Specifications</h3>
                      </div>

                      {/* Egg Preference */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold tracking-widest uppercase mb-2 font-inter" style={{ color: '#7b4a2e' }}>Egg Preference</label>
                          <div className="flex gap-2 items-center justify-around px-2.5 py-3 rounded-xl overflow-hidden" style={{ background: '#fdf8f5', border: '1.5px solid rgba(212,163,115,0.3)' }}>
                            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-inter whitespace-nowrap" style={{ color: '#3d2314' }}>
                              <input type="radio" name="eggPref" value="Eggless" checked={formData.eggPref === 'Eggless'} onChange={handleChange} className="accent-[#e55b75]" /> Eggless
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-inter whitespace-nowrap" style={{ color: '#3d2314' }}>
                              <input type="radio" name="eggPref" value="With Egg" checked={formData.eggPref === 'With Egg'} onChange={handleChange} className="accent-[#e55b75]" /> With Egg
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold tracking-widest uppercase mb-2 font-inter" style={{ color: '#7b4a2e' }}>Cake Type</label>
                          <select name="cakeType" value={formData.cakeType} onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl text-sm font-inter outline-none transition-all cursor-pointer"
                            style={{ background: '#fdf8f5', border: '1.5px solid rgba(212,163,115,0.3)', color: '#3d2314' }}
                            onFocus={e => (e.target.style.borderColor = '#d4a373')}
                            onBlur={e => (e.target.style.borderColor = 'rgba(212,163,115,0.3)')}>
                            <option>Birthday Cake</option>
                            <option>Wedding Cake</option>
                            <option>Anniversary Cake</option>
                            <option>Chocolate Brownie</option>
                            <option>Festival Special</option>
                            <option>Custom Design</option>
                          </select>
                        </div>
                      </div>

                      {/* Weight + Pastry */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[10px] font-bold tracking-widest uppercase mb-1.5 font-inter" style={{ color: '#7b4a2e' }}>Weight / Size</label>
                          <select name="weight" value={formData.weight} onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl text-sm font-inter outline-none transition-all cursor-pointer"
                            style={{ background: '#fdf8f5', border: '1.5px solid rgba(212,163,115,0.3)', color: '#3d2314' }}
                            onFocus={e => (e.target.style.borderColor = '#d4a373')}
                            onBlur={e => (e.target.style.borderColor = 'rgba(212,163,115,0.3)')}>
                            <option>0.5 kg</option>
                            <option>1 kg</option>
                            <option>1.5 kg</option>
                            <option>2 kg</option>
                            <option>3 kg+</option>
                          </select>
                        </div>
                      </div>

                      {/* ── DEDICATED PASTRY ADD-ON SECTION ── */}
                      <div className="p-4 rounded-xl space-y-4" style={{ background: '#fdf8f5', border: '1.5px solid rgba(212,163,115,0.3)' }}>
                        <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'rgba(212,163,115,0.2)' }}>
                          <span className="text-sm font-bold font-playfair uppercase tracking-wider" style={{ color: '#e55b75' }}>🧁 Add Pastries</span>
                          <span className="text-[10px] font-inter uppercase tracking-[2px]" style={{ color: '#b8834a' }}>Optional</span>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 font-inter" style={{ color: '#7b4a2e' }}>Pastry Flavor / Item</label>
                            <input
                              type="text"
                              name="pastryAddon"
                              value={formData.pastryAddon}
                              onChange={handleChange}
                              placeholder="e.g. Choco Truffle, Red Velvet"
                              className="w-full px-4 h-[44px] rounded-lg text-xs font-inter outline-none transition-all"
                              style={{ background: '#ffffff', border: '1px solid rgba(212,163,115,0.4)', color: '#3d2314' }}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 font-inter" style={{ color: '#7b4a2e' }}>Quantity</label>
                              <select
                                name="pastryQty"
                                value={formData.pastryQty || '1 pc'}
                                onChange={handleChange as any}
                                className="w-full px-3 h-[44px] rounded-lg text-xs font-inter outline-none cursor-pointer transition-all"
                                style={{ background: '#ffffff', border: '1px solid rgba(212,163,115,0.4)', color: '#3d2314' }}
                              >
                                <option value="1 pc">1 pc</option>
                                <option value="2 pcs">2 pcs</option>
                                <option value="4 pcs">4 pcs</option>
                                <option value="6 pcs (Half Dozen)">6 pcs (Half Dozen)</option>
                                <option value="12 pcs (1 Dozen)">12 pcs (1 Dozen)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 font-inter" style={{ color: '#7b4a2e' }}>Egg Preference</label>
                              <div className="flex gap-1 items-center justify-around rounded-lg px-2 h-[44px] overflow-hidden" style={{ background: '#ffffff', border: '1px solid rgba(212,163,115,0.4)' }}>
                                <label className="flex items-center gap-1 cursor-pointer text-[10px] font-inter whitespace-nowrap" style={{ color: '#3d2314' }}>
                                  <input type="radio" name="pastryEggPref" value="Eggless" checked={formData.pastryEggPref === 'Eggless'} onChange={handleChange} className="accent-[#e55b75]" /> Eggless
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer text-[10px] font-inter whitespace-nowrap" style={{ color: '#3d2314' }}>
                                  <input type="radio" name="pastryEggPref" value="With Egg" checked={formData.pastryEggPref === 'With Egg'} onChange={handleChange} className="accent-[#e55b75]" /> With Egg
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 font-inter" style={{ color: '#7b4a2e' }}>Reference Image</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setPastryFile(e.target.files?.[0] || null)}
                              className="w-full text-xs file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-[2px] hover:file:opacity-90 transition-all font-inter cursor-pointer"
                              style={{ color: '#7b4a2e' }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit"
                          className="px-8 py-3 rounded-full text-xs font-bold font-inter tracking-widest uppercase bg-[#e55b75] text-white hover:bg-[#d84e68] transition-all flex items-center gap-2">
                          Next: Delivery Details <span>→</span>
                        </motion.button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.form key="lp-s2"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                      className="space-y-5"
                      onSubmit={handleSubmit}
                    >
                      {/* SECTION 2: Delivery Details */}
                      <div className="pb-2 mb-3" style={{ borderBottom: '2px solid rgba(229,91,117,0.25)' }}>
                        <h3 className="text-xs font-bold tracking-widest uppercase font-inter" style={{ color: '#e55b75' }}>Delivery Details</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold tracking-widest uppercase mb-2 font-inter" style={{ color: '#7b4a2e' }}>Your Name</label>
                          <input required type="text" name="name" value={formData.name} onChange={handleChange}
                            placeholder="e.g. Priya Sharma"
                            className="w-full px-4 py-3.5 rounded-xl text-sm font-inter outline-none transition-all"
                            style={{ background: '#fdf8f5', border: '1.5px solid rgba(212,163,115,0.3)', color: '#3d2314' }}
                            onFocus={e => (e.target.style.borderColor = '#d4a373')}
                            onBlur={e => (e.target.style.borderColor = 'rgba(212,163,115,0.3)')} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold tracking-widest uppercase mb-2 font-inter" style={{ color: '#7b4a2e' }}>Phone Number</label>
                          <input required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                            placeholder="+91 91726 33991"
                            className="w-full px-4 py-3.5 rounded-xl text-sm font-inter outline-none transition-all"
                            style={{ background: '#fdf8f5', border: '1.5px solid rgba(212,163,115,0.3)', color: '#3d2314' }}
                            onFocus={e => (e.target.style.borderColor = '#d4a373')}
                            onBlur={e => (e.target.style.borderColor = 'rgba(212,163,115,0.3)')} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase mb-1.5 font-inter" style={{ color: '#7b4a2e' }}>Delivery Address</label>
                        <input required type="text" name="address" value={formData.address} onChange={handleChange}
                          placeholder="Street, Area, City, Pincode"
                          className="w-full px-4 py-2.5 rounded-xl text-sm font-inter outline-none transition-all"
                          style={{ background: '#fdf8f5', border: '1.5px solid rgba(212,163,115,0.3)', color: '#3d2314' }}
                          onFocus={e => (e.target.style.borderColor = '#d4a373')}
                          onBlur={e => (e.target.style.borderColor = 'rgba(212,163,115,0.3)')} />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase mb-1.5 font-inter" style={{ color: '#7b4a2e' }}>Preferred Delivery Date</label>
                        <input required type="date" name="date" value={formData.date} onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl text-sm font-inter outline-none transition-all"
                          style={{ background: '#fdf8f5', border: '1.5px solid rgba(212,163,115,0.3)', color: '#3d2314' }}
                          onFocus={e => (e.target.style.borderColor = '#d4a373')}
                          onBlur={e => (e.target.style.borderColor = 'rgba(212,163,115,0.3)')} />
                      </div>

                      <div className="flex gap-3 pt-3 items-center justify-between">
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="button" onClick={() => setFormStep(1)}
                          className="px-6 py-3 rounded-full text-xs font-bold font-inter tracking-widest uppercase text-[#e55b75] hover:bg-[#e55b75]/10 transition-all flex items-center gap-2 border border-[#e55b75]/20">
                          ← Back
                        </motion.button>
                        <motion.button type="submit" whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(229,91,117,0.4)' }} whileTap={{ scale: 0.95 }}
                          className="px-8 py-3 rounded-full font-inter font-bold text-sm tracking-widest uppercase transition-colors hover:bg-[#d84e68] flex items-center gap-2"
                          style={{ background: '#e55b75', color: '#ffffff' }}>
                          <span>🎂</span> Submit Order
                        </motion.button>
                      </div>

                      {/* Bottom note */}
                      <p className="text-center text-[10px] font-inter mt-1" style={{ color: '#b8834a' }}>
                        Your order will be sent directly to our WhatsApp
                      </p>
                    </motion.form>
                  )}
                  </AnimatePresence>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* ── BOTTOM STRIP ── */}
      <div
        className="relative z-10 py-3 text-center text-[10px] font-inter font-bold tracking-widest"
        style={{ background: '#3d2314', color: '#e0c9b8' }}
      >
        © 2025 Bakery Delight &nbsp;·&nbsp; Handcrafted with Love &nbsp;·&nbsp;
        <a href="https://wa.me/919172633991" className="underline hover:text-white transition-colors">
          WhatsApp: 9172633991
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
