import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Calendar, MapPin, CreditCard, Loader } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

interface TravelPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  returnDate: string;
  interests: string[];
  budget: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const TravelPlanModal: React.FC<TravelPlanModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    returnDate: '',
    interests: [],
    budget: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const { showNotification } = useNotification();

  const interests = [
    'Historical Tours',
    'Adventure Sports',
    'Relaxation',
    'Food Experiences',
    'Cultural Immersion',
    'Nature & Wildlife'
  ];

  const budgetOptions = [
    { value: 'budget', label: 'Budget ($50-100/day)' },
    { value: 'mid', label: 'Mid-range ($100-200/day)' },
    { value: 'luxury', label: 'Luxury ($200+/day)' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.departureCity && formData.arrivalCity && formData.departureDate && formData.returnDate;
      case 2:
        return formData.interests.length > 0 && formData.budget;
      case 3:
        return formData.cardNumber && formData.expiryDate && formData.cvv;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      showNotification('error', 'Please fill in all required fields');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      showNotification('error', 'Please fill in all payment details');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      showNotification('success', 'Payment successful! Your travel plan is being generated.');
      
      setTimeout(() => {
        onClose();
        setCurrentStep(1);
        setFormData({
          departureCity: '',
          arrivalCity: '',
          departureDate: '',
          returnDate: '',
          interests: [],
          budget: '',
          cardNumber: '',
          expiryDate: '',
          cvv: ''
        });
        
        // Show generated plan notification
        showNotification('info', 'Your personalized travel plan is ready! Check your email for details.');
      }, 1000);
    } catch (error) {
      showNotification('error', 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setCurrentStep(1);
    setFormData({
      departureCity: '',
      arrivalCity: '',
      departureDate: '',
      returnDate: '',
      interests: [],
      budget: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Crown className="w-6 h-6 text-yellow-500" />
              <div>
                <h2 className="text-2xl font-bold text-primary-600">Generate Travel Plan</h2>
                <p className="text-sm text-gray-600">Premium Service - $29.99</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of 3</span>
              <span className="text-sm text-gray-500">
                {currentStep === 1 && 'Flight Information'}
                {currentStep === 2 && 'Travel Preferences'}
                {currentStep === 3 && 'Payment Details'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {/* Step 1: Flight Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Departure City
                    </label>
                    <input
                      name="departureCity"
                      type="text"
                      value={formData.departureCity}
                      onChange={handleInputChange}
                      placeholder="e.g., New York"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Arrival City
                    </label>
                    <input
                      name="arrivalCity"
                      type="text"
                      value={formData.arrivalCity}
                      onChange={handleInputChange}
                      placeholder="e.g., Paris"
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Departure Date
                    </label>
                    <input
                      name="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Return Date
                    </label>
                    <input
                      name="returnDate"
                      type="date"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Travel Preferences */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Interests (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {interests.map((interest) => (
                      <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select Budget</option>
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Secure Payment</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your payment information is encrypted and secure.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    name="cardNumber"
                    type="text"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      name="expiryDate"
                      type="text"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      name="cvv"
                      type="text"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="input-field"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-100">
            <div className="flex space-x-3">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="btn-outline"
                >
                  Back
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-primary-600">$29.99</span>
              {currentStep < 3 ? (
                <button onClick={handleNext} className="btn-primary">
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="btn-primary flex items-center space-x-2"
                >
                  {isLoading && <Loader className="w-4 h-4 animate-spin" />}
                  <span>{isLoading ? 'Processing...' : 'Generate Plan'}</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TravelPlanModal;