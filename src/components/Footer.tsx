import React from 'react';
import { ChefHat } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-chocolate text-cream py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 border-t border-chocolate-dark w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8 w-full">
        
        {/* Col 1: Brand details */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-cream text-chocolate flex items-center justify-center border border-gold">
              <ChefHat className="w-5 h-5 text-gold" />
            </div>
            <div>
              <span className="font-playfair text-lg font-bold tracking-[2px] text-cream block">
                L'ANTIGRAVITÉ
              </span>
              <span className="text-[7px] tracking-[3px] uppercase text-cream/50 block font-bold mt-[-2px]">
                HAUTE PÂTISSERIE
              </span>
            </div>
          </div>
          <p className="text-xs font-inter text-cream/60 max-w-sm leading-relaxed">
            Crafting premium, sculpture-like gateaux and fine pastries in the heart of Paris. Inspired by high-end design, natural forms, and pure organic flavors.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 pt-2">
            <a href="#" className="w-8 h-8 rounded-full border border-cream/20 hover:border-gold hover:text-gold flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-cream/20 hover:border-gold hover:text-gold flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-cream/20 hover:border-gold hover:text-gold flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Useful Links */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest uppercase text-gold font-inter">Explore</h4>
          <ul className="space-y-2 text-xs font-inter text-cream/60">
            <li><a href="#" className="hover:text-cream transition-colors">The Storytelling Journey</a></li>
            <li><a href="#" className="hover:text-cream transition-colors">Our Signature Cakes</a></li>
            <li><a href="#" className="hover:text-cream transition-colors">Pastry Craft Process</a></li>
            <li><a href="#" className="hover:text-cream transition-colors">Catering & Special Events</a></li>
          </ul>
        </div>

        {/* Col 3: Newsletter */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest uppercase text-gold font-inter">Newsletter</h4>
          <p className="text-xs font-inter text-cream/60 leading-relaxed">
            Subscribe to receive exclusive invitations to seasonal tastings and tasting events.
          </p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-3 py-2 bg-cream/10 border border-cream/10 rounded-l-lg text-xs font-inter text-cream focus:outline-none focus:border-gold w-full"
            />
            <button className="px-4 py-2 bg-gold hover:bg-gold-dark text-chocolate hover:text-white rounded-r-lg text-xs font-bold font-inter tracking-wider uppercase transition-colors">
              Join
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-cream/40">
        <div>
          © {new Date().getFullYear()} L'Antigravité. All Rights Reserved.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
