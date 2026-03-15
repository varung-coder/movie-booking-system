import { Link } from 'react-router-dom';
import { FiStar, FiClock, FiPlay } from 'react-icons/fi';

const MovieCard = ({ movie }) => {
  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-400 bg-green-400/10';
    if (rating >= 7) return 'text-accent bg-accent/10';
    return 'text-orange-400 bg-orange-400/10';
  };

  return (
    <Link to={`/movies/${movie.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-dark-700 border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = `https://placehold.co/300x450/1a1a35/e50914?text=${encodeURIComponent(movie.title)}`;
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Hover overlay with Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/50 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <FiPlay className="text-white text-xl ml-1" fill="white" />
            </div>
          </div>

          {/* Rating badge */}
          <div className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/10 ${getRatingColor(movie.rating)}`}>
            <FiStar size={10} fill="currentColor" />
            {movie.rating}
          </div>

          {/* Language badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-black/60 backdrop-blur-sm text-white/80 border border-white/10">
            {movie.language}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-white text-sm md:text-base truncate group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-white/50">
            <FiClock size={10} />
            <span>{movie.duration}</span>
          </div>
          {/* Genres */}
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genres?.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/5"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Book Now CTA */}
          <button className="mt-3 w-full py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-semibold rounded-xl transition-all duration-200 border border-primary/20 hover:border-primary">
            Book Tickets
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
