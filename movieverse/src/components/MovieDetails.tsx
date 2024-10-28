import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, DollarSign, Clock, Calendar, Users } from 'lucide-react';
import { getMovieDetails } from '../api/movieApi';

const MovieDetails = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(movie.id);
      setDetails(data);
    };
    fetchDetails();
  }, [movie.id]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="relative max-w-4xl mx-auto bg-gray-900 rounded-2xl overflow-hidden">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {details && (
              <>
                <div className="relative h-[400px]">
                  <img
                    src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
                    alt={details.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent">
                    <div className="absolute bottom-0 p-8">
                      <h2 className="text-4xl font-bold mb-2">{details.title}</h2>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          {details.vote_average.toFixed(1)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-purple-400 mr-1" />
                          {details.runtime} min
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-blue-400 mr-1" />
                          {new Date(details.release_date).getFullYear()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <p className="text-lg leading-relaxed text-gray-300">{details.overview}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">Budget: ${details.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-5 h-5 text-yellow-400" />
                          <span className="text-gray-300">Revenue: ${details.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-5 h-5 text-purple-400" />
                          <span className="text-gray-300">
                            Status: <span className="text-white">{details.status}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Cast & Crew</h3>
                      <div className="space-y-2">
                        {details.credits?.cast?.slice(0, 5).map((actor) => (
                          <div key={actor.id} className="flex items-center space-x-2">
                            <img
                              src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`}
                              alt={actor.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="text-gray-300">{actor.name}</span>
                            <span className="text-gray-500">as {actor.character}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieDetails;