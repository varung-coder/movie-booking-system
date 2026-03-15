import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiFilm, FiHome, FiBookmark, FiLogOut, FiLogIn } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (err) {
      toast.error('Sign out failed');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: <FiHome /> },
    { to: '/#movies', label: 'Movies', icon: <FiFilm /> },
    { to: '/my-bookings', label: 'My Bookings', icon: <FiBookmark /> },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-800/95 backdrop-blur-md shadow-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/40 group-hover:shadow-primary/60 transition-shadow">
              <FiFilm className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-white">Cine</span>
              <span className="text-gradient">Book</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(to) && to !== '/#movies'
                    ? 'text-primary bg-primary/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {icon}
                {label}
              </Link>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="avatar"
                      className="w-8 h-8 rounded-full border-2 border-primary/50"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold">
                      {currentUser.displayName?.[0] || currentUser.email?.[0] || 'U'}
                    </div>
                  )}
                  <span className="text-sm text-white/80 font-medium truncate max-w-32">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-primary transition-colors px-3 py-2 rounded-xl hover:bg-white/5"
                >
                  <FiLogOut />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary flex items-center gap-2 text-sm py-2 px-5">
                <FiLogIn />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-800/98 backdrop-blur-md border-t border-white/5 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(to) && to !== '/#movies'
                    ? 'text-primary bg-primary/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {icon}
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/5">
              {currentUser ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/60 hover:text-primary w-full transition-colors"
                >
                  <FiLogOut />
                  Sign Out
                </button>
              ) : (
                <Link to="/login" className="btn-primary flex items-center gap-2 text-sm justify-center mt-2">
                  <FiLogIn />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
