import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetPath } from '../utils/assets';

interface CakeItem {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  image: string;
  desc: string;
  notes: string;
  ingredients: string[];
  specs: { weight: string; time: string; taste: string };
}

const SIGNATURE_CAKES: CakeItem[] = [
  {
    id: 1,
    title: "L'Aura d'Or",
    subtitle: "Dark Truffle & Edible Gold Leaf",
    price: "₹3,500",
    image: getAssetPath("/cake_featured_1.png"),
    desc: "A rich, single-origin 72% dark chocolate mousse layered with chocolate sponge, velvet ganache, and topped with real gold leaf — pure indulgence in every slice.",
    notes: "Deeply decadent cocoa balanced by light Madagascar vanilla bean. The texture is intensely silky and smooth.",
    ingredients: ["Dark Cocoa 72%", "Gourmet Cream", "Raw Sugar", "Gold Flakes", "Vanilla Pod"],
    specs: { weight: "1.2 kg", time: "24h Notice", taste: "Intense Cocoa" }
  },
  {
    id: 2,
    title: "Brownie Royale",
    subtitle: "Fudge Brownie & Caramel Drizzle",
    price: "₹1,800",
    image: getAssetPath("/cake_featured_2.png"),
    desc: "Ultra-fudgy, dense brownie layers drenched in slow-cooked salted caramel, finished with a crunchy pecan crust and dark chocolate shards on top.",
    notes: "Rich, buttery chocolate with a gentle saltiness from the caramel. Each bite melts completely — no crumbling, pure luxury.",
    ingredients: ["Belgian Chocolate", "Salted Caramel", "Roasted Pecans", "Cultured Butter", "Brown Sugar"],
    specs: { weight: "0.9 kg", time: "12h Notice", taste: "Fudgy Caramel" }
  },
  {
    id: 3,
    title: "Velours Pistache",
    subtitle: "Pistachio Cream & Rose Frost",
    price: "₹2,800",
    image: getAssetPath("/cake_featured_3.png"),
    desc: "Silky Sicilian pistachio cream cake with rose-water frost, almond sponge layers, and miniature edible wildflowers — a celebration of nature's finest flavors.",
    notes: "Earthy, rich, and nutty with delicate floral notes. The slight bitterness balances the hand-churned pistachio cream perfectly.",
    ingredients: ["Sicilian Pistachios", "Rosewater", "Almond Flour", "Grass-fed Cream", "Edible Flowers"],
    specs: { weight: "1.1 kg", time: "36h Notice", taste: "Nutty Floral" }
  },
  {
    id: 4,
    title: "Choco Hazelnut Bomb",
    subtitle: "Ferrero-Style Hazelnut Truffle",
    price: "₹2,200",
    image: getAssetPath("/cake_finished.png"),
    desc: "A Ferrero-inspired showstopper — layers of hazelnut praline cream, feuilletine crunch, and milk chocolate mousse wrapped in a roasted hazelnut shell glaze.",
    notes: "Addictive combination of crunch and cream. Toasted hazelnut aroma with smooth milk chocolate — reminiscent of your favourite luxury bonbon.",
    ingredients: ["Roasted Hazelnuts", "Milk Chocolate", "Praline Paste", "Feuilletine", "Cocoa Butter"],
    specs: { weight: "1.0 kg", time: "24h Notice", taste: "Nutty Chocolate" }
  }
];

