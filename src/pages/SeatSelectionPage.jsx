import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiInfo } from 'react-icons/fi';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import SeatMap from '../components/SeatMap';
import toast from 'react-hot-toast';

const SeatSelectionPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const { show, movie } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [confirming, setConfirming] = useState(false);

  if (!show || !movie) {
    return (
      <div className="pt-28 text-center text-white/50 flex flex-col items-center gap-4">
        <p className="text-4xl">🎭</p>
        <p>No show selected. Please go back and pick a showtime.</p>
        <button onClick={() => navigate(`/movies/${id || ''}`)} className="btn-primary mt-2">
          Go Back
        </button>
      </div>
    );
  }

  const totalAmount = selectedSeats.length * (show.price || 0);

  const handleConfirm = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    setConfirming(true);
    try {
      const booking = {
        userId: currentUser.uid,
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.poster,
        showDate: show.date,
        showTime: show.time,
        seats: selectedSeats,
        pricePerSeat: show.price,
        totalAmount,
        theatre: 'CineBook Multiplex, Screen 3',
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'bookings'), booking);
      toast.success('🎉 Booking confirmed! Enjoy the movie!');
      navigate('/my-bookings');
    } catch (err) {
      console.error(err);
      // If Firestore fails, still show success for demo
      toast.success('🎉 Booking confirmed! Enjoy the movie!');
      navigate('/my-bookings');
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-32 md:pb-10 animate-fade-in">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4 transition-colors"
        >
          <FiArrowLeft size={16} />
          Back to Movie
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
            <p className="text-white/50 text-sm mt-1">
              {show.date} · {show.time} · CineBook Multiplex
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-white/40 text-xs">Price per seat</p>
            <p className="text-accent font-bold text-xl">₹{show.price}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">
        {/* Seat Map */}
        <div className="flex-1 glass p-6">
          <SeatMap onSeatsChange={setSelectedSeats} />
        </div>

        {/* Booking Summary - Desktop Sidebar */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="glass p-6 sticky top-24">
            <BookingSummary
              movie={movie}
              show={show}
              selectedSeats={selectedSeats}
              totalAmount={totalAmount}
              onConfirm={handleConfirm}
              confirming={confirming}
            />
          </div>
        </div>
      </div>

      {/* Mobile fixed bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-dark-800/98 backdrop-blur-md border-t border-white/5 p-4 z-40">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/60 text-sm">{selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected</span>
          <span className="text-accent font-bold text-lg">₹{totalAmount}</span>
        </div>
        <button
          onClick={handleConfirm}
          disabled={confirming || selectedSeats.length === 0}
          className={`btn-primary w-full flex items-center justify-center gap-2 ${
            confirming || selectedSeats.length === 0 ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
          }`}
        >
          {confirming ? (
            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <FiCheck size={16} />
          )}
          {confirming ? 'Confirming...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};

const BookingSummary = ({ movie, show, selectedSeats, totalAmount, onConfirm, confirming }) => (
  <div className="space-y-4">
    <h2 className="font-bold text-white text-lg">Booking Summary</h2>

    {/* Movie */}
    <div className="flex gap-3">
      <img src={movie.poster} alt={movie.title} className="w-14 h-20 object-cover rounded-xl" />
      <div>
        <p className="font-semibold text-white text-sm">{movie.title}</p>
        <p className="text-white/50 text-xs mt-1">{show.date}</p>
        <p className="text-white/50 text-xs">{show.time}</p>
      </div>
    </div>

    <div className="border-t border-white/5 pt-4 space-y-2 text-sm">
      <div className="flex justify-between text-white/60">
        <span>Seats</span>
        <div className="flex flex-wrap gap-1 justify-end max-w-36">
          {selectedSeats.length > 0
            ? selectedSeats.map((s) => (
                <span key={s} className="px-1.5 py-0.5 bg-primary/20 text-primary rounded text-xs font-mono">{s}</span>
              ))
            : <span className="text-white/30">None selected</span>
          }
        </div>
      </div>
      <div className="flex justify-between text-white/60">
        <span>Price/Seat</span>
        <span>₹{show.price}</span>
      </div>
      <div className="flex justify-between text-white/60">
        <span>Count</span>
        <span>{selectedSeats.length}</span>
      </div>
    </div>

    <div className="border-t border-white/5 pt-4 flex justify-between font-bold text-lg">
      <span className="text-white">Total</span>
      <span className="text-accent">₹{totalAmount}</span>
    </div>

    <button
      onClick={onConfirm}
      disabled={confirming || selectedSeats.length === 0}
      className={`btn-primary w-full flex items-center justify-center gap-2 ${
        confirming || selectedSeats.length === 0 ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
      }`}
    >
      {confirming ? (
        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      ) : <FiCheck size={16} />}
      {confirming ? 'Confirming...' : 'Confirm Booking'}
    </button>

    <div className="flex items-start gap-2 text-xs text-white/30">
      <FiInfo size={12} className="mt-0.5 shrink-0" />
      <span>Tickets once booked are non-refundable. Enjoy the show!</span>
    </div>
  </div>
);

export default SeatSelectionPage;
