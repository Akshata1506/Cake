import React from 'react';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 px-6 md:px-12" style={{ background: '#fdf8f5' }}>
      <div className="max-w-5xl mx-auto text-center">

        <span className="text-xs font-bold tracking-[4px] uppercase font-inter" style={{ color: '#d4a373' }}>
          Get in Touch
        </span>
        <h2 className="text-4xl md:text-5xl font-playfair font-bold mt-2 mb-4" style={{ color: '#3d2314' }}>
          Contact Us
        </h2>
        <p className="font-inter text-sm mb-12 max-w-xl mx-auto" style={{ color: 'rgba(61,35,20,0.6)' }}>
          Have questions about your order? Reach us directly on WhatsApp for the fastest response.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { Icon: MapPin,       title: 'Our Bakery',      value: 'Mumbai, Maharashtra' },
            { Icon: Phone,        title: 'Call / WhatsApp', value: '+91 91726 33991' },
            { Icon: MessageCircle,title: 'WhatsApp Orders', value: 'Instant Confirmation' },
            { Icon: Clock,        title: 'Working Hours',   value: 'Mon – Sun: 8am – 9pm' },
          ].map(({ Icon, title, value }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl transition-all hover:-translate-y-1"
              style={{ background: '#fff', border: '1px solid rgba(212,163,115,0.2)', boxShadow: '0 4px 20px rgba(61,35,20,0.06)' }}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: 'rgba(212,163,115,0.12)' }}>
                <Icon className="w-5 h-5" style={{ color: '#d4a373' }} />
              </div>
              <h4 className="text-[10px] font-bold uppercase tracking-[2px] font-inter" style={{ color: 'rgba(61,35,20,0.5)' }}>{title}</h4>
              <p className="text-sm font-semibold font-inter text-center" style={{ color: '#3d2314' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/919172633991?text=Hi! I'd like to place a cake order."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-inter font-bold text-sm tracking-widest uppercase shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          style={{ background: '#25D366', color: '#fff' }}
        >
          <MessageCircle className="w-5 h-5" />
          Order on WhatsApp
        </a>
      </div>
    </section>
  );
};
export default Contact;
