import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTicketAlt,
  FaHeadset,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSuccess(false), 4000);
    }, 1500);
  };

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden bg-black">
      {/* Background */}
      <div
  className="absolute inset-0 opacity-60"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=2000&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
/>
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Contact Us
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            Have questions? We’d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* LEFT INFO */}
          <div className="space-y-4">

            {/* CARD */}
            {[
              { icon: <FaPhone />, title: "Phone", text: "+91 98765 43210" },
              { icon: <FaEnvelope />, title: "Email", text: "support@booknow.com" },
              { icon: <FaMapMarkerAlt />, title: "Location", text: "India, Bihar" },
              { icon: <FaClock />, title: "Timing", text: "9 AM – 6 PM" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 hover:bg-white/20 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="text-blue-400 text-xl">{item.icon}</div>
                  <div>
                    <h4 className="text-white font-semibold">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/20 shadow-lg">
              
              <div className="flex items-center mb-6">
                <FaTicketAlt className="text-blue-400 text-xl mr-2" />
                <h3 className="text-xl font-bold text-white">
                  Send Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* NAME */}
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {/* EMAIL */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {/* SUBJECT */}
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {/* MESSAGE */}
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition"
                >
                  <FaPaperPlane />
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {/* SUCCESS */}
                {success && (
                  <div className="text-center text-green-400 text-sm mt-2">
                    ✅ Message sent successfully!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* FOOTER SUPPORT */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <FaHeadset className="text-blue-400" />
            24/7 Support Available
          </div>

          <div className="flex gap-3">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
              <Icon
                key={i}
                className="text-gray-300 hover:text-white cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;