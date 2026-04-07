import React, { useState, useEffect, useCallback,  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHandshake,
  FaBuilding,
  FaChartLine,
  FaUsers,
  FaAward,
  FaGlobe,
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from 'react-icons/fa';

// Constants
const BENEFITS = [
  {
    id: 1,
    icon: FaUsers,
    title: 'Access to Our Community',
    description: 'Connect with thousands of active event-goers and professionals in your industry.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    icon: FaChartLine,
    title: 'Increased Visibility',
    description: 'Showcase your brand to a targeted audience through our marketing channels.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    icon: FaHandshake,
    title: 'Strategic Partnerships',
    description: 'Build meaningful relationships with other industry leaders and innovators.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 4,
    icon: FaAward,
    title: 'Brand Credibility',
    description: 'Enhance your brand reputation by associating with quality events.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 5,
    icon: FaGlobe,
    title: 'Global Reach',
    description: 'Expand your reach to international markets and diverse audiences.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    id: 6,
    icon: FaBuilding,
    title: 'Exclusive Opportunities',
    description: 'Get first access to speaking slots, sponsorships, and premium placements.',
    color: 'from-rose-500 to-rose-600',
  },
];

const PARTNERSHIP_TIERS = [
  {
    id: 1,
    name: 'Bronze Partner',
    price: '5,000',
    features: [
      'Logo placement on event website',
      'Social media mention (1 post)',
      '2 complimentary tickets',
      'Exhibitor booth (standard size)',
    ],
    recommended: false,
    color: 'from-amber-600 to-amber-700',
  },
  {
    id: 2,
    name: 'Silver Partner',
    price: '10,000',
    features: [
      'Premium logo placement on all materials',
      'Social media campaign (3 posts)',
      '5 complimentary tickets',
      'Premium exhibitor booth',
      'Speaking opportunity (15 min)',
      'Branded email to attendees',
    ],
    recommended: true,
    color: 'from-gray-400 to-gray-500',
  },
  {
    id: 3,
    name: 'Gold Partner',
    price: '25,000',
    features: [
      'Exclusive title sponsorship',
      'Full social media takeover',
      '10 complimentary tickets',
      'Premium corner booth',
      'Keynote speaking slot',
      'Dedicated email campaign',
      'VIP networking reception',
      'Brand integration in event app',
    ],
    recommended: false,
    color: 'from-yellow-500 to-yellow-600',
  },
];

const FAQS = [
  {
    id: 1,
    question: 'How long does the partnership last?',
    answer: 'Partnerships are typically annual agreements with options for renewal based on mutual satisfaction and goals.',
  },
  {
    id: 2,
    question: 'Can we customize our partnership package?',
    answer: 'Yes! We offer flexible, customized packages tailored to your specific needs and objectives.',
  },
  {
    id: 3,
    question: 'What kind of ROI can we expect?',
    answer: 'Our partners typically see a 3-5x ROI through increased brand visibility, lead generation, and networking opportunities.',
  },
  {
    id: 4,
    question: 'How are partnership benefits delivered?',
    answer: 'We provide a dedicated account manager who works with you to ensure all benefits are delivered effectively.',
  },
];

// Custom Hook for form handling
const usePartnerForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    companySize: '',
    partnershipTier: '',
    message: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.companySize) {
      newErrors.companySize = 'Please select company size';
    }

    if (!formData.partnershipTier && formData.partnershipTier !== 0) {
      newErrors.partnershipTier = 'Please select a partnership tier';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Partnership inquiry submitted:', formData);
      setSubmitStatus('success');
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        companySize: '',
        partnershipTier: '',
        message: '',
        agreeToTerms: false,
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
  };
};

// Subcomponents
const HeroSection = () => (
  <section className="relative h-[50vh] min-h-[400px] bg-cover bg-center" style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2000&q=80')`,
  }}>
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <FaHandshake className="text-5xl md:text-6xl text-blue-400" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
      >
        Partner With Us
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-lg md:text-xl max-w-3xl text-slate-200"
      >
        Join forces with us to create extraordinary experiences and unlock new opportunities
      </motion.p>
    </div>
  </section>
);

const BenefitCard = ({ benefit, index }) => {
  const Icon = benefit.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all"
    >
      <div className={`w-14 h-14 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className="text-2xl text-white" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{benefit.title}</h3>
      <p className="text-slate-600">{benefit.description}</p>
    </motion.div>
  );
};

const PartnershipTierCard = ({ tier, onSelect, isSelected }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all ${
        isSelected ? 'border-blue-500 shadow-xl' : 'border-slate-200 hover:shadow-xl'
      }`}
    >
      {tier.recommended && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-1 text-sm font-semibold">
          Recommended
        </div>
      )}
      <div className={`h-2 bg-gradient-to-r ${tier.color}`} />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{tier.name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold text-slate-900">{tier.price}</span>
          <span className="text-slate-500">/year</span>
        </div>
        <ul className="space-y-3 mb-6">
          {tier.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-600">{feature}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => onSelect(tier.id)}
          className={`w-full py-2 rounded-xl font-semibold transition-all ${
            isSelected
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white'
          }`}
        >
          {isSelected ? 'Selected' : 'Select Plan'}
        </button>
      </div>
    </motion.div>
  );
};

