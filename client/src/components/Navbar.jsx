import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaBars, FaTimes, FaTicketAlt, FaUserCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
        setShowProfileMenu(false);
    };

    const closeMenu = () => setIsOpen(false);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Get user initials for avatar
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
        <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg">
            <div className="w-full px-4 lg:px-8">
                <div className="flex justify-between items-center h-19">
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="flex items-center gap-2 group"
                    >
                        <FaTicketAlt className="text-blue-600 text-2xl group-hover:scale-110 transition-transform duration-200" />
                        <div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                BookNow
                            </span>
                            <span className="hidden sm:inline-block text-xs text-gray-400 ml-1 align-middle">
                                by Ticketmaster
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            EVENTS
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                    className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    DASHBOARD
                                </Link>
                                <div className="relative" ref={profileMenuRef}>
                                    <button
                                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                                        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-full px-3 py-1.5 transition"
                                        aria-label="Profile menu"
                                    >
                                        {user.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-blue-600 text-gray-900 flex items-center justify-center font-semibold text-sm">
                                                {getInitials()}
                                            </div>
                                        )}
                                        <span className="text-white text-sm hidden lg:inline">
                                            {user.name || user.email.split('@')[0]}
                                        </span>
                                        {showProfileMenu ? (
                                            <FaCaretUp className="text-gray-400 text-sm" />
                                        ) : (
                                            <FaCaretDown className="text-gray-400 text-sm" />
                                        )}
                                    </button>
                                    {showProfileMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50">
                                            <Link
                                                to="/profile"
                                                onClick={() => setShowProfileMenu(false)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                My Profile
                                            </Link>
                                           
                                            <hr className="my-1" />
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition shadow-sm hover:shadow"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>

                {/* Mobile Slide-in Menu */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="py-4 border-t border-gray-700 flex flex-col gap-3">
                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 py-2 px-2 rounded transition-colors"
                        >
                            Events
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                    onClick={closeMenu}
                                    className="text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 py-2 px-2 rounded transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/profile"
                                    onClick={closeMenu}
                                    className="text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 py-2 px-2 rounded transition-colors"
                                >
                                    Profile
                                </Link>
                              
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 text-left transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 py-2 px-2 rounded transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 text-center transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;