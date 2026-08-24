import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import FeaturedCakes from '../components/FeaturedCakes';
import Timeline from '../components/Timeline';
import Testimonials from '../components/Testimonials';

const Home: React.FC = () => {
  // Scroll to top on every page reload/mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <section id="hero">
        <Hero />
      </section>

      <section id="signatures">
        <FeaturedCakes />
      </section>

      <section id="process">
        <Timeline />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>
    </div>
  );
};

export default Home;
