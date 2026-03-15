import { FiCalendar, FiClock, FiMapPin, FiTag } from 'react-icons/fi';

const BookingCard = ({ booking }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="glass p-4 md:p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Poster */}
        <div className="w-full sm:w-24 h-36 sm:h-full flex-shrink-0 rounded-xl overflow-hidden">
          <img
            src={booking.moviePoster}
            alt={booking.movieTitle}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/96x144/1a1a35/e50914?text=?`;
            }}
          />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-white text-lg leading-tight">{booking.movieTitle}</h3>
            <span className="badge bg-green-500/15 text-green-400 border border-green-500/20 text-xs shrink-0">
              Confirmed
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-white/60">
              <FiCalendar size={13} className="text-primary" />
              <span>{booking.showDate}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <FiClock size={13} className="text-primary" />
              <span>{booking.showTime}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 col-span-2">
              <FiMapPin size={13} className="text-primary" />
              <span>{booking.theatre || 'CineBook Multiplex'}</span>
            </div>
          </div>

          {/* Seats */}
          <div className="flex flex-wrap gap-1.5">
            {booking.seats?.map((seat) => (
              <span
                key={seat}
                className="px-2.5 py-1 bg-primary/15 text-primary border border-primary/20 rounded-lg text-xs font-semibold"
              >
                {seat}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <FiTag size={12} />
              <span>Booking ID: <span className="font-mono">{booking.id?.slice(-8).toUpperCase()}</span></span>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/40">Total Paid</p>
              <p className="text-accent font-bold text-lg">₹{booking.totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
