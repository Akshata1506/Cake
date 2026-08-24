import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getAssetPath } from '../utils/assets';

/* ── Cake data with image ── */
interface CakeItem {
  id: number;
  name: string;
  price: string;
  image: string;
}

const CAKE_CATEGORIES = [
  {
    title: 'Wedding Cakes',
    bgColor: '#ffffff',
    items: [
      { id: 1,  name: 'Royal Ivory Fondant',       price: '₹5,000+', image: getAssetPath('/wedding_1.png') },
      { id: 2,  name: 'Golden Drip Elegance',       price: '₹4,500+', image: getAssetPath('/wedding_2.png') },
    ],
  },
  {
    title: 'Birthday Cakes',
    bgColor: '#f9f9f9',
    items: [
      { id: 3,  name: 'Pink Butterfly Dream',       price: '₹1,500',  image: getAssetPath('/anniversary_1.png') },
      { id: 4,  name: 'Rose Gold Celebration',      price: '₹1,800',  image: getAssetPath('/anniversary_2.jpg') },
      { id: 9,  name: 'Floral Heart Delight',       price: '₹1,600',  image: getAssetPath('/anniversary_3.png') },
      { id: 10, name: 'Blue Horizon Butterfly',     price: '₹1,700',  image: getAssetPath('/anniversary_4.png') },
    ],
  },
  {
    title: 'Anniversary Cakes',
    bgColor: '#ffffff',
    items: [
      { id: 5,  name: 'Red Rose Romance',           price: '₹1,800',  image: getAssetPath('/birthday_1.jpg') },
      { id: 6,  name: 'Golden Couple Elegance',     price: '₹2,200',  image: getAssetPath('/birthday_2.jpg') },
      { id: 11, name: 'Swan Lake Love',             price: '₹2,500',  image: getAssetPath('/birthday_3.jpg') },
      { id: 12, name: 'Monogram Masterpiece',       price: '₹3,000+', image: getAssetPath('/birthday_4.png') },
    ],
  },
  {
    title: 'Festival Cakes',
    bgColor: '#f9f9f9',
    items: [
      { id: 7,  name: 'Diwali Grand Celebration',   price: '₹3,600',  image: getAssetPath('/festival_1.jpg') },
      { id: 8,  name: 'Christmas Yule Log',         price: '₹4,400',  image: getAssetPath('/festival_2.jpg') },
      { id: 13, name: 'Holi Colorful Drip',         price: '₹2,800',  image: getAssetPath('/festival_3.jpg') },
      { id: 14, name: 'Eid Chocolate Feast',        price: '₹3,200',  image: getAssetPath('/festival_4.jpg') },
    ],
  },
];

