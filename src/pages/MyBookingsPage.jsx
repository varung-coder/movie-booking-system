import { FiBookmark, FiFilm } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../hooks/useBookings';
import BookingCard from '../components/BookingCard';
import LoadingSpinner from '../components/LoadingSpinner';

const MyBookingsPage = () => {
  const { currentUser } = useAuth();
  const { bookings, loading } = useBookings(currentUser?.uid);

  return (
    <div className="min-h-screen pt-24 pb-16 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center">
            <FiBookmark className="text-primary" size={18} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">My Bookings</h1>
            <p className="text-white/40 text-sm">Your movie ticket history</p>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading your bookings..." />
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🎬</div>
            <h2 className="text-xl font-semibold text-white mb-2">No bookings yet</h2>
            <p className="text-white/40 text-sm mb-8">
              Looks like you haven't booked any tickets. Start exploring movies!
            </p>
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              <FiFilm size={16} />
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-white/40 text-sm mb-4">{bookings.length} booking{bookings.length !== 1 ? 's' : ''} found</p>
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
