import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLock,
  FaTicketAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaChevronRight,
} from 'react-icons/fa';
import { toast } from 'react-toastify'; // optional, for notifications

const Profile = () => {
  const { user, updateUser } = React.useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile'); // profile, security, bookings
  const [isEditing, setIsEditing] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Form for profile update
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    },
  });

  // Form for password change
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm();

  // Fetch user bookings
  const fetchBookings = useCallback(async () => {
    if (activeTab !== 'bookings') return;
    setLoadingBookings(true);
    try {
      const { data } = await api.get('/users/me/bookings');
      setBookings(data);
    } catch {
      toast.error('Failed to load bookings');
    } finally {
      setLoadingBookings(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    }
  }, [activeTab, fetchBookings]);

  // Update profile
  const onUpdateProfile = async (data) => {
    setUpdating(true);
    try {
      const response = await api.put('/users/me', data);
      updateUser(response.data); // update context
      toast.success('Profile updated successfully');
      setIsEditing(false);
      resetProfile(response.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  // Change password
  const onChangePassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setUpdating(true);
    try {
      await api.put('/users/me/password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password changed successfully');
      resetPassword();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password change failed');
    } finally {
      setUpdating(false);
    }
  };

  // Helper to get initials for avatar
  const getInitials = () => {
    if (user && user.name) {
      return user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (user && user.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 text-center border-b border-gray-100">
                <div className="relative inline-block">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white text-3xl font-bold">
                      {getInitials()}
                    </div>
                  )}
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition"
                    aria-label="Edit profile"
                  >
                    <FaEdit size={12} />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800">{user?.name || 'User'}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <div className="p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeTab === 'profile'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FaUserCircle />
                    Personal Info
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeTab === 'security'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FaLock />
                    Security
                  </button>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeTab === 'bookings'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FaTicketAlt />
                    My Bookings
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Personal Information</h1>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleProfileSubmit(onUpdateProfile)} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          {...registerProfile('name', { required: 'Name is required' })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {profileErrors.name && (
                          <p className="mt-1 text-sm text-red-600">{profileErrors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          {...registerProfile('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {profileErrors.email && (
                          <p className="mt-1 text-sm text-red-600">{profileErrors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          {...registerProfile('phone')}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                          rows="2"
                          {...registerProfile('address')}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          disabled={updating}
                          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                          <FaSave /> {updating ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            resetProfile();
                          }}
                          className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-5">
                      <div className="flex items-center gap-3">
                        <FaUserCircle className="text-gray-400 text-xl" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="text-gray-800">{user?.name || 'Not set'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-gray-400 text-xl" />
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          <p className="text-gray-800">{user?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaPhone className="text-gray-400 text-xl" />
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="text-gray-800">{user?.phone || 'Not set'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-gray-400 text-xl" />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="text-gray-800">{user?.address || 'Not set'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h1>
                  <form onSubmit={handlePasswordSubmit(onChangePassword)} className="space-y-5 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        {...registerPassword('currentPassword', { required: 'Current password is required' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {passwordErrors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        {...registerPassword('newPassword', { required: 'New password is required', minLength: 6 })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {passwordErrors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        {...registerPassword('confirmPassword', { required: 'Please confirm your password' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {passwordErrors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={updating}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      <FaLock /> {updating ? 'Updating...' : 'Update Password'}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'bookings' && (
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>
                  {loadingBookings ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="text-center py-12">
                      <FaTicketAlt className="text-gray-300 text-5xl mx-auto mb-4" />
                      <p className="text-gray-500">You haven't booked any events yet.</p>
                      <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">
                        Explore Events
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div
                          key={booking._id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition"
                        >
                          <div className="flex items-start gap-3">
                            {booking.event?.image ? (
                              <img
                                src={booking.event.image}
                                alt={booking.event.title}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                <FaTicketAlt />
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold text-gray-800">{booking.event?.title || 'Event'}</h3>
                              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <FaCalendarAlt className="text-xs" />
                                {new Date(booking.event?.date).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-500">{booking.event?.location}</p>
                              <p className="text-xs text-gray-400 mt-1">Booking ID: {booking._id}</p>
                            </div>
                          </div>
                          <div className="mt-3 sm:mt-0 text-right">
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              {booking.status}
                            </span>
                            <p className="mt-2 text-sm font-medium text-gray-700">
                              {booking.ticketCount} ticket{booking.ticketCount !== 1 ? 's' : ''}
                            </p>
                            <Link
                              to={`/events/${booking.event?._id}`}
                              className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                            >
                              View Details <FaChevronRight size={8} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;