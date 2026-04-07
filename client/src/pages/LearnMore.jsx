import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaBuilding,
  FaChalkboardTeacher,
  FaUniversity,
  FaShip,
  FaCheckCircle,
  FaRegHandshake,
  FaChartLine,
  FaMobileAlt,
  FaClock,
  FaRocket,
} from 'react-icons/fa';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' },
  hover: { scale: 1.02, y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.2)' },
};

const LearnMore = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const audiences = [
    {
      title: 'Organizers / Promoters',
      icon: <FaBuilding className="text-2xl" />,
      color: 'from-blue-500 to-indigo-600',
      bgGradient: 'bg-white/90 backdrop-blur-sm',
      description:
        'Take full control of your event ticketing. Our platform provides a complete solution for selling tickets, scanning entries via a mobile app, and receiving payments directly. No hidden fees, no complex setups—just seamless event management.',
      features: [
        'Real‑time ticket sales dashboard',
        'Mobile app for instant QR code scanning',
        'Direct payment transfers to your account',
        'Customizable ticket types and discounts',
        'Automated waitlist management',
      ],
    },
    {
      title: 'Venues',
      icon: <FaChalkboardTeacher className="text-2xl" />,
      color: 'from-green-500 to-emerald-600',
      bgGradient: 'bg-white/90 backdrop-blur-sm',
      description:
        'Flexible seating management for any event size. Our system lets you create dynamic seating plans, split sections, and assign different price tiers per day or area. Perfect for concert halls, theaters, and multi‑purpose venues.',
      features: [
        'Drag‑and‑drop seating chart builder',
        'Multi‑day pricing and capacity control',
        'Easy section breakdown and reconfiguration',
        'Integrated check‑in with venue staff access',
        'Real‑time occupancy analytics',
      ],
    },
    {
      title: 'Schools',
      icon: <FaUniversity className="text-2xl" />,
      color: 'from-purple-500 to-pink-600',
      bgGradient: 'bg-white/90 backdrop-blur-sm',
      description:
        'Streamline your school events from talent shows to graduation ceremonies. Ensure every family gets a ticket with our simple booking process. Manage allocations, parent permissions, and event schedules all in one place.',
      features: [
        'Per‑student ticket allocation',
        'Parent/guardian purchase tracking',
        'Event calendar and automated reminders',
        'Printable tickets and digital passes',
        'Integration with school management systems',
      ],
    },
    {
      title: 'Tours & Experiences',
      icon: <FaShip className="text-2xl" />,
      color: 'from-orange-500 to-red-600',
      bgGradient: 'bg-white/90 backdrop-blur-sm',
      description:
        'Focus on delivering unforgettable experiences while we handle bookings. Whether it’s boat trips, food tours, or daily excursions, our platform maximizes your occupancy with smart scheduling and easy customer management.',
      features: [
        'Capacity‑based booking with instant confirmation',
        'Multi‑session scheduling and waitlists',
        'Customer data collection for marketing',
        'Integration with calendar and payment gateways',
        'Automated post‑experience feedback',
      ],
    },
  ];

  const benefits = [
    {
      title: 'Real‑time Analytics',
      icon: <FaChartLine className="text-2xl" />,
      description:
        'Monitor ticket sales, attendance, and revenue in real time with our comprehensive dashboard.',
    },
    {
      title: 'Mobile‑First',
      icon: <FaMobileAlt className="text-2xl" />,
      description:
        'Fully responsive design and dedicated scanning app for seamless on‑site check‑ins.',
    },
    {
      title: '24/7 Support',
      icon: <FaRegHandshake className="text-2xl" />,
      description:
        'Our dedicated support team is always ready to help you with any questions or issues.',
    },
    {
      title: 'Flexible Scheduling',
      icon: <FaClock className="text-2xl" />,
      description:
        'Set up events in minutes with our intuitive scheduling tools and automated reminders.',
    },
  ];

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-fixed overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Subtle animated blobs (optional, but can remain) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-400/10 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 text-xs font-semibold tracking-wider text-white bg-blue-600/80 rounded-full mb-4">
            OUR SOLUTIONS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Learn More About How We Empower
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
              Every Experience
            </span>
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Discover how our platform adapts to your unique needs, providing powerful tools for event organizers, venues, schools, and tour operators.
          </p>
        </motion.div>

        {/* Audience Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {audiences.map((audience, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${audience.bgGradient}`}
            >
              <motion.div
                variants={cardHover}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${audience.color} text-white shadow-md`}
                  >
                    {audience.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{audience.title}</h2>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{audience.description}</p>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> Key Features
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {audience.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-gray-600 text-sm">
                        <FaCheckCircle className="text-green-500 text-xs mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-white/20"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center group">
                <div className="inline-flex p-4 bg-white/20 rounded-full text-white mb-4 group-hover:scale-110 transition-transform duration-200">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/80 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/contact')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center gap-2"
          >
            <FaRocket className="text-lg" />
            Get Started Today
          </motion.button>
          <p className="text-white/70 text-sm mt-4">
            No credit card required. Free trial for 14 days.
          </p>
        </motion.div>
      </div>

      {/* Blob animation keyframes */}
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
    </section>
  );
};

export default LearnMore;