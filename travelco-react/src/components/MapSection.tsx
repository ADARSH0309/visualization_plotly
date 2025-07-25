import React from 'react';
import { motion } from 'framer-motion';

const MapSection: React.FC = () => {
  return (
    <section id="map-section" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explore with <span className="text-gradient">Interactive Maps</span>
          </h2>
          <p className="text-xl text-gray-600">
            Navigate your next adventure
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;