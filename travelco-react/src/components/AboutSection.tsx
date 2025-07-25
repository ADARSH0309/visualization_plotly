import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-gradient">TravelCo</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Founded with a passion for exploration and cultural exchange, TravelCo has been crafting 
            unforgettable travel experiences for adventurers worldwide. Our team of travel experts and 
            local guides work tirelessly to create personalized journeys that go beyond typical tourism.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;