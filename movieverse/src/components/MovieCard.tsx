import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar } from 'lucide-react';

interface MovieCardProps {
  movie: {
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  };
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-[400px] object-cover transform transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-4 space-y-2">
            <h3 className="text-lg font-bold text-white">{movie.title}</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white">{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;