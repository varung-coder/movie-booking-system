import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiClock, FiCalendar, FiGlobe, FiArrowLeft, FiPlay } from 'react-icons/fi';
import { useMovie } from '../hooks/useMovie';
import { useAuth } from '../context/AuthContext';
import ShowTimePicker from '../components/ShowTimePicker';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { movie, loading } = useMovie(id);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedShow, setSelectedShow] = useState(null);

  if (loading) return <div className="pt-20"><LoadingSpinner text="Loading movie details..." /></div>;
  if (!movie) return (
    <div className="pt-24 text-center text-white/50">
      <p className="text-5xl mb-4">🎬</p>
      <p>Movie not found.</p>
    </div>
  );

  const handleBookTickets = () => {
    if (!selectedShow) {
      toast.error('Please select a showtime first');
      return;
    }
    if (!currentUser) {
      toast.error('Please sign in to book tickets');
      navigate('/login', { state: { from: { pathname: `/movies/${movie.id}/seats` } } });
      return;
    }
    navigate(`/movies/${movie.id}/seats`, {
      state: { show: selectedShow, movie },
    });
  };

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Backdrop hero */}
      <div className="relative h-72 md:h-96">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-dark-900" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 mt-16 flex items-center gap-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl transition-all text-sm"
        >
          <FiArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-24 md:-mt-32 relative z-10 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="w-44 md:w-56 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 group">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/224x336/1a1a35/e50914?text=${encodeURIComponent(movie.title)}`;
                }}
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex-1 space-y-6">
            {/* Title & Meta */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {movie.genres?.map((g) => (
                  <span key={g} className="badge bg-primary/15 text-primary border border-primary/20">{g}</span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white/60">
                <div className="flex items-center gap-1.5 text-accent font-bold">
                  <FiStar fill="currentColor" size={14} />
                  <span className="text-accent">{movie.rating}</span>
                  <span className="text-white/40 font-normal">/10</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiClock size={13} />
                  {movie.duration}
                </div>
                <div className="flex items-center gap-1.5">
                  <FiGlobe size={13} />
                  {movie.language}
                </div>
                <div className="flex items-center gap-1.5">
                  <FiCalendar size={13} />
                  {movie.year}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-sm uppercase tracking-widest text-white/30 font-semibold mb-2">Synopsis</h2>
              <p className="text-white/70 leading-relaxed">{movie.description}</p>
            </div>

            {/* Cast */}
            {movie.cast?.length > 0 && (
              <div>
                <h2 className="text-sm uppercase tracking-widest text-white/30 font-semibold mb-3">Cast</h2>
                <div className="flex flex-wrap gap-3">
                  {movie.cast.map((person) => (
                    <div key={person.name} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/5">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=e50914&color=fff&size=32`; }}
                      />
                      <div>
                        <p className="text-white text-sm font-medium leading-none">{person.name}</p>
                        <p className="text-white/40 text-xs mt-0.5">{person.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Showtimes */}
            <div className="glass p-5">
              <h2 className="text-sm uppercase tracking-widest text-white/30 font-semibold mb-4">Select Showtime</h2>
              <ShowTimePicker shows={movie.shows} onSelect={setSelectedShow} />
            </div>

            {/* CTA */}
            <button
              onClick={handleBookTickets}
              disabled={!selectedShow}
              className={`w-full md:w-auto btn-primary text-base py-4 px-10 flex items-center justify-center gap-2 ${
                !selectedShow ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
              }`}
            >
              <FiPlay fill="white" size={16} />
              Book Tickets
              {selectedShow && (
                <span className="ml-1 text-white/70">
                  · ₹{selectedShow.price}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
