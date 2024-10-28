import React, { useState, useEffect } from 'react';
import { Search, Film, Calendar, TrendingUp, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import MovieDetails from './components/MovieDetails';
import { searchMovies, getTrendingMovies, getUpcomingMovies } from './api/movieApi';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');
  const [error, setError] = useState('');

  useEffect(() => {
    loadInitialMovies();
  }, []);

  const loadInitialMovies = async () => {
    try {
      setLoading(true);
      setError('');
      const trending = await getTrendingMovies();
      if (trending.results.length === 0) {
        setError('No movies found. Please try again later.');
      }
      setMovies(trending.results);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error('Error loading initial movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError('');
      setSearchQuery(query);
      const results = await searchMovies(query);
      if (results.results.length === 0) {
        setError('No movies found matching your search.');
      }
      setMovies(results.results);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = async (tab) => {
    try {
      setActiveTab(tab);
      setLoading(true);
      setError('');
      let results;
      
      switch (tab) {
        case 'trending':
          results = await getTrendingMovies();
          break;
        case 'upcoming':
          results = await getUpcomingMovies();
          break;
        default:
          results = await getTrendingMovies();
      }
      
      if (results.results.length === 0) {
        setError('No movies found for this category.');
      }
      setMovies(results.results);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error('Error changing tab:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-black/30 backdrop-blur-lg border-b border-white/10 p-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Film className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              MovieBuzzFeed
            </h1>
          </motion.div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex space-x-4 mb-8 overflow-x-auto pb-2"
        >
          {[
            { id: 'trending', icon: TrendingUp, label: 'Trending' },
            { id: 'upcoming', icon: Calendar, label: 'Upcoming' },
          ].map(({ id, icon: Icon, label }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTabChange(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                activeTab === id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </motion.button>
          ))}
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={() => setSelectedMovie(movie)}
              />
            ))}
          </motion.div>
        )}
      </div>

      {selectedMovie && (
        <MovieDetails 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
}

export default App;