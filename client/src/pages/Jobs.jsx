import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  FaHeart,
  FaLaptopCode,
  FaUsers,
  FaRocket,
  FaChartLine,
  FaGlobe,
  FaArrowRight,
  FaHandshake,
  FaCoffee,
  FaHome,
  FaGraduationCap,
  FaCalendarAlt,
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaQuoteLeft,
} from 'react-icons/fa';

const Jobs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Statistics
  const stats = [
    { value: 200, label: 'Team Members', suffix: '+' },
    { value: 30, label: 'Nationalities', suffix: '+' },
    { value: 85, label: 'Employee Satisfaction', suffix: '%' },
    { value: 25, label: 'Countries Served', suffix: '' },
  ];

  // Open positions
  const positions = [
    {
      title: 'Senior Frontend Developer',
      location: 'Remote (Global)',
      type: 'Full-time',
      department: 'Engineering',
      description: 'Build responsive, high-performance web applications using React and modern frontend tools.',
    },
    {
      title: 'Product Manager',
      location: 'New York, NY',
      type: 'Full-time',
      department: 'Product',
      description: 'Lead product strategy and collaborate with cross-functional teams to deliver exceptional experiences.',
    },
    {
      title: 'Marketing Specialist',
      location: 'London, UK',
      type: 'Full-time',
      department: 'Marketing',
      description: 'Drive brand awareness and user acquisition through innovative campaigns.',
    },
    {
      title: 'Customer Success Manager',
      location: 'Remote (EMEA)',
      type: 'Full-time',
      department: 'Customer Success',
      description: 'Ensure customers achieve their goals and derive maximum value from our platform.',
    },
    {
      title: 'Backend Engineer (Python)',
      location: 'Berlin, Germany',
      type: 'Full-time',
      department: 'Engineering',
      description: 'Design and maintain scalable backend services powering our event ticketing system.',
    },
    {
      title: 'Data Analyst',
      location: 'Remote (North America)',
      type: 'Full-time',
      department: 'Data',
      description: 'Turn data into actionable insights to guide business decisions.',
    },
  ];

  // Company values
  const values = [
    {
      title: 'Innovation First',
      description: 'We embrace new ideas and technology to solve real-world problems.',
      icon: <FaLaptopCode />,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      title: 'User-Centric',
      description: 'Everything we do starts and ends with our users – both organizers and attendees.',
      icon: <FaHeart />,
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
    {
      title: 'Collaboration',
      description: 'We believe great things happen when diverse teams work together.',
      icon: <FaUsers />,
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      title: 'Continuous Growth',
      description: 'Learning never stops. We invest in our team’s personal and professional development.',
      icon: <FaGraduationCap />,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
  ];

  // Perks & Benefits
  const perks = [
    { icon: <FaHome />, title: 'Remote-First', description: 'Work from anywhere with flexible hours.' },
    { icon: <FaCoffee />, title: 'Wellness Stipend', description: 'Monthly budget for gym, meditation, or hobbies.' },
    { icon: <FaGraduationCap />, title: 'Learning Budget', description: 'Courses, conferences, and books covered.' },
    { icon: <FaChartLine />, title: 'Stock Options', description: 'Share in the company’s success.' },
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Alex Rivera',
      role: 'Senior Frontend Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      text: 'The culture here is incredible. I’ve grown so much as an engineer, and I genuinely enjoy coming to work every day.',
    },
    {
      name: 'Jamie Lee',
      role: 'Product Manager',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      text: 'We’re building something meaningful. The autonomy and trust from leadership make it a fantastic place to innovate.',
    },
    {
      name: 'Morgan Chen',
      role: 'Customer Success Manager',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      text: 'I love how much we care about our customers. The team is supportive, and we celebrate wins together.',
    },
  ];

  // Counter animation
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

      {/* Hero Section with Background Image */}
      <section
        className="relative h-[70vh] min-h-[500px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl"
          >
            Help us shape the future of events. We're looking for passionate people to join our mission.
          </motion.p>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Why Join Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Join Us?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're building a diverse, inclusive team that's passionate about creating amazing experiences.
            Here's what makes us different.
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

        {/* Core Values */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
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

        {/* Open Positions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {positions.map((position, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{position.title}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                    {position.department}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="flex-shrink-0" />
                    <span>{position.location}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaBriefcase className="flex-shrink-0" />
                    <span>{position.type}</span>
                  </p>
                </div>
                <p className="text-gray-600 text-sm mb-4">{position.description}</p>
                <button
                  onClick={() => navigate('/apply')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                >
                  Apply Now
                  <FaArrowRight className="text-xs" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Perks & Benefits */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Perks & Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-md p-6 text-center transition-all duration-300"
              >
                <div className="text-3xl text-blue-500 mb-3">{perk.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{perk.title}</h3>
                <p className="text-gray-600 text-sm">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Employee Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Team Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md p-6 text-center">
                <FaQuoteLeft className="text-gray-300 text-2xl mb-4 mx-auto" />
                <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                <div className="flex items-center justify-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
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
              Ready to Make an Impact?
            </h2>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our mission. Check out our open positions or reach out to us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/jobs')}
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
              >
                View All Jobs
                <FaArrowRight />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Recruiting
              </button>
            </div>
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

export default Jobs;