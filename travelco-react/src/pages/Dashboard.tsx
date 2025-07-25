import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Welcome back, <span className="text-gradient">{user?.name || 'Traveler'}!</span>
          </h1>
          <p className="text-xl text-gray-600">
            Manage your travel plans and connect with fellow adventurers
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;