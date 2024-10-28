import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

// Using a demo API key for immediate testing - replace with your own in production
const API_KEY = '169af9123097689c52fc3243039c84e3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const searchMovies = async (query: string) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [] };
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/week');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return { results: [] };
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await api.get('/movie/upcoming');
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return { results: [] };
  }
};

export const getMovieDetails = async (movieId: number) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,images',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};