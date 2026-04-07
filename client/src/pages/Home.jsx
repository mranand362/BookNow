import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import Offer from "../components/Offer";
import Why from '../components/Why';
import OurPartner from '../components/OurPartner';
import ConcertVideo from '../components/ConcertVideo';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRegClock,
  FaTicketAlt,
  FaShieldAlt,
  FaSearch,
  FaStar,
  FaCreditCard,
  FaMobileAlt,
  FaArrowRight,
} from 'react-icons/fa';

// -------------------- Custom Hook (unchanged) --------------------
const useEvents = (searchQuery) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get(`/events?search=${searchQuery}`);
      setEvents(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load events.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const timeout = setTimeout(fetchEvents, 400);
    return () => clearTimeout(timeout);
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
};

// -------------------- Hero Component (fully responsive) --------------------
const Hero = ({ searchQuery, setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const trending = ['Concerts', 'Sports', 'Theater', 'Comedy', 'Festivals'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localQuery);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video with fallback */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero-fallback.jpg" // add a fallback image
      >
        <source src="/videos/concert.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" /> {/* increased overlay for better contrast */}

      <div className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Your next great <span className="text-blue-400">experience</span>
          <br />
          starts here
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 px-2">
          Discover concerts, sports, theater, and more. Book with confidence – no hidden fees,
          instant e‑tickets.
        </p>

        {/* Search Bar - fully responsive */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, artists, or venues..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-full bg-white/0 border border-white/20 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300 transition"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Find Tickets
            </button>
          </div>
        </form>

        {/* Trust Badges - wrap on mobile */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-white">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            <span>4.9/5 from 10k+ reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMobileAlt className="text-blue-400" />
            <span>Instant e‑tickets</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCreditCard className="text-green-400" />
            <span>Secure payments</span>
          </div>
        </div>

        {/* Trending Categories - scrollable on small screens */}
        <div className="mt-10">
          <p className="text-sm uppercase tracking-wider text-gray-300 mb-3">Trending now</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {trending.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setLocalQuery(cat);
                  setSearchQuery(cat);
                }}
                className="px-3 sm:px-4 py-2 bg-white/80 hover:bg-white/20 rounded-full text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// -------------------- Feature Card (responsive) --------------------
const FeatureCard = ({ icon, title, description }) => (
  <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 sm:p-6 text-center border border-gray-100">
    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-4 mx-auto group-hover:scale-110 transition">
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm sm:text-base">{description}</p>
  </div>
);

// -------------------- Event Card (responsive) --------------------
const EventCard = ({ event, index }) => {
  const percent = (event.availableSeats / event.totalSeats) * 100;
  const isLowSeats = percent < 20 && percent > 0;
  const isSoldOut = event.availableSeats === 0;

  return (
    <div
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
        <span
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${
            event.ticketPrice === 0
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-900 shadow'
          }`}
        >
          {event.ticketPrice === 0 ? 'FREE' : `₹${event.ticketPrice}`}
        </span>
        {isLowSeats && !isSoldOut && (
          <span className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-0.5 rounded-md text-xs font-semibold">
            Only {event.availableSeats} left!
          </span>
        )}
        {isSoldOut && (
          <span className="absolute bottom-3 left-3 bg-gray-800 text-white px-2 py-0.5 rounded-md text-xs font-semibold">
            Sold Out
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-1 text-base sm:text-lg">
          {event.title}
        </h3>

        <div className="space-y-1 text-gray-500 text-xs sm:text-sm">
          <p className="flex items-center gap-1">
            <FaCalendarAlt className="flex-shrink-0" />
            <span>
              {new Date(event.date).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </p>
          <p className="flex items-center gap-1">
            <FaMapMarkerAlt className="flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </p>
        </div>

        {!isSoldOut && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Available</span>
              <span>{Math.round(percent)}%</span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  percent > 60 ? 'bg-green-500' : percent > 20 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

        <Link
          to={`/events/${event._id}`}
          className={`mt-4 flex items-center justify-center gap-1 py-3 rounded-lg text-sm font-medium transition min-h-[44px] ${
            isSoldOut
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500'
          }`}
          aria-disabled={isSoldOut}
          tabIndex={isSoldOut ? -1 : undefined}
        >
          {isSoldOut ? 'Sold Out' : 'Book Now'}
          {!isSoldOut && <FaArrowRight className="text-xs" />}
        </Link>
      </div>
    </div>
  );
};

// -------------------- Skeleton Loader (responsive) --------------------
const EventCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
    <div className="h-48 sm:h-56 md:h-64 bg-gray-200" />
    <div className="p-4 sm:p-5 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
      <div className="mt-3">
        <div className="h-1.5 bg-gray-200 rounded" />
      </div>
      <div className="mt-4 h-9 bg-gray-200 rounded" />
    </div>
  </div>
);

// -------------------- Empty State (responsive) --------------------
const EmptyState = ({ searchQuery }) => (
  <div className="text-center py-12 sm:py-16">
    <div className="text-5xl mb-4">🎟️</div>
    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No events found</h3>
    <p className="text-gray-500 mb-6 px-4">
      We couldn't find any events matching "{searchQuery}". Try a different search term.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Clear search
    </button>
  </div>
);

// -------------------- Main Home Component (fully responsive) --------------------
const Home = () => {
  const [search, setSearch] = useState('');
  const { events, loading, error } = useEvents(search);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero searchQuery={search} setSearchQuery={setSearch} />

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
          Why Book with Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon={<FaRegClock />}
            title="Fast Booking"
            description="Instant confirmation, no waiting"
          />
          <FeatureCard
            icon={<FaTicketAlt />}
            title="Easy Tickets"
            description="Manage all your tickets in one place"
          />
          <FeatureCard
            icon={<FaShieldAlt />}
            title="Secure"
            description="Safe payments & data protection"
          />
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Upcoming Events
          </h2>
          {search && (
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Results for "{search}"
            </span>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <EmptyState searchQuery={search} />
        )}

        {/* Events Grid */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {events.map((event, index) => (
              <EventCard key={event._id} event={event} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Other Sections (ensure these components are also responsive) */}
      <Offer />
      <Why />
      <OurPartner />
      <ConcertVideo />

      {/* Global Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Home;