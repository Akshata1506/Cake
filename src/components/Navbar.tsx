import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const doScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(doScroll, 500);
    } else {
      // Delay scroll so mobile menu exit animation finishes
      setTimeout(doScroll, 400);
    }
  };

  const navLinks = [
    { label: 'Home', action: () => { setMobileOpen(false); if (location.pathname !== '/') { navigate('/'); } setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 400); } },
    { label: 'Menu', action: () => scrollToSection('signatures') },
    { label: 'About Us', action: () => scrollToSection('process') },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 px-6 md:px-12 py-4 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md shadow-sm border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/logo.png"
            alt="Sweet Slice Logo"
            className="w-9 h-9 rounded-full object-cover"
            style={{ border: '1.5px solid rgba(229,91,117,0.25)' }}
          />
          <div className="min-w-0">
            <span className="font-playfair text-sm md:text-lg font-bold tracking-[1px] md:tracking-[2px] text-white block leading-none truncate">
              Sweet Slice
            </span>
            <span className="text-[6px] md:text-[7px] tracking-[2px] md:tracking-[3px] uppercase text-[#e55b75]/60 block font-bold">
              Cake & Cream
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase font-bold font-inter text-white/60">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="hover:text-[#e55b75] transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e55b75] transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
          ))}
          <Link
            to="/all-cakes"
            className="hover:text-[#e55b75] transition-colors relative group"
          >
            All Pastries
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e55b75] transition-all duration-300 group-hover:w-full rounded-full" />
          </Link>
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link to="/customize">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(229,91,117,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:block px-5 py-2.5 font-inter text-[10px] tracking-widest uppercase rounded-full font-bold shadow-sm"
              style={{ background: '#e55b75', color: '#fff', border: '1px solid rgba(229,91,117,0.4)' }}
            >
              Order Now
            </motion.button>
          </Link>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden backdrop-blur-md border-t border-white/10 mt-4 rounded-2xl"
            style={{ background: 'rgba(5,5,5,0.97)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="text-left text-xs font-bold tracking-widest uppercase text-white/60 hover:text-[#e55b75] transition-colors py-2 border-b border-white/5"
                >
                  {link.label}
                </button>
              ))}
              <Link to="/all-cakes" onClick={() => setMobileOpen(false)} className="text-left text-xs font-bold tracking-widest uppercase text-white/60 hover:text-[#e55b75] transition-colors py-2 border-b border-white/5">
                All Pastries
              </Link>
              <Link to="/customize" onClick={() => setMobileOpen(false)}>
                <button className="w-full mt-2 py-3 font-inter text-xs tracking-widest uppercase rounded-full font-bold" style={{ background: '#e55b75', color: '#fff' }}>
                  Order Now
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
export default Navbar;
