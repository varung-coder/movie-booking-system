import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiSearch, FiTrendingUp, FiPlay, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HeroCarousel = ({ movies }) => {
  const [current, setCurrent] = useState(0);
  const featured = movies.filter((m) => m.featured);

  useEffect(() => {
    if (!featured.length) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % featured.length), 5000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (!featured.length) return null;

  const movie = featured[current];

  return (
    <div className="relative h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden bg-dark-900">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-opacity duration-700"
          key={movie.id}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20">
          <div className="max-w-lg animate-slide-up">
            {/* Badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className="badge bg-primary text-white">🔥 Featured</span>
              <span className="badge bg-white/10 text-white/80">{movie.year}</span>
              <div className="flex items-center gap-1 text-accent text-sm font-bold">
                <FiStar fill="currentColor" size={14} />
                {movie.rating}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-3">
              {movie.title}
            </h1>

            <p className="text-white/70 text-sm md:text-base leading-relaxed line-clamp-3 mb-4">
              {movie.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map((g) => (
                <span key={g} className="badge bg-white/10 text-white/70">{g}</span>
              ))}
              <span className="badge bg-white/10 text-white/70">{movie.duration}</span>
            </div>

            <div className="flex gap-3">
              <Link to={`/movies/${movie.id}`} className="btn-primary flex items-center gap-2">
                <FiPlay fill="white" size={14} />
                Book Now
              </Link>
              <Link to={`/movies/${movie.id}`} className="btn-outline">
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Nav dots + arrows */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-2 z-10">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-primary' : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => setCurrent((c) => (c - 1 + featured.length) % featured.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % featured.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );
};

const HomePage = () => {
  const { movies, loading } = useMovies();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const genres = ['All', 'Action', 'Drama', 'Sci-Fi', 'Comedy', 'Romance', 'Thriller'];

  const filtered = movies.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchGenre = filter === 'All' || m.genres?.includes(filter);
    return matchSearch && matchGenre;
  });

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      {!loading && <HeroCarousel movies={movies} />}

      {/* Search bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 mb-10">
        <div className="glass p-2 max-w-xl mx-auto flex items-center gap-3">
          <FiSearch className="text-white/40 ml-2 shrink-0" size={18} />
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm py-2"
          />
        </div>
      </div>

      {/* Movies Section */}
      <div id="movies" className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* Genre Filter */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setFilter(genre)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === genre
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <FiTrendingUp className="text-primary" />
          <h2 className="section-title mb-0">
            {search ? `Results for "${search}"` : 'Now Showing'}
          </h2>
          <span className="ml-auto text-sm text-white/40">{filtered.length} movies</span>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading movies..." />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <p className="text-4xl mb-3">🎬</p>
            <p className="text-lg font-medium">No movies found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
