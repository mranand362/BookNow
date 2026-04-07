import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaFileUpload,
  FaPaperPlane,
  FaCheckCircle,
  FaArrowLeft,
  FaRegFileAlt,
} from 'react-icons/fa';

// Constants
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const Apply = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobTitleFromQuery = new URLSearchParams(location.search).get('job') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: jobTitleFromQuery,
    coverLetter: '',
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s+\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.resume) newErrors.resume = 'Please upload your resume';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        resume: 'Please upload a PDF or Word document',
      }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        resume: 'File size must be less than 5MB',
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, resume: file }));
    setResumeFileName(file.name);
    if (errors.resume) setErrors((prev) => ({ ...prev, resume: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', {
        ...formData,
        resume: formData.resume?.name,
      });
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-100"
        >
          <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-green-500 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Application Submitted!
          </h2>
          <p className="text-slate-600 mb-6">
            Thank you for applying. We'll review your application and get back to you soon.
          </p>
          <button
            onClick={() => navigate('/jobs')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-sm"
          >
            <FaArrowLeft /> Back to Jobs
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[320px] bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')` }}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl text-slate-100"
          >
            Take the next step in your career. We're excited to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Form Card */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-semibold text-white">Application Form</h2>
            <p className="text-blue-100 text-sm mt-1">Please complete all required fields</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className={`relative transition-all duration-200 ${focusedField === 'fullName' ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none transition ${
                      errors.fullName ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                <AnimatePresence>
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.fullName}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email */}
              <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className={`relative transition-all duration-200 ${focusedField === 'email' ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none transition ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Phone */}
              <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className={`relative transition-all duration-200 ${focusedField === 'phone' ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none transition ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'
                    }`}
                    placeholder="+1 234 567 890"
                  />
                </div>
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Position */}
              <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Position Applying For <span className="text-red-500">*</span>
                </label>
                <div className={`relative transition-all duration-200 ${focusedField === 'position' ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
                  <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('position')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none transition ${
                      errors.position ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'
                    }`}
                    placeholder="e.g., Frontend Developer"
                  />
                </div>
                <AnimatePresence>
                  {errors.position && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.position}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Resume Upload */}
            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Resume/CV <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className={`flex items-center justify-between w-full border rounded-xl p-3 cursor-pointer transition ${
                    errors.resume ? 'border-red-500 bg-red-50' : 'border-slate-300 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FaFileUpload className={`text-lg ${errors.resume ? 'text-red-500' : 'text-blue-500'}`} />
                    <span className={`text-sm ${resumeFileName ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                      {resumeFileName || 'Choose file (PDF, DOC, DOCX up to 5MB)'}
                    </span>
                  </div>
                  <span className="text-blue-600 text-sm font-medium bg-blue-50 px-3 py-1 rounded-lg">Browse</span>
                </label>
              </div>
              <AnimatePresence>
                {errors.resume && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.resume}
                  </motion.p>
                )}
              </AnimatePresence>
              <p className="text-slate-400 text-xs mt-2 flex items-center gap-1">
                <FaRegFileAlt className="text-xs" /> Accepted formats: PDF, DOC, DOCX (max 5MB)
              </p>
            </motion.div>

            {/* Cover Letter */}
            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                rows={5}
                value={formData.coverLetter}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Tell us why you're a great fit for this role..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={fadeInUp}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Submit Application
                  </>
                )}
              </button>
            </motion.div>

            {errors.submit && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl"
              >
                {errors.submit}
              </motion.div>
            )}
          </form>
        </motion.div>
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

export default Apply;