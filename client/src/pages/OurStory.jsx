import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  FaHeart,
  FaLightbulb,
  FaUsers,
  FaRocket,
  FaCalendarAlt,
  FaChartLine,
  FaGlobe,
  FaArrowRight,
  FaHandshake,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa';

const OurStory = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Statistics
  const stats = [
    { value: 5000, label: 'Events Powered', suffix: '+' },
    { value: 2.5, label: 'Million Tickets', suffix: 'M+' },
    { value: 50, label: 'Countries', suffix: '+' },
    { value: 99, label: 'Customer Satisfaction', suffix: '%' },
  ];

  // Milestones - now in card format
  const milestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Founded with a mission to simplify event ticketing and management.',
      icon: <FaRocket />,
    },
    {
      year: '2021',
      title: 'First 1,000 Events',
      description: 'Powered over 1,000 events across North America.',
      icon: <FaChartLine />,
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Expanded operations to 15 countries across Europe and Asia.',
      icon: <FaGlobe />,
    },
    {
      year: '2023',
      title: '1 Million Tickets Sold',
      description: 'Reached the milestone of one million tickets processed.',
      icon: <FaCalendarAlt />,
    },
    {
      year: '2024',
      title: 'AI-Powered Insights',
      description: 'Launched advanced analytics and AI-driven recommendations.',
      icon: <FaLightbulb />,
    },
  ];

  // Core values
  const values = [
    {
      title: 'Customer First',
      description: 'We put the needs of event organizers and attendees at the heart of everything we do.',
      icon: <FaHeart />,
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
    {
      title: 'Innovation',
      description: 'Constantly pushing boundaries to create smarter, simpler solutions.',
      icon: <FaLightbulb />,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
    },
    {
      title: 'Community',
      description: 'Building a global community of event creators and experience seekers.',
      icon: <FaUsers />,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      title: 'Integrity',
      description: 'Transparent, honest, and reliable in all our relationships.',
      icon: <FaHandshake />,
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
  ];

  // Team members
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      social: { twitter: '#', linkedin: '#', github: '#' },
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      social: { twitter: '#', linkedin: '#', github: '#' },
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      social: { twitter: '#', linkedin: '#', github: '#' },
    },
    {
      name: 'David Kim',
      role: 'Head of Sales',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      social: { twitter: '#', linkedin: '#', github: '#' },
    },
  ];

  // Counter component with animation
  const Counter = ({ value, label, suffix }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
      if (isInView) {
        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [isInView, value]);

    return (
      <div ref={ref} className="text-center">
        <div className="text-4xl font-bold text-gray-900">
          {count}
          {suffix}
        </div>
        <div className="text-sm text-gray-600 mt-1">{label}</div>
      </div>
    );
  };

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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Abstract background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section
        className="relative h-[70vh] min-h-[500px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl"
          >
            Empowering experiences around the world through innovation and passion.
          </motion.p>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            To empower every experience by providing innovative, seamless technology that connects people,
            simplifies event management, and unlocks the full potential of live gatherings.
          </p>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={fadeInUp}>
              <Counter value={stat.value} label={stat.label} suffix={stat.suffix} />
            </motion.div>
          ))}
        </motion.div>

        {/* Our Journey - New Card Grid Design */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            Our Journey
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
                    {milestone.icon}
                  </div>
                  <span className="text-3xl font-bold text-blue-600">{milestone.year}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className={`${value.bg} rounded-2xl p-6 text-center transition-all duration-300 shadow-md hover:shadow-xl`}
              >
                <div className={`inline-flex p-3 rounded-full ${value.bg} text-3xl ${value.color} mb-3`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet the Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover shadow-md group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/20 group-hover:to-indigo-600/20 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600 mb-3">{member.role}</p>
                <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.social.twitter} className="text-gray-500 hover:text-blue-500 transition-colors">
                    <FaTwitter size={18} />
                  </a>
                  <a href={member.social.linkedin} className="text-gray-500 hover:text-blue-700 transition-colors">
                    <FaLinkedin size={18} />
                  </a>
                  <a href={member.social.github} className="text-gray-500 hover:text-gray-900 transition-colors">
                    <FaGithub size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

       <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="relative text-center rounded-2xl p-8 md:p-12 shadow-xl bg-cover bg-center"
style={{
  backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')`,
}}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>

  {/* Content */}
  <div className="relative z-10">
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
      Join Our Journey
    </h2>

    <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
      Be part of a community that’s shaping the future of events. Whether you're an organizer, venue, or partner, we’re here to help you succeed.
    </p>

    <button
      onClick={() => navigate('/contact')}
      className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
    >
      Get in Touch
      <FaArrowRight />
    </button>
  </div>
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
    </div>
  );
};

export default OurStory;