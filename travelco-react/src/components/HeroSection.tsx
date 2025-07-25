import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plane, Route, Phone, ChevronDown } from 'lucide-react';
import TravelPlanModal from './TravelPlanModal';

const HeroSection: React.FC = () => {
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center hero-bg overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4"
          >
            <MapPin className="w-12 h-12 text-secondary-500 animate-bounce-slow" />
          </motion.div>
          
          <motion.div
            animate={{ 
              x: [0, 20, 40, 20, 0],
              y: [0, -10, 0, 10, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 left-1/4"
          >
            <Plane className="w-10 h-10 text-white" />
          </motion.div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Your Adventure{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-accent-400">
                  Begins Here
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed"
              >
                At TravelCo, we believe travel is the best way to discover life, cultures, and yourself. 
                With years of experience and a team of passionate explorers, we bring you carefully crafted 
                travel experiences across the globe.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => setIsPlanModalOpen(true)}
                  className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4"
                >
                  <Route className="w-5 h-5" />
                  <span>Generate Travel Plan</span>
                </button>
                
                <button className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4">
                  <Phone className="w-5 h-5" />
                  <span>Call Agent</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-96 lg:h-full flex items-center justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-64 h-64 lg:w-80 lg:h-80 border-2 border-white/20 rounded-full flex items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="w-48 h-48 lg:w-60 lg:h-60 border border-white/30 rounded-full flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-32 h-32 lg:w-40 lg:h-40 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <MapPin className="w-16 h-16 lg:w-20 lg:h-20 text-secondary-400" />
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-8 -right-8 w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center"
                >
                  <Plane className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-8 w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center"
                >
                  <Route className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-white/80"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Travel Plan Modal */}
      <TravelPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
      />
    </>
  );
};

export default HeroSection;