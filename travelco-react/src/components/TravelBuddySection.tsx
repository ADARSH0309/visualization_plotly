import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Shield } from 'lucide-react';

const TravelBuddySection: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Connect with Travelers',
      description: 'Find people visiting the same location on similar dates'
    },
    {
      icon: Calendar,
      title: 'Shared Experiences',
      description: 'Plan group activities and share memorable moments'
    },
    {
      icon: Shield,
      title: 'Safe & Verified',
      description: 'All users are verified for your safety and peace of mind'
    }
  ];

  return (
    <section id="travel-buddy" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Find Your <span className="text-gradient">Travel Buddy</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow travelers visiting the same destinations
          </p>
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
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary-200 transition-colors">
                <feature.icon className="w-8 h-8 text-secondary-600" />
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
          <button className="btn-primary text-xl px-12 py-4">
            Find Travel Buddies
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelBuddySection;