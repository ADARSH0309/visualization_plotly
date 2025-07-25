import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Plane, Crown } from 'lucide-react';
import TravelPlanModal from './TravelPlanModal';

const PlanSection: React.FC = () => {
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: 'Day-by-Day Planning',
      description: 'Detailed itineraries optimized for your travel dates'
    },
    {
      icon: MapPin,
      title: 'Location-Based Activities',
      description: 'Curated experiences based on your interests'
    },
    {
      icon: Plane,
      title: 'Flight Integration',
      description: 'Plans synchronized with your arrival and departure'
    }
  ];

  return (
    <>
      <section id="plan-generator" className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Personalized Travel <span className="text-gradient">Planning</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Get a customized day-by-day itinerary tailored to your preferences
            </p>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full font-semibold">
              <Crown className="w-5 h-5" />
              <span>Premium Service</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card p-8 text-center group"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={() => setIsPlanModalOpen(true)}
              className="btn-primary text-xl px-12 py-4 shadow-lg hover:shadow-xl"
            >
              Start Planning - $29.99
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Secure payment • Instant delivery • 24/7 support
            </p>
          </motion.div>
        </div>
      </section>

      <TravelPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
      />
    </>
  );
};

export default PlanSection;