const AllCakes: React.FC = () => {
  const [selected, setSelected] = useState<CakeItem | null>(null);
  const [submitted, setSubmitted] = useState<any>(null);
  const [formStep, setFormStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', address: '', date: '', time: '', notes: '', eggPref: 'Eggless', weight: '1-tier (approx 1kg)', pastryAddon: '', pastryQty: '1 pc', pastryEggPref: 'Eggless' });
  const [_pastryImage, setPastryImage] = useState<File | null>(null);


  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Auto-close receipt after 7 seconds
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => closeModal(), 7000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const buildMsg = (cake: string, f: typeof form) =>
    `*New Cake Order!* 🎂\n\n*Cake:* ${cake}\n\n*Order Specifications:*\n🥚 Egg Preference: ${f.eggPref}\n⚖️ Weight: ${f.weight}\n🍰 Pastry Add-ons: ${f.pastryAddon || 'None'}\n\n*Customer Details:*\n👤 Name: ${f.name}\n📱 Phone: ${f.phone}\n📍 Address: ${f.address}\n📅 Date: ${f.date}\n⏰ Time: ${f.time}\n📝 Instructions: ${f.notes || 'None'}\n\nPlease confirm my order.`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSubmitted({ cake: selected.name, image: selected.image, ...form });
    window.open(`https://wa.me/919172633991?text=${encodeURIComponent(buildMsg(selected.name, form))}`, '_blank');
  };

  const closeModal = () => { setSelected(null); setSubmitted(null); setForm({ name: '', phone: '', address: '', date: '', time: '', notes: '', eggPref: 'Eggless', weight: '1-tier (approx 1kg)', pastryAddon: '', pastryQty: '1 pc', pastryEggPref: 'Eggless' }); };

  return (
    <div className="min-h-screen pt-28 pb-16" style={{ background: 'var(--bg-color)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-3" style={{ color: '#3d2314' }}>
            Our Pastry Collection
          </h1>
          <p className="font-inter max-w-2xl mx-auto text-sm" style={{ color: 'rgba(61,35,20,0.55)' }}>
            Explore our curated selection of handcrafted cakes for every special occasion.
          </p>
        </motion.div>
      </div>

      {/* Category sections */}
      {CAKE_CATEGORIES.map((cat, ci) => (
        <div key={ci} className="w-full py-16" style={{ background: cat.bgColor }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-playfair font-bold border-b pb-4 mb-10 text-center"
              style={{ color: '#3d2314', borderColor: 'rgba(61,35,20,0.12)' }}>
              {cat.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cat.items.map((cake) => (
                <motion.div
                  key={cake.id}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl overflow-hidden flex flex-col group cursor-pointer"
                  style={{ background: '#fff', boxShadow: '0 4px 24px rgba(61,35,20,0.08)', border: '1px solid rgba(212,163,115,0.15)' }}
                >
                  <div className="h-56 overflow-hidden relative">
                    <img src={cake.image} alt={cake.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5 flex flex-col items-center text-center flex-1 justify-between">
                    <div>
                      <h3 className="font-playfair text-lg font-bold mb-1" style={{ color: '#3d2314' }}>{cake.name}</h3>
                      <p className="font-bold font-inter text-sm mb-3" style={{ color: '#d4a373' }}>{cake.price}</p>
                    </div>
                    <button
                      onClick={() => { setSelected(cake); setSubmitted(null); }}
                      className="w-full py-2.5 rounded-full text-xs font-bold font-inter tracking-widest uppercase transition-all hover:opacity-90"
                      style={{ background: '#3d2314', color: '#fff8f0' }}
                    >
                      Order Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* ── GLASSMORPHIC SPLIT CHECKOUT MODAL ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.93, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 24, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col md:flex-row relative"
              style={{
                background: 'rgba(15, 15, 15, 0.45)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
                maxHeight: '90vh',
              }}
            >
              {/* ── LEFT: Cake Visual + Cursive Branding ── */}
              <div className="md:w-2/5 relative overflow-hidden flex flex-col justify-between p-6" style={{ minHeight: '280px' }}>
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)' }} />
                
                <div className="relative z-20">
                  <span className="text-[10px] font-bold tracking-[3px] uppercase font-inter text-[#e55b75]">
                    ✦ Selection
                  </span>
                </div>

                <div className="relative z-20 mt-auto">
                  <h3 className="text-2xl font-playfair font-bold text-white leading-tight">{selected.name}</h3>
                  <p className="text-lg font-bold font-inter text-white/90 mt-1">{selected.price}</p>
                  
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <span className="font-playfair text-2xl text-white/90 font-normal italic">
                      Sweet Slice Studio
                    </span>
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Form / Receipt ── */}
              <div
                className="md:w-3/5 p-8 overflow-y-auto md:p-10 relative z-20"
                style={{
                  background: 'rgba(15, 15, 15, 0.85)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  maxHeight: '90vh',
                }}
              >
                {submitted ? (
                  /* Receipt */
                  <div className="text-white">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                      style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366' }}>
                      ✓ Order forward to WhatsApp
                    </span>
                    <h3 className="text-xl font-playfair font-bold mb-1">Order Summary</h3>
                    <p className="text-xs font-inter mb-4 text-white/50">Check WhatsApp chat for order tracking details:</p>

                    <div
                      className="space-y-2.5 text-sm font-inter mb-5 p-4 rounded-xl border"
                      style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(255, 255, 255, 0.08)' }}
                    >
                      {[
                        ['Cake', submitted.cake],
                        ['Customer Name', submitted.name],
                        ['Phone Number', submitted.phone],
                        ['Shipping Address', submitted.address],
                        ['Delivery Schedule', `${submitted.date} at ${submitted.time}`],
                        ...(submitted.notes ? [['Instructions', submitted.notes]] : []),
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between border-b pb-2" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white/45">{k}</span>
                          <span className="font-semibold text-right text-white">{v}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => window.open(`https://wa.me/919172633991?text=${encodeURIComponent(buildMsg(submitted.cake, submitted))}`, '_blank')}
                        className="flex-1 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all hover:opacity-90"
                        style={{ background: '#25D366', color: '#fff' }}>
                        📱 Open WhatsApp
                      </button>
                      <button onClick={closeModal}
                        className="flex-1 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all bg-white text-black hover:bg-white/90">
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Checkout Form (2-Step) */
                  <div className="text-white pt-4">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-white/40 text-[9px] font-bold uppercase tracking-[2px]">Complete Order</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-inter transition-all ${formStep === 1 ? 'bg-[#e55b75] text-white' : 'bg-[#e55b75]/20 text-[#e55b75]'}`}>1</div>
                        <div className={`w-6 h-0.5 transition-all ${formStep === 2 ? 'bg-[#e55b75]' : 'bg-white/15'}`} />
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-inter transition-all ${formStep === 2 ? 'bg-[#e55b75] text-white' : 'bg-white/10 text-white/40'}`}>2</div>
                        <button
                          onClick={closeModal}
                          className="ml-2 w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                          style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
                          aria-label="Close"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] text-white/35 font-inter mb-5">
                      {formStep === 1 ? 'Step 1 of 2 — Order Specifications' : 'Step 2 of 2 — Delivery Details'}
                    </p>

                    <AnimatePresence mode="wait">
                    {formStep === 1 ? (
                      <motion.form key="ac-s1"
                        initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}
                        className="space-y-4"
                        onSubmit={e => { e.preventDefault(); setFormStep(2); }}
                      >
                        <h3 className="text-sm font-playfair font-bold text-[#e55b75] border-b border-white/10 pb-2">🍰 Order Specifications</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Cake Egg Preference</label>
                            <div className="flex gap-2 items-center justify-around bg-white/5 border border-white/10 rounded-xl px-2.5 py-2 h-[42px] overflow-hidden">
                              <label className="flex items-center gap-1.5 cursor-pointer text-xs text-white font-inter whitespace-nowrap">
                                <input type="radio" name="eggPref" value="Eggless" checked={form.eggPref === 'Eggless'} onChange={onChange} className="accent-[#e55b75]" /> Eggless
                              </label>
                              <label className="flex items-center gap-1.5 cursor-pointer text-xs text-white font-inter whitespace-nowrap">
                                <input type="radio" name="eggPref" value="With Egg" checked={form.eggPref === 'With Egg'} onChange={onChange} className="accent-[#e55b75]" /> With Egg
                              </label>
                            </div>
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Weight / Size</label>
                            <select name="weight" value={form.weight} onChange={onChange as any} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-inter outline-none focus:border-[#e55b75] transition-all">
                              <option value="0.5kg (Single tier)">0.5kg (Single tier)</option>
                              <option value="1-tier (approx 1kg)">1-tier (approx 1kg)</option>
                              <option value="2-tier (approx 2kg)">2-tier (approx 2kg)</option>
                              <option value="3-tier (approx 3kg+)">3-tier (approx 3kg+)</option>
                            </select>
                          </div>
                        </div>

                        {/* ── DEDICATED PASTRY ADD-ON SECTION ── */}
                        <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#e55b75] font-playfair">🧁 Add Pastries Section</span>
                            <span className="text-[9px] text-white/40 font-inter uppercase">Optional Add-on</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1 font-inter">Pastry Item / Flavor</label>
                              <input
                                type="text"
                                name="pastryAddon"
                                value={form.pastryAddon}
                                onChange={onChange}
                                placeholder="e.g. Choco Truffle, Red Velvet"
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-inter outline-none focus:border-[#e55b75]"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1 font-inter">Quantity</label>
                              <select
                                name="pastryQty"
                                value={form.pastryQty}
                                onChange={onChange as any}
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-inter outline-none focus:border-[#e55b75]"
                              >
                                <option value="1 pc">1 pc</option>
                                <option value="2 pcs">2 pcs</option>
                                <option value="4 pcs">4 pcs</option>
                                <option value="6 pcs (Half Dozen)">6 pcs (Half Dozen)</option>
                                <option value="12 pcs (1 Dozen)">12 pcs (1 Dozen)</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1 font-inter">Pastry Egg Preference</label>
                              <div className="flex gap-2 items-center justify-around bg-[#1a1a1a] border border-white/10 rounded-lg px-2 py-1.5 h-[34px]">
                                <label className="flex items-center gap-1 cursor-pointer text-[11px] text-white font-inter whitespace-nowrap">
                                  <input type="radio" name="pastryEggPref" value="Eggless" checked={form.pastryEggPref === 'Eggless'} onChange={onChange} className="accent-[#e55b75]" /> Eggless
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer text-[11px] text-white font-inter whitespace-nowrap">
                                  <input type="radio" name="pastryEggPref" value="With Egg" checked={form.pastryEggPref === 'With Egg'} onChange={onChange} className="accent-[#e55b75]" /> With Egg
                                </label>
                              </div>
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1 font-inter">Pastry Ref Image</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={e => e.target.files?.[0] && setPastryImage(e.target.files[0])}
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white/60 font-inter file:mr-2 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:text-[9px] file:bg-white/10 file:text-white cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 flex justify-between items-center">
                          <button type="button" onClick={closeModal}
                            className="text-white/40 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">← Cancel</button>
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit"
                            className="px-8 py-3 rounded-full text-xs font-bold font-inter tracking-widest uppercase bg-[#e55b75] text-white hover:bg-[#d84e68] transition-all flex items-center gap-2">
                            Next: Delivery Details <span>→</span>
                          </motion.button>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.form key="ac-s2"
                        initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}
                        className="space-y-4"
                        onSubmit={handleSubmit}
                      >
                        <h3 className="text-sm font-playfair font-bold text-[#e55b75] border-b border-white/10 pb-2">📦 Delivery Details</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Customer Name</label>
                            <input required type="text" name="name" value={form.name} onChange={onChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter placeholder-white/20 outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all"
                              placeholder="Priya Sharma" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Contact Number</label>
                            <input required type="tel" name="phone" value={form.phone} onChange={onChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter placeholder-white/20 outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all"
                              placeholder="+91 91726 33991" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Shipping Address</label>
                          <input required type="text" name="address" value={form.address} onChange={onChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter placeholder-white/20 outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all"
                            placeholder="Complete street address, area, city, pincode" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Delivery Date</label>
                            <input required type="date" name="date" value={form.date} onChange={onChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Delivery Time</label>
                            <input required type="time" name="time" value={form.time} onChange={onChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Special Note (Optional)</label>
                          <input name="notes" value={form.notes} onChange={onChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter placeholder-white/20 outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all"
                            placeholder="Add note e.g. message text..." />
                        </div>

                        <div className="flex gap-3 pt-3 items-center justify-between">
                          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="button" onClick={() => setFormStep(1)}
                            className="px-6 py-3 rounded-full text-xs font-bold font-inter tracking-widest uppercase bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2">
                            ← Back
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit"
                            className="px-8 py-3 rounded-full text-xs font-bold font-inter tracking-widest uppercase transition-all bg-white text-black hover:bg-[#e55b75] hover:text-white">
                            Confirm Order
                          </motion.button>
                        </div>

                        <div className="relative flex items-center justify-center my-4">
                          <div className="w-full border-t border-white/10"></div>
                          <span className="absolute bg-[#1a1a1a] px-3 text-[10px] uppercase font-bold text-white/40 font-mono tracking-widest">OR</span>
                        </div>
                        <div className="flex justify-center gap-4">
                          <a href="mailto:boutique@sweetslice.com" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.985 0-.74-.078-1.3-.173-1.854H12.24z"/></svg>
                          </a>
                          <a href="https://wa.me/919172633991" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm5.835-3.303c1.62.962 3.205 1.484 4.887 1.485 5.513 0 9.997-4.485 10-10 .003-2.673-1.037-5.184-2.93-7.078-1.892-1.893-4.401-2.935-7.076-2.937-5.515 0-10.002 4.487-10.005 10-.001 1.797.481 3.55 1.396 5.093l-.995 3.633 3.723-.976zm11.288-7.608c-.29-.145-1.716-.848-1.98-.942-.266-.096-.459-.145-.653.145-.192.291-.748.944-.919 1.138-.17.192-.34.219-.63.073-.29-.145-1.229-.453-2.34-1.445-.865-.772-1.45-1.725-1.62-2.016-.17-.291-.018-.448.127-.593.13-.13.29-.34.436-.509.145-.17.194-.291.291-.485.097-.194.049-.364-.025-.509-.072-.145-.653-1.573-.895-2.155-.236-.569-.475-.491-.653-.5H7.72c-.193 0-.509.073-.775.364-.266.291-1.019.995-1.019 2.425 0 1.431 1.042 2.816 1.188 3.01 1.019 1.431 2.074 2.185 3.457 2.682.797.287 1.55.362 2.119.277.636-.096 1.716-.703 1.957-1.382.243-.679.243-1.261.17-1.382-.072-.121-.266-.194-.557-.34z"/></svg>
                          </a>
                          <a href="https://x.com" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          </a>
                        </div>
                      </motion.form>
                    )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllCakes;