const FAQItem = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onToggle}
        className="w-full py-4 text-left flex justify-between items-center hover:text-blue-600 transition-colors"
      >
        <span className="font-semibold text-slate-800">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-slate-400"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-slate-600">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactInfo = () => {
  const contactDetails = [
    { icon: FaEnvelope, text: 'partnerships@eventhub.com', href: 'mailto:partnerships@eventhub.com' },
    { icon: FaPhone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: FaMapMarkerAlt, text: '123 Business Ave, San Francisco, CA 94105' },
    { icon: FaClock, text: 'Monday - Friday, 9:00 AM - 6:00 PM PST' },
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: '#', color: 'hover:bg-blue-600' },
    { icon: FaTwitter, href: '#', color: 'hover:bg-blue-400' },
    { icon: FaFacebook, href: '#', color: 'hover:bg-blue-700' },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Get in Touch</h3>
      <div className="space-y-4 mb-6">
        {contactDetails.map((detail, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <detail.icon className="text-blue-600 text-xl" />
            {detail.href ? (
              <a href={detail.href} className="text-slate-600 hover:text-blue-600 transition-colors">
                {detail.text}
              </a>
            ) : (
              <span className="text-slate-600">{detail.text}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        {socialLinks.map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            className={`w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-600 ${social.color} hover:text-white transition-all`}
          >
            <social.icon />
          </a>
        ))}
      </div>
    </div>
  );
};

// Main Component
const PartnersWithUs = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [openFaqId, setOpenFaqId] = useState(null);
  const { formData, errors, isSubmitting, submitStatus, handleChange, handleSubmit } = usePartnerForm();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (selectedTier && !formData.partnershipTier) {
      const tier = PARTNERSHIP_TIERS.find(t => t.id === selectedTier);
      if (tier) {
        // Create a synthetic event for the form change
        handleChange({
          target: { name: 'partnershipTier', value: tier.name }
        });
      }
    }
  }, [selectedTier, formData.partnershipTier, handleChange]);

  const toggleFaq = useCallback((id) => {
    setOpenFaqId(prev => prev === id ? null : id);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <HeroSection />

      {/* Benefits Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Why Partner With Us?
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Join a network of forward-thinking organizations and unlock exclusive benefits
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </div>
      </div>

      {/* Partnership Tiers Section */}
      <div className="relative z-10 bg-gradient-to-r from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Partnership Tiers
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Choose the perfect partnership level for your organization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PARTNERSHIP_TIERS.map((tier) => (
              <PartnershipTierCard
                key={tier.id}
                tier={tier}
                onSelect={setSelectedTier}
                isSelected={selectedTier === tier.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contact & Form Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ContactInfo />
          </motion.div>

          {/* Partnership Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Become a Partner</h3>
            
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700"
              >
                Thank you for your interest! Our team will contact you within 24 hours.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
              >
                Something went wrong. Please try again or contact us directly.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.companyName ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contactName ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.contactName && (
                  <p className="mt-1 text-sm text-red-500">{errors.contactName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Size *
                </label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.companySize ? 'border-red-500' : 'border-slate-300'
                  }`}
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
                {errors.companySize && (
                  <p className="mt-1 text-sm text-red-500">{errors.companySize}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Partnership Tier *
                </label>
                <select
                  name="partnershipTier"
                  value={formData.partnershipTier}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.partnershipTier ? 'border-red-500' : 'border-slate-300'
                  }`}
                >
                  <option value="">Select partnership tier</option>
                  {PARTNERSHIP_TIERS.map((tier) => (
                    <option key={tier.id} value={tier.name}>
                      {tier.name} - {tier.price}/year
                    </option>
                  ))}
                </select>
                {errors.partnershipTier && (
                  <p className="mt-1 text-sm text-red-500">{errors.partnershipTier}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us more about your partnership goals..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1"
                />
                <label className="text-sm text-slate-600">
                  I agree to the terms and conditions and consent to being contacted regarding partnership opportunities.
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Partnership Inquiry
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about partnering with us
            </p>
          </motion.div>

          <div className="space-y-2">
            {FAQS.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openFaqId === faq.id}
                onToggle={() => toggleFaq(faq.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default PartnersWithUs;