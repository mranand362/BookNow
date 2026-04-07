import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

// -------------------- Custom Hook for Bookings --------------------
const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get('/bookings/my');
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load your bookings.');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      await api.delete(`/bookings/${bookingId}`);
      await fetchBookings();
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to cancel booking.';
      console.error('Cancel error:', err);
      return { success: false, message };
    }
  };

  return { bookings, loading, error, fetchBookings, cancelBooking };
};

// -------------------- Cancel Confirmation Modal --------------------
const CancelModal = ({ isOpen, onClose, onConfirm, bookingTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <FaExclamationTriangle size={24} />
          <h3 className="text-xl font-bold">Cancel Booking</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to cancel your booking for <span className="font-semibold">"{bookingTitle}"</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            No, Keep It
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Yes, Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------- Booking Card --------------------
const BookingCard = ({ booking, onCancel }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const event = booking.eventId;
  const isCancelled = booking.status === 'cancelled';

  const handleCancel = async () => {
    const result = await onCancel(booking._id);
    if (result?.success) setShowCancelModal(false);
    else alert(result?.message || 'Failed to cancel booking.');
  };

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-50 flex-grow">
          {event ? (
            <>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900 leading-tight pr-2">{event.title}</h3>
                <div className="flex flex-col gap-1 items-end shrink-0">
                  <span
                    className={`px-2 py-1 text-[10px] font-black rounded uppercase tracking-wider ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : booking.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {booking.status}
                  </span>
                  {!isCancelled && (
                    <span
                      className={`px-2 py-1 text-[10px] font-black rounded uppercase tracking-wider ${
                        booking.paymentStatus === 'paid'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {booking.paymentStatus.replace('_', ' ')}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-500 mb-4 space-y-1">
                <p><strong className="text-gray-700">Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong className="text-gray-700">Amount:</strong> {booking.amount === 0 ? 'Free' : `₹${booking.amount}`}</p>
                <p><strong className="text-gray-700">Requested:</strong> {new Date(booking.bookedAt).toLocaleDateString()}</p>
              </div>
            </>
          ) : (
            <p className="text-red-500 italic">Event details unavailable</p>
          )}
        </div>
        <div className="p-4 bg-gray-50 flex justify-between items-center shrink-0">
          {event && !isCancelled ? (
            <>
              <Link
                to={`/events/${event._id}`}
                className="text-gray-900 font-semibold text-sm hover:underline"
              >
                View Event
              </Link>
              <button
                onClick={() => setShowCancelModal(true)}
                className="text-red-500 font-semibold text-sm hover:text-red-700 flex items-center gap-1 px-2 py-1"
              >
                <FaTimesCircle /> Cancel
              </button>
            </>
          ) : (
            <div className="w-full text-center text-sm text-gray-500 italic">Booking Cancelled</div>
          )}
        </div>
      </div>

      <CancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancel}
        bookingTitle={event?.title || 'this event'}
      />
    </>
  );
};

// -------------------- Main Component --------------------
const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { bookings, loading, error, fetchBookings, cancelBooking } = useBookings();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [user, navigate, fetchBookings]);

  if (loading) return <p className="text-center py-12">Loading...</p>;

  if (error) return (
    <div className="max-w-6xl mx-auto text-center py-16">
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 inline-block">
        <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={fetchBookings}
          className="bg-gray-900 hover:bg-black text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
      {/* Bookings Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaTicketAlt className="text-gray-700" /> My Booking Requests
        </h2>
        <span className="text-sm text-gray-500">
          {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
        </span>
      </div>

      {/* Bookings Grid or Empty State */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTicketAlt className="text-gray-300 text-3xl" />
          </div>
          <p className="text-xl text-gray-500 mb-6 mt-4 font-medium">You haven't booked any events yet.</p>
          <Link
            to="/"
            className="inline-block bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-lg transition shadow-md"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} onCancel={cancelBooking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;