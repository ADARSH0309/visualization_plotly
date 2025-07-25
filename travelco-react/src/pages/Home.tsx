import React from 'react';
import HeroSection from '../components/HeroSection';
import PlanSection from '../components/PlanSection';
import TestimonialsSection from '../components/TestimonialsSection';
import TravelBuddySection from '../components/TravelBuddySection';
import DestinationsSection from '../components/DestinationsSection';
import GallerySection from '../components/GallerySection';
import MapSection from '../components/MapSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const Home: React.FC = () => {
  return (
    <div className="pt-16">
      <HeroSection />
      <PlanSection />
      <TestimonialsSection />
      <TravelBuddySection />
      <DestinationsSection />
      <GallerySection />
      <MapSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Home;