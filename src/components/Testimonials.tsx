import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, MessageCircle } from 'lucide-react';
import { getAssetPath } from '../utils/assets';

interface ReviewCard {
  id: number;
  image: string;
  name: string;
  review: string;
  rating: number;
  highlight: string;
}

const REVIEWS: ReviewCard[] = [
  {
    id: 1,
    image: getAssetPath('/girl_eating_cake.png'),
    name: "Anna Koval",
    review: "I've ordered with friends several times, everyone was delighted! Very delicate and rich cakes. Incredible berry layers and not too sweet—just pure bliss!",
    rating: 5,
    highlight: "Regular Happy Customer"
  }
];

const BAKERY_GALLERY = [
  { id: 1, title: "Artisanal Gift Box", image: getAssetPath("/cake_featured_1.png") },
  { id: 2, title: "Boutique Bakery Atmosphere", image: getAssetPath("/wedding_1.png") },
  { id: 3, title: "Fresh French Macarons", image: getAssetPath("/cake_featured_2.png") },
  { id: 4, title: "Handcrafted Cupcakes", image: getAssetPath("/wedding_2.png") }
];

export const Testimonials: React.FC = () => {
  const [activeReview, _setActiveReview] = useState(0);

  return (
    <section className="py-24 px-6 md:px-12 bg-cream-base relative overflow-hidden">
      {/* Background soft pink radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#F8C8DC]/30 filter blur-3xl pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Calligraphic Header in soft italic font matching reference */}
        <div className="text-center mb-16">
          <span className="text-[#FF8FAB] font-playfair italic text-xl md:text-2xl block mb-1">
            Why Our Guests Love Us
          </span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-[#4A4A4A]">
            Real Moments of Sweet Happiness
          </h2>
        </div>

        {/* Layout matching reference image: Girl Card Left + Bakery Grid Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Girl Eating Cake Photo Card with Review */}
          <div className="lg:col-span-5 flex">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-6 shadow-premium border border-[#F8C8DC]/40 flex flex-col justify-between w-full hover:shadow-premium-hover transition-shadow"
            >
              <div>
                {/* Girl Eating Cake Image */}
                <div className="relative h-72 md:h-80 w-full rounded-2xl overflow-hidden mb-6 shadow-sm bg-pink-soft/20">
                  <img 
                    src={REVIEWS[activeReview].image} 
                    alt={REVIEWS[activeReview].name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-[#FF8FAB] font-bold tracking-wider flex items-center gap-1 shadow-sm">
                    <Heart className="w-3.5 h-3.5 fill-[#FF8FAB]" />
                    Verified Taste Test
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 text-[#FF8FAB] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#4A4A4A] font-inter text-sm md:text-base leading-relaxed italic mb-4">
                  "{REVIEWS[activeReview].review}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="border-t border-[#F8C8DC]/30 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-playfair font-bold text-[#4A4A4A] text-base">
                    {REVIEWS[activeReview].name}
                  </h4>
                  <span className="text-xs text-[#FF8FAB] font-inter font-semibold">
                    {REVIEWS[activeReview].highlight}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#F8C8DC]/40 flex items-center justify-center text-[#FF8FAB]">
                  <MessageCircle className="w-4 h-4" />
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Side: 2x2 Bakery Experience Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="grid grid-cols-2 gap-4 flex-1">
              {BAKERY_GALLERY.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-sm border border-white group"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-playfair font-bold tracking-wide">
                      {item.title}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Soft Pink Pill Button CTA matching reference style */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#F8C8DC]/30 border border-[#F8C8DC] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div>
                <h4 className="font-playfair font-bold text-[#4A4A4A] text-lg">Want to taste the magic?</h4>
                <p className="text-xs text-[#4A4A4A]/70 font-inter">Explore our fresh daily baked collection & place an instant order.</p>
              </div>

              <a 
                href="#signatures" 
                className="px-6 py-3 bg-[#FF8FAB] hover:bg-[#FF7BA3] text-white font-inter text-xs font-bold tracking-widest uppercase rounded-full shadow-sm transition-all whitespace-nowrap"
              >
                Choose Your Cake
              </a>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
export default Testimonials;
