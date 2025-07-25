import React from 'react';
import { motion } from 'framer-motion';

const DestinationsSection: React.FC = () => {
  return (
    <section id="destinations" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explore <span className="text-gradient">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600">
            Discover amazing places around the world
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationsSection;