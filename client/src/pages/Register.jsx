import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner, FaTicketAlt, FaGoogle, FaFacebook } from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, verifyOTP } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getPasswordStrength();
  const strengthText = ['Weak', 'Fair', 'Good', 'Strong'][strength - 1] || '';
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'][strength] || '';

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!showOTP) {
        await register(name, email, password);
        setShowOTP(true);
        setError('');
      } else {
        await verifyOTP(email, otp);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      </div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 p-6 md:p-8"
      >
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="bg-blue-600/20 p-2 rounded-full"
          >
            <FaTicketAlt className="text-3xl text-blue-400" />
          </motion.div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Create an Account</h2>
          <p className="mt-1 text-sm text-gray-300">Join BookNow today</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-md backdrop-blur-sm text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!showOTP ? (
            <>
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-200 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    className="block w-full pl-9 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-200 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    className="block w-full pl-9 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-200 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="block w-full pl-9 pr-9 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-300" />
                    ) : (
                      <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-300" />
                    )}
                  </button>
                </div>
                {password && (
                  <div className="mt-1">
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strengthColor}`}
                          style={{ width: `${(strength / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-300">{strengthText}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Use at least 8 characters with uppercase, numbers, and symbols
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-2 mb-3 backdrop-blur-sm text-xs text-green-200">
                An OTP has been sent to your email. Please verify.
              </div>
              <label htmlFor="otp" className="block text-xs font-medium text-gray-200 mb-1">
                Verification Code (OTP)
              </label>
              <input
                id="otp"
                type="text"
                required
                placeholder="6-digit code"
                className="block w-full px-3 py-2 text-center text-base tracking-widest bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading && <FaSpinner className="animate-spin" />}
            {loading ? 'Processing...' : showOTP ? 'Verify & Complete' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-transparent text-gray-400">Or sign up with</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-3 py-1.5 border border-white/20 rounded-lg text-white text-sm hover:bg-white/10 transition"
            >
              <FaGoogle size={14} /> Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-3 py-1.5 border border-white/20 rounded-lg text-white text-sm hover:bg-white/10 transition"
            >
              <FaFacebook size={14} /> Facebook
            </button>
          </div>
        </div>

        {!showOTP && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
                Sign in
              </Link>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Register;