export const FeaturedCakes: React.FC = () => {
  const [selectedCake, setSelectedCake] = useState<CakeItem | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [pastryFile, setPastryFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: '',
    eggPref: 'Eggless',
    weight: '1-tier (approx 1kg)',
    pastryAddon: '',
    pastryQty: '1 pc',
    pastryEggPref: 'Eggless',
  });


  const [submittedSummary, setSubmittedSummary] = useState<any>(null);
  const [formStep, setFormStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCake) return;

    const summary = {
      cake: selectedCake.title,
      price: selectedCake.price,

      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
      eggPref: formData.eggPref,
      weight: formData.weight,
      pastryAddon: formData.pastryAddon,
      pastryFileName: pastryFile ? pastryFile.name : null
    };

    setSubmittedSummary(summary);

    const message = `*New Cake Order!* 🎂
    
*Cake:* ${selectedCake.title}
*Price:* ${selectedCake.price}

*Order Specifications:*
🥚 Egg Preference: ${formData.eggPref}
⚖️ Weight: ${formData.weight}
🍰 Pastries/Add-ons: ${formData.pastryAddon || 'None'}
${pastryFile ? `🖼️ *Pastry Reference Image:* ${pastryFile.name} (Sharing in chat)\n` : ''}
*Customer Details:*
👤 Name: ${formData.name}
📱 Phone: ${formData.phone}
📍 Address: ${formData.address}
📅 Delivery Date: ${formData.date}
⏰ Delivery Time: ${formData.time}
📝 Special Instructions: ${formData.notes || 'None'}

Please confirm my order.`;

    window.open(`https://wa.me/919172633991?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openWhatsAppDirect = () => {
    if (!submittedSummary) return;
    const message = `*New Cake Order!* 🎂
    
*Cake:* ${submittedSummary.cake}
*Price:* ${submittedSummary.price}
*Weight:* ${submittedSummary.weight}

*Customer Details:*
👤 Name: ${submittedSummary.name}
📱 Phone: ${submittedSummary.phone}
📍 Address: ${submittedSummary.address}
📅 Delivery Date: ${submittedSummary.date}
⏰ Delivery Time: ${submittedSummary.time}
📝 Special Instructions: ${submittedSummary.notes || 'None'}

Please confirm my order.`;

    window.open(`https://wa.me/919172633991?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-16 md:py-28 px-4 sm:px-6 md:px-12 bg-cream relative w-full max-w-full overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-1/10 w-64 h-64 md:w-96 md:h-96 rounded-full bg-rose-dark/20 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gold-light/10 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* Narrative Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-gold uppercase tracking-[4px] text-xs font-bold font-inter">The Signature Collection</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-chocolate mt-2">
              Edible Masterpieces
            </h2>
            <p className="text-chocolate/60 font-inter mt-4 text-sm sm:text-base">
              Explore our curation of award-winning gateaux, sculpted by master pâtissiers to deliver unparalleled harmony in flavor, texture, and visual aesthetics.
            </p>
          </div>
          
          <Link to="/all-cakes" className="self-start md:self-auto">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(197, 160, 89, 0.2)' }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 border border-gold text-chocolate hover:text-white hover:bg-gold-dark font-inter text-xs tracking-widest uppercase rounded-full transition-colors duration-300"
            >
              View All Pastries
            </motion.button>
          </Link>
        </div>

        {/* Cakes Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SIGNATURE_CAKES.map((cake, idx) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -12 }}
              className="glass-panel rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 flex flex-col justify-between group h-full border border-white/40"
            >
              
              {/* Product Visual */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-cream-dark">
                <img 
                  src={cake.image} 
                  alt={cake.title} 
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                />
                
                {/* Dark gradient overlay at bottom for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                
                {/* Accent Tag */}
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/70 backdrop-blur-md rounded-full border border-white/40 text-[9px] text-gold tracking-widest font-bold uppercase flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  Signature
                </div>

                {/* Title & Price overlaid on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end gap-3 z-10">
                  <div>
                    <h3 className="text-2xl font-playfair font-bold text-white leading-tight drop-shadow-md">
                      {cake.title}
                    </h3>
                    <p className="text-[10px] text-white/80 font-inter tracking-wider mt-1 uppercase drop-shadow-sm">
                      {cake.subtitle}
                    </p>
                  </div>
                  <span className="text-xl font-playfair text-gold font-bold drop-shadow-md">{cake.price}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white relative z-20">
                <div>
                  <p className="text-xs text-gray-900 font-inter line-clamp-2 leading-relaxed">
                    {cake.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-chocolate/5 flex items-center justify-between">
                  <span className="text-[10px] text-chocolate/40 font-mono">
                    Weight: {cake.specs.weight}
                  </span>
                  
                  <motion.button 
                    onClick={() => {
                      setSelectedCake(cake);
                      setShowOrderForm(false);
                    }}
                    className="flex items-center gap-1 text-[10px] text-gold hover:text-gold-dark font-bold font-inter tracking-widest uppercase transition-colors"
                  >
                    Discover
                    <ChevronRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Luxury Detailed Overlay Modal */}
      <AnimatePresence>
        {selectedCake && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`bg-cream w-full rounded-3xl overflow-hidden shadow-2xl relative border border-white/50 max-h-[90vh] overflow-y-auto ${showOrderForm ? 'max-w-md' : 'max-w-4xl'}`}
            >
              
              {/* Close Button */}
              <button 
                onClick={() => {
                  setSelectedCake(null);
                  setShowOrderForm(false);
                  setSubmittedSummary(null);
                }}
                className="absolute top-3 right-3 p-2.5 rounded-full transition-all z-20 shadow-lg hover:scale-110"
                style={{ background: '#1a1a1a', border: '2px solid rgba(229,91,117,0.3)' }}
              >
                <X className="w-5 h-5" style={{ color: '#e55b75' }} />
              </button>

              {submittedSummary ? (
                /* ON-SCREEN ORDER SUMMARY / DIGITAL RECEIPT */
                <div className="p-8 text-chocolate">
                  <div className="text-center mb-6">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
                      ✓ Order Placed & Saved On-Screen
                    </span>
                    <h3 className="text-3xl font-playfair font-bold text-chocolate">Your Order Summary</h3>
                    <p className="text-xs text-chocolate/70 font-inter mt-1">
                      Here are the exact details of your order.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-chocolate/10 space-y-4 shadow-sm font-inter text-sm mb-6">
                    <div className="flex justify-between items-center border-b border-chocolate/10 pb-3">
                      <span className="font-bold text-chocolate">Selected Cake:</span>
                      <span className="font-bold text-[#FF8FAB]">{submittedSummary.cake} ({submittedSummary.price})</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-chocolate/10 pb-3">
                      <div>
                        <span className="block text-xs text-chocolate/50 font-bold uppercase">Customer Name</span>
                        <span className="font-semibold">{submittedSummary.name}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-chocolate/50 font-bold uppercase">Phone Number</span>
                        <span className="font-semibold">{submittedSummary.phone}</span>
                      </div>
                    </div>

                    <div className="border-b border-chocolate/10 pb-3">
                      <span className="block text-xs text-chocolate/50 font-bold uppercase">Delivery Address</span>
                      <span className="font-semibold">{submittedSummary.address}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-chocolate/10 pb-3">
                      <div>
                        <span className="block text-xs text-chocolate/50 font-bold uppercase">Delivery Date</span>
                        <span className="font-semibold">{submittedSummary.date}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-chocolate/50 font-bold uppercase">Delivery Time</span>
                        <span className="font-semibold">{submittedSummary.time}</span>
                      </div>
                    </div>

                    {submittedSummary.notes && (
                      <div>
                        <span className="block text-xs text-chocolate/50 font-bold uppercase">Special Instructions</span>
                        <span className="font-semibold italic text-chocolate/80">"{submittedSummary.notes}"</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={openWhatsAppDirect}
                      className="w-full sm:w-1/2 py-3.5 bg-emerald-600 text-white font-inter text-xs tracking-widest uppercase rounded-full hover:bg-emerald-700 transition-colors font-bold shadow-md flex items-center justify-center gap-2"
                    >
                      📱 Open WhatsApp
                    </button>
                    <button
                      onClick={() => {
                        setSubmittedSummary(null);
                        setShowOrderForm(false);
                        setSelectedCake(null);
                        setFormData({
                          name: '',
                          phone: '',
                          address: '',
                          date: '',
                          time: '',
                          notes: '',
                          eggPref: 'Eggless',
                          weight: '1-tier (approx 1kg)',
                          pastryAddon: '',
                          pastryQty: '1 pc',
                          pastryEggPref: 'Eggless',
                        });
                        setPastryFile(null);
                      }}
                      className="w-full sm:w-1/2 py-3.5 bg-chocolate text-cream font-inter text-xs tracking-widest uppercase rounded-full hover:bg-gold-dark transition-colors font-bold shadow-sm"
                    >
                      Done / Close Receipt
                    </button>
                  </div>
                </div>
              ) : !showOrderForm ? (
                <div className="grid grid-cols-1 md:grid-cols-2">
                  
                  {/* Modal Visual Left */}
                  <div className="h-64 md:h-auto min-h-[300px] relative bg-cream-dark">
                    <img 
                      src={selectedCake.image} 
                      alt={selectedCake.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-chocolate/40 via-transparent to-transparent" />
                  </div>

                  {/* Modal Info Right */}
                  <div className="p-8 md:p-12 flex flex-col justify-between bg-cream">
                    <div>
                      <span className="text-gold text-xs tracking-widest uppercase font-bold font-inter">Chef's Selection</span>
                      <h3 className="text-3xl md:text-4xl font-playfair font-bold text-chocolate mt-2">
                        {selectedCake.title}
                      </h3>
                      <p className="text-xs text-chocolate/50 font-inter tracking-wider uppercase mt-0.5">
                        {selectedCake.subtitle}
                      </p>
                      <span className="inline-block mt-4 text-2xl font-playfair text-gold font-bold">
                        {selectedCake.price}
                      </span>

                      <p className="text-sm text-chocolate/80 font-inter mt-6 leading-relaxed">
                        {selectedCake.desc}
                      </p>

                      {/* Chef Tasting Notes */}
                      <div className="mt-6 p-4 rounded-2xl bg-rose border border-rose-dark/20 text-chocolate/70 text-xs font-inter leading-relaxed italic">
                        <strong>Tasting Notes:</strong> {selectedCake.notes}
                      </div>

                      {/* Ingredients list tags */}
                      <div className="mt-6">
                        <h4 className="text-xs tracking-widest text-chocolate font-bold uppercase mb-2">Prime Ingredients</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCake.ingredients.map((ing, i) => (
                            <span key={i} className="px-3 py-1 bg-white/80 border border-chocolate/5 rounded-full text-[10px] text-chocolate/70 font-mono">
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Ordering Details CTA */}
                    <div className="mt-8 pt-6 border-t border-chocolate/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <div className="flex gap-4 text-left text-xs font-mono text-chocolate/50">
                        <div>
                          <span className="block font-bold text-chocolate/70">Wait Time</span>
                          {selectedCake.specs.time}
                        </div>
                        <div className="border-l border-chocolate/10 pl-4">
                          <span className="block font-bold text-chocolate/70">Weight</span>
                          {selectedCake.specs.weight}
                        </div>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(212,163,115,0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowOrderForm(true)}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full font-inter text-xs tracking-widest uppercase shadow-premium transition-colors font-bold"
                        style={{ background: '#3d2314', color: '#fff8f0' }}
                      >
                        Proceed to Details ➔
                      </motion.button>
                    </div>

                  </div>

                </div>
              ) : (
                /* ── GLASSMORPHIC SPLIT CHECKOUT MODAL ── */
                <div className="flex flex-col md:flex-row animate-fade-in" style={{ minHeight: '420px' }}>

                  {/* ── LEFT: Cake Visual + Cursive Branding ── */}
                  <div className="md:w-2/5 relative overflow-hidden flex flex-col justify-between p-6" style={{ minHeight: '260px' }}>
                    <img
                      src={selectedCake.image}
                      alt={selectedCake.title}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                    <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)' }} />
                    
                    <div className="relative z-20">
                      <span className="text-[10px] font-bold tracking-[3px] uppercase font-inter text-[#e55b75]">
                        ✦ Selection
                      </span>
                    </div>

                    <div className="relative z-20 mt-auto">
                      <h3 className="text-xl font-playfair font-bold text-white leading-tight">{selectedCake.title}</h3>
                      <p className="text-sm font-bold font-inter text-white/90 mt-1">{selectedCake.price}</p>
                      
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <span className="font-playfair text-2xl text-white/90 font-normal italic">
                          Sweet Slice Studio
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── RIGHT: Multi-step Form ── */}
                  <div
                    className="md:w-3/5 p-7 overflow-y-auto text-white relative pr-6 md:pr-10"
                    style={{ background: 'rgba(255, 255, 255, 0.04)' }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/40 text-[9px] font-bold uppercase tracking-[2px]">Complete Order</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-inter transition-all ${formStep === 1 ? 'bg-[#e55b75] text-white' : 'bg-[#e55b75]/20 text-[#e55b75]'}`}>1</div>
                        <div className={`w-6 h-0.5 transition-all ${formStep === 2 ? 'bg-[#e55b75]' : 'bg-white/15'}`} />
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-inter transition-all ${formStep === 2 ? 'bg-[#e55b75] text-white' : 'bg-white/10 text-white/40'}`}>2</div>
                      </div>
                    </div>
                    <p className="text-[10px] text-white/35 font-inter mb-5">
                      {formStep === 1 ? 'Step 1 of 2 — Order Specifications' : 'Step 2 of 2 — Delivery Details'}
                    </p>

                    <AnimatePresence mode="wait">
                    {formStep === 1 ? (
                      <motion.form key="fc-s1"
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
                                <input type="radio" name="eggPref" value="Eggless" checked={formData.eggPref === 'Eggless'} onChange={handleInputChange} className="accent-[#e55b75]" /> Eggless
                              </label>
                              <label className="flex items-center gap-1.5 cursor-pointer text-xs text-white font-inter whitespace-nowrap">
                                <input type="radio" name="eggPref" value="With Egg" checked={formData.eggPref === 'With Egg'} onChange={handleInputChange} className="accent-[#e55b75]" /> With Egg
                              </label>
                            </div>
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Weight / Size</label>
                            <select name="weight" value={formData.weight} onChange={handleInputChange as any} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-inter outline-none focus:border-[#e55b75] transition-all">
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
                                value={formData.pastryAddon}
                                onChange={handleInputChange}
                                placeholder="e.g. Choco Truffle, Red Velvet"
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-inter outline-none focus:border-[#e55b75]"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1 font-inter">Quantity</label>
                              <select
                                name="pastryQty"
                                value={formData.pastryQty}
                                onChange={handleInputChange as any}
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
                                  <input type="radio" name="pastryEggPref" value="Eggless" checked={formData.pastryEggPref === 'Eggless'} onChange={handleInputChange} className="accent-[#e55b75]" /> Eggless
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer text-[11px] text-white font-inter whitespace-nowrap">
                                  <input type="radio" name="pastryEggPref" value="With Egg" checked={formData.pastryEggPref === 'With Egg'} onChange={handleInputChange} className="accent-[#e55b75]" /> With Egg
                                </label>
                              </div>
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1 font-inter">Pastry Ref Image</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={e => setPastryFile(e.target.files?.[0] || null)}
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white/60 font-inter file:mr-2 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:text-[9px] file:bg-white/10 file:text-white cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 flex justify-between items-center">
                          <button type="button" onClick={() => setShowOrderForm(false)}
                            className="text-white/40 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">← Back</button>
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit"
                            className="px-8 py-3 rounded-full text-xs font-bold font-inter tracking-widest uppercase bg-[#e55b75] text-white hover:bg-[#d84e68] transition-all flex items-center gap-2">
                            Next: Delivery Details <span>→</span>
                          </motion.button>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.form key="fc-s2"
                        initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}
                        className="space-y-4"
                        onSubmit={submitOrder}
                      >
                        <h3 className="text-sm font-playfair font-bold text-[#e55b75] border-b border-white/10 pb-2">📦 Delivery Details</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Customer Name</label>
                            <input required type="text" name="name" value={formData.name} onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter placeholder-white/20 outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all"
                              placeholder="Priya Sharma" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Contact Number</label>
                            <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter placeholder-white/20 outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all"
                              placeholder="+91 91726 33991" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Shipping Address</label>
                          <input required type="text" name="address" value={formData.address} onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter placeholder-white/20 outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all"
                            placeholder="Complete street address, area, city, pincode" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Delivery Date</label>
                            <input required type="date" name="date" value={formData.date} onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Delivery Time</label>
                            <input required type="time" name="time" value={formData.time} onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-inter outline-none focus:border-[#e55b75] focus:bg-white/10 transition-all" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1.5 font-inter">Special Note (Optional)</label>
                          <input name="notes" value={formData.notes} onChange={handleInputChange}
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

                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default FeaturedCakes;




