import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from "./context/AuthProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import ContactUs from "./pages/ContactUs";
import LearnMore from './pages/LearnMore';
import OurStory from './pages/OurStory';
import Jobs from './pages/Jobs';
import Apply from './pages/Apply';
import Findevents from './pages/FindEvents';
import PartnersWithUs from './pages/PartnersWithUs';
// 🔹 Layout Component
const AppContent = () => {
  const location = useLocation();

  const hideFooterRoutes = ['/login', '/register', '/admin', '/dashboard'];

  const hideFooter = hideFooterRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="min-h-screen w-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <ToastContainer />

      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />

          {/* ✅ FIXED ROUTE */}
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/about" element={<OurStory />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/events" element={<Findevents />} />
            <Route path="/partners" element={<PartnersWithUs />} />

          <Route
            path="*"
            element={
              <h1 className="text-3xl font-bold text-center mt-20">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};

// 🔹 Main App
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;