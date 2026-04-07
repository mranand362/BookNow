import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaFilter,
  FaTimes,
  FaArrowRight,
  FaSpinner,
} from 'react-icons/fa';

// Constants
const CATEGORIES = ['All', 'Technology', 'Design', 'Business', 'Marketing'];
const ANIMATION_DURATIONS = {
  cardHover: 0.2,
  pageTransition: 0.6,
  staggerDelay: 0.1,
};

// Mock data
const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Tech Conference 2026',
    date: '2026-05-15',
    location: 'San Francisco, CA',
    category: 'Technology',
    attendees: 245,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Join industry leaders to explore the future of technology, AI, and digital transformation.',
  },
  {
    id: 2,
    title: 'Design Workshop',
    date: '2026-05-22',
    location: 'New York, NY',
    category: 'Design',
    attendees: 87,
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Hands-on workshop covering modern design principles, UI/UX best practices, and design systems.',
  },
  {
    id: 3,
    title: 'Startup Networking',
    date: '2026-06-05',
    location: 'Austin, TX',
    category: 'Business',
    attendees: 156,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Connect with founders, investors, and industry experts in the startup ecosystem.',
  },
  {
    id: 4,
    title: 'AI & Machine Learning Summit',
    date: '2026-06-12',
    location: 'Seattle, WA',
    category: 'Technology',
    attendees: 312,
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Deep dive into AI trends, machine learning applications, and future technologies.',
  },
  {
    id: 5,
    title: 'Creative Mornings',
    date: '2026-06-19',
    location: 'Chicago, IL',
    category: 'Design',
    attendees: 64,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Monthly breakfast lecture series featuring creative professionals and thought leaders.',
  },
  {
    id: 6,
    title: 'Digital Marketing Bootcamp',
    date: '2026-07-01',
    location: 'Los Angeles, CA',
    category: 'Marketing',
    attendees: 98,
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive bootcamp covering SEO, social media marketing, analytics, and strategy.',
  },
];

// Custom Hook for filtering events
const useEventFilters = (events) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'All',
  });

  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    if (filters.searchTerm.trim()) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category !== 'All') {
      filtered = filtered.filter((event) => event.category === filters.category);
    }

    return filtered;
  }, [events, filters]);

  const updateSearch = useCallback((searchTerm) => {
    setFilters((prev) => ({ ...prev, searchTerm }));
  }, []);

  const updateCategory = useCallback((category) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      category: 'All',
    });
  }, []);

  return {
    filters,
    filteredEvents,
    updateSearch,
    updateCategory,
    clearFilters,
  };
};

// Hero Section Component
const HeroSection = () => (
  <section
    className="relative h-[40vh] min-h-[320px] bg-cover bg-center"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 backdrop-blur-[2px]" />
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATIONS.pageTransition }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
      >
        Discover Events
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATIONS.pageTransition, delay: 0.2 }}
        className="text-lg md:text-xl max-w-2xl text-slate-100"
      >
        Find and join events that matter to you. Connect, learn, and grow with like-minded individuals.
      </motion.p>
    </div>
  </section>
);

// Search and Filter Component
const SearchAndFilter = ({
  searchTerm,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onClearFilters,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'All';

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-slate-200">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, description, or location..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            aria-label="Search events"
          />
        </div>

        {/* Category Filter - Desktop */}
        <div className="hidden md:flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105'
              }`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filter Button - Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-3 rounded-xl hover:bg-slate-200 transition-colors"
            aria-expanded={isFilterOpen}
          >
            <FaFilter /> Filter
            {selectedCategory !== 'All' && (
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {selectedCategory}
              </span>
            )}
          </button>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors px-4 py-2"
            aria-label="Clear all filters"
          >
            <FaTimes /> Clear
          </button>
        )}
      </div>

      {/* Mobile Filter Dropdown */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 pt-4 border-t border-slate-200 md:hidden"
          >
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onCategoryChange(category);
                    setIsFilterOpen(false);
                  }}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Event Card Component
const EventCard = React.memo(({ event, onRegister }) => {
  const formattedDate = useMemo(
    () =>
      new Date(event.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    [event.date]
  );

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      whileHover={{ y: -5, transition: { duration: ANIMATION_DURATIONS.cardHover } }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-all group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-slate-700">
          {event.category}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">{event.title}</h3>
        <p className="text-slate-600 text-sm mb-3 line-clamp-2">{event.description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-slate-500 text-sm">
            <FaCalendarAlt className="mr-2 text-blue-500 flex-shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-slate-500 text-sm">
            <FaMapMarkerAlt className="mr-2 text-red-500 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-slate-500 text-sm">
            <FaUsers className="mr-2 text-green-500 flex-shrink-0" />
            <span>{event.attendees.toLocaleString()} attending</span>
          </div>
        </div>
        <button
          onClick={() => onRegister(event.id)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 group/btn"
        >
          Register <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
});

EventCard.displayName = 'EventCard';

// Empty State Component
const EmptyState = ({ onClearFilters }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-16"
  >
    <div className="text-6xl mb-4">🔍</div>
    <h3 className="text-2xl font-semibold text-slate-700 mb-2">No events found</h3>
    <p className="text-slate-500">Try adjusting your search or filters to find more events.</p>
    <button
      onClick={onClearFilters}
      className="mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors"
    >
      Clear all filters
    </button>
  </motion.div>
);

// Loading State Component
const LoadingState = () => (
  <div className="flex justify-center items-center py-16">
    <FaSpinner className="animate-spin text-4xl text-blue-600" />
  </div>
);

// Main Component
const FindEvents = () => {
  const [events] = useState(MOCK_EVENTS);
  const [isLoading,] = useState(false);
  const { filters, filteredEvents, updateSearch, updateCategory, clearFilters } =
    useEventFilters(events);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRegister = useCallback((eventId) => {
    // TODO: Implement registration logic
    console.log('Registering for event:', eventId);
    // You would typically show a modal or navigate to registration page
    // Example: navigate to registration page
    // navigate(`/events/${eventId}/register`);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIMATION_DURATIONS.staggerDelay,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <HeroSection />

      {/* Search & Filter Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <SearchAndFilter
          searchTerm={filters.searchTerm}
          selectedCategory={filters.category}
          onSearchChange={updateSearch}
          onCategoryChange={updateCategory}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Events Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {isLoading ? (
          <LoadingState />
        ) : filteredEvents.length === 0 ? (
          <EmptyState onClearFilters={clearFilters} />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onRegister={handleRegister} />
            ))}
          </motion.div>
        )}
      </div>

      <style jsx>{`
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
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default FindEvents;