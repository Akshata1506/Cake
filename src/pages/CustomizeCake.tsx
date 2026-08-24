import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { getAssetPath } from '../utils/assets';



const CustomizeCake: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    theme: "Doctor's Birthday Theme",
    customThemeText: '',
    flavor: 'Belgian Chocolate Fudge',
    size: '1-tier (approx 1kg)',
    textOnCake: '',
    address: '',
    eggPref: 'Eggless',
    deliveryType: 'Home Delivery',
    paymentMethod: 'UPI',
    specialInstructions: '',
    occasionDate: '',
    pastryAddon: '',
    pastryQty: '1 pc',
    pastryEggPref: 'Eggless'
  });

  const [formStep, setFormStep] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState<any>(null);

  // Auto-close / reset success screen after 7 seconds
  useEffect(() => {
    if (submittedSummary) {
      const timer = setTimeout(() => {
        closeModal();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [submittedSummary]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const buildText = (d: typeof formData, file: File | null) => {
    const themeName = d.theme === 'Custom' ? d.customThemeText : d.theme;
    return `*New Custom Cake Order* 🎂\n\n*Customer Info:*\n👤 Name: ${d.name}\n📱 Phone: ${d.phone}\n\n*Order Specifications:*\n🥚 Type: ${d.eggPref}\n🚚 Delivery: ${d.deliveryType}\n💳 Payment: ${d.paymentMethod}\n📍 Delivery Address: ${d.address || 'Self Pick-up'}\n\n*Customization Details:*\n🎭 Occasion / Theme: ${themeName || 'Not Specified'}\n📅 Occasion Date: ${d.occasionDate}\n🍫 Flavor: ${d.flavor}\n⚖️ Size/Tiers: ${d.size}\n✍️ Custom Text: ${d.textOnCake || 'None'}\n🍰 Pastry Add-ons: ${d.pastryAddon || 'None'}\n📝 Special Instructions: ${d.specialInstructions || 'None'}\n\n*Logistics:*\n📅 Delivery Date: ${d.date}\n⏰ Delivery Time: ${d.time}\n\n${file ? `🖼️ *Reference Image Attached:* ${file.name} (Sharing in chat)` : '🖼️ *Reference Image:* None'}\n\nPlease confirm availability and pricing.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSummary({ ...formData, fileName: imageFile ? imageFile.name : null });
    window.open(`https://wa.me/919172633991?text=${encodeURIComponent(buildText(formData, imageFile))}`, '_blank');
  };

  const closeModal = () => {
    setFormStep(1);
    setSubmittedSummary(null);
    setImageFile(null);
    setFormData({
      name: '',
      phone: '',
      date: '',
      time: '',
      theme: "Doctor's Birthday Theme",
      customThemeText: '',
      flavor: 'Belgian Chocolate Fudge',
      size: '1-tier (approx 1kg)',
      textOnCake: '',
      address: '',
      eggPref: 'Eggless',
      deliveryType: 'Home Delivery',
      paymentMethod: 'UPI',
      specialInstructions: '',
      occasionDate: '',
      pastryAddon: '',
      pastryQty: '1 pc',
      pastryEggPref: 'Eggless'
    });
  };

  return (
    <div
      className="min-h-screen pt-28 pb-16 px-4 md:px-8 flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url("${getAssetPath('/bakery_studio_bg.png')}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col md:flex-row relative z-10"
        style={{
          background: 'rgba(15, 15, 15, 0.45)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* ── LEFT PANEL: Brand Name ── */}
        <div className="md:w-2/5 p-12 flex flex-col justify-between relative z-10 border-r border-white/5">
          <div className="my-auto text-center md:text-left">
            <h1 className="font-playfair text-5xl md:text-6xl text-white font-normal italic tracking-wide leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              Sweet Slice
            </h1>
            <p className="text-[#e55b75] text-xs uppercase tracking-[3px] font-inter font-bold mt-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              Cake & Cream
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL: Central Glassmorphic Order Form ── */}
        <div
          className="md:w-3/5 p-8 md:p-10 relative z-20 max-h-[85vh] overflow-y-auto"
          style={{
            background: 'rgba(15, 15, 15, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          <AnimatePresence mode="wait">
            {submittedSummary ? (
              /* ── DIGITAL RECEIPT / SUCCESS SUMMARY ── */
              <motion.div
                key="receipt"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="text-white"
              >
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
                    ✓ Request Saved & Open in WhatsApp
                  </span>
                  <h3 className="text-3xl font-playfair font-bold">Your Custom Order</h3>
                  <p className="text-xs text-white/50 font-inter mt-1">
                    We are forwarding details to our master decorators. Form will close automatically in a few seconds.
                  </p>
                </div>

                <div
                  className="rounded-2xl p-5 border space-y-3 font-inter text-sm mb-6 shadow-sm"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {[
                    ['Name', submittedSummary.name],
                    ['Contact Number', submittedSummary.phone],
                    ['Egg Preference', submittedSummary.eggPref],
                    ['Occasion / Theme', submittedSummary.theme === 'Custom' ? submittedSummary.customThemeText : submittedSummary.theme],
                    ['Occasion Date', submittedSummary.occasionDate || 'Not Specified'],
                    ['Flavor', submittedSummary.flavor],
                    ['Size / Weight', submittedSummary.size],
                    ['Text on Cake', submittedSummary.textOnCake || 'None'],
                    ['Special Instructions', submittedSummary.specialInstructions || 'None'],
                    ['Reference Image', submittedSummary.fileName || 'None Selected'],
                    ['Delivery Type', submittedSummary.deliveryType],
                    ['Payment Method', submittedSummary.paymentMethod],
                    ['Delivery Date & Time', `${submittedSummary.date} at ${submittedSummary.time}`],
                    ['Delivery Address', submittedSummary.address || 'Self Pick-up'],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between border-b pb-2" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                      <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">{label}</span>
                      <span className="font-semibold text-right text-white">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => window.open(`https://wa.me/919172633991?text=${encodeURIComponent(buildText(submittedSummary, imageFile))}`, '_blank')}
                    className="w-full sm:w-1/2 py-3.5 bg-emerald-600 text-white font-inter text-xs tracking-widest uppercase rounded-full hover:bg-emerald-700 transition-colors font-bold shadow-md"
                  >
                    📱 Open WhatsApp Chat
                  </button>
                  <button
                    onClick={closeModal}
                    className="w-full sm:w-1/2 py-3.5 bg-white text-black font-inter text-xs tracking-widest uppercase rounded-full hover:bg-white/90 transition-colors font-bold shadow-sm"
                  >
                    Close & Reset Now
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ── GLASSMORPHIC MULTI-STEP FORM ── */
              <div
                key="form"
                className="space-y-4 text-white pt-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/40 text-[9px] font-bold uppercase tracking-[2px]">
                    Menu / New Order
                  </span>
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-inter transition-all ${formStep === 1 ? 'bg-[#e55b75] text-white' : 'bg-[#e55b75]/20 text-[#e55b75]'}`}>1</div>
                    <div className={`w-8 h-0.5 transition-all ${formStep === 2 ? 'bg-[#e55b75]' : 'bg-white/15'}`} />
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-inter transition-all ${formStep === 2 ? 'bg-[#e55b75] text-white' : 'bg-white/10 text-white/40'}`}>2</div>
                    <button
                      onClick={() => navigate('/')}
                      className="ml-3 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
                      aria-label="Close"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-2">
                  Custom Cake Order
                </h2>
                <p className="text-[10px] text-white/35 font-inter mb-6">
                  {formStep === 1 ? 'Step 1 of 2 — Cake Specifications' : 'Step 2 of 2 — Delivery Details'}
                </p>

                <AnimatePresence mode="wait">
                {formStep === 1 ? (
                  <motion.form key="cc-s1"
                    initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}
                    className="space-y-4"
                    onSubmit={e => { e.preventDefault(); setFormStep(2); }}
                  >
                    <h3 className="text-sm font-playfair font-bold text-[#e55b75] mb-4 border-b border-white/10 pb-2">
                      Cake Specifications
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Theme / Occasion</label>
                        <select name="theme" value={formData.theme} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter outline-none focus:border-[#e55b75] transition-all cursor-pointer">
                          <option value="Doctor's Birthday Theme">Doctor's Birthday Theme 🩺</option>
                          <option value="Unicorn / Fantasy Theme">Unicorn / Fantasy Theme 🦄</option>
                          <option value="Space / Astronaut Theme">Space / Astronaut Theme 🚀</option>
                          <option value="Classic Elegant Wedding">Classic Elegant Wedding 💍</option>
                          <option value="Normal Birthday Theme">Normal Birthday Theme 🎉</option>
                          <option value="Anniversary Love Theme">Anniversary Love Theme 💖</option>
                          <option value="Custom">Custom Theme (Specify below)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Attach Reference Image</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white/60 font-inter file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" />
                      </div>
                    </div>

                    {formData.theme === 'Custom' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                        <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Describe Custom Theme</label>
                        <input type="text" name="customThemeText" value={formData.customThemeText} onChange={handleChange} placeholder="e.g. Captain America Avengers theme" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter placeholder-white/20 outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all" />
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Cake Flavor</label>
                        <select name="flavor" value={formData.flavor} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter outline-none focus:border-[#e55b75] transition-all cursor-pointer">
                          <option value="Belgian Chocolate Fudge">Belgian Chocolate Fudge</option>
                          <option value="Red Velvet Cream Cheese">Red Velvet Cream Cheese</option>
                          <option value="Fresh Fruit Vanilla">Fresh Fruit Vanilla</option>
                          <option value="Black Forest Classic">Black Forest Classic</option>
                          <option value="Lotus Biscoff Dream">Lotus Biscoff Dream</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Size / Weight</label>
                        <select name="size" value={formData.size} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter outline-none focus:border-[#e55b75] transition-all cursor-pointer">
                          <option value="0.5kg (Single tier)">0.5kg (Single tier)</option>
                          <option value="1-tier (approx 1kg)">1-tier (approx 1kg)</option>
                          <option value="2-tier (approx 2kg)">2-tier (approx 2kg)</option>
                          <option value="3-tier (approx 3kg+)">3-tier (approx 3kg+)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Egg Preference</label>
                        <div className="flex gap-2 items-center justify-around bg-white/5 border border-white/10 rounded-xl px-2.5 py-2 h-[42px] overflow-hidden">
                          <label className="flex items-center gap-1.5 cursor-pointer text-xs text-white font-inter whitespace-nowrap">
                            <input type="radio" name="eggPref" value="Eggless" checked={formData.eggPref === 'Eggless'} onChange={handleChange} className="accent-[#e55b75]" /> Eggless
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer text-xs text-white font-inter whitespace-nowrap">
                            <input type="radio" name="eggPref" value="With Egg" checked={formData.eggPref === 'With Egg'} onChange={handleChange} className="accent-[#e55b75]" /> With Egg
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* ── DEDICATED PASTRY ADD-ON SECTION ── */}
                    <div className="p-5 bg-black/20 border border-white/5 rounded-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="text-sm font-bold text-[#e55b75] font-playfair">🧁 Add Pastries</span>
                        <span className="text-[10px] text-white/40 font-inter uppercase tracking-[2px]">Optional</span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2 font-inter">Pastry Flavor / Item</label>
                          <input
                            type="text"
                            name="pastryAddon"
                            value={formData.pastryAddon}
                            onChange={handleChange}
                            placeholder="e.g. Choco Truffle, Red Velvet"
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 h-[44px] text-xs text-white font-inter outline-none focus:border-[#e55b75] transition-all"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2 font-inter">Quantity</label>
                            <select
                              name="pastryQty"
                              value={formData.pastryQty || '1 pc'}
                              onChange={handleChange as any}
                              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 h-[44px] text-xs text-white font-inter outline-none focus:border-[#e55b75]"
                            >
                              <option value="1 pc">1 pc</option>
                              <option value="2 pcs">2 pcs</option>
                              <option value="4 pcs">4 pcs</option>
                              <option value="6 pcs (Half Dozen)">6 pcs (Half Dozen)</option>
                              <option value="12 pcs (1 Dozen)">12 pcs (1 Dozen)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2 font-inter">Egg Preference</label>
                            <div className="flex gap-1 items-center justify-around bg-[#1a1a1a] border border-white/10 rounded-lg px-2 h-[44px] overflow-hidden">
                              <label className="flex items-center gap-1 cursor-pointer text-[10px] text-white font-inter whitespace-nowrap">
                                <input type="radio" name="pastryEggPref" value="Eggless" checked={formData.pastryEggPref === 'Eggless'} onChange={handleChange} className="accent-[#e55b75]" /> Eggless
                              </label>
                              <label className="flex items-center gap-1 cursor-pointer text-[10px] text-white font-inter whitespace-nowrap">
                                <input type="radio" name="pastryEggPref" value="With Egg" checked={formData.pastryEggPref === 'With Egg'} onChange={handleChange} className="accent-[#e55b75]" /> With Egg
                              </label>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2 font-inter">Reference Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            className="w-full text-xs text-white/50 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-[2px] file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all font-inter cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Text Message on Cake</label>
                      <input type="text" name="textOnCake" value={formData.textOnCake} onChange={handleChange} placeholder="e.g. Happy 1st Birthday Aanya!" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter placeholder-white/20 outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all" />
                    </div>
                    
                    <div className="pt-2 flex justify-end">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="px-8 py-3 rounded-full text-xs font-bold font-inter tracking-widest uppercase bg-[#e55b75] text-white hover:bg-[#d84e68] transition-all flex items-center gap-2 shadow-lg">
                        Next: Delivery Details <span>→</span>
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.form key="cc-s2"
                    initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}
                    className="space-y-4"
                    onSubmit={handleSubmit}
                  >
                    <h3 className="text-sm font-playfair font-bold text-[#e55b75] mb-4 border-b border-white/10 pb-2">
                      Delivery Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Customer Name</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Akshata Kumavat" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter placeholder-white/20 outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Contact Number</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 9172633991" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter placeholder-white/20 outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Delivery Type</label>
                        <select name="deliveryType" value={formData.deliveryType} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter outline-none focus:border-[#e55b75] transition-all cursor-pointer">
                          <option value="Home Delivery">Home Delivery</option>
                          <option value="Store Pickup">Store Pickup</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Payment Method</label>
                        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter outline-none focus:border-[#e55b75] transition-all cursor-pointer">
                          <option value="UPI">UPI</option>
                          <option value="COD">Cash on Delivery (COD)</option>
                          <option value="Advance Payment">Advance Payment</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Delivery Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address, area, pincode" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter placeholder-white/20 outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Delivery Date</label>
                        <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all [&::-webkit-calendar-picker-indicator]:invert-[0.6]" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Delivery Time</label>
                        <input required type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all [&::-webkit-calendar-picker-indicator]:invert-[0.6]" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Special Instructions</label>
                      <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange as any} placeholder="Any specific instructions..." rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter placeholder-white/20 outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all resize-none"></textarea>
                    </div>

                    {imageFile && (
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[10px] text-white/60 font-inter leading-relaxed">
                        💡 <strong>Tip:</strong> Reference image details are saved. Once WhatsApp opens, please attach/upload your selected image (<strong>{imageFile.name}</strong>) directly in the chat!
                      </div>
                    )}

                    <div className="pt-2 flex justify-between items-center">
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="button" onClick={() => setFormStep(1)} className="px-6 py-3 rounded-full text-xs font-bold font-inter tracking-widest uppercase bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2">
                        ← Back
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(229,91,117,0.4)' }} whileTap={{ scale: 0.95 }} type="submit" className="px-8 py-3 rounded-full text-xs font-bold font-inter tracking-widest uppercase transition-all bg-[#e55b75] text-white hover:bg-[#d84e68] flex items-center gap-2">
                        Proceed <span>→</span>
                      </motion.button>
                    </div>
                  </motion.form>
                )}
                </AnimatePresence>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomizeCake;
