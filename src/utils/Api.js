import axios from 'axios';
import { API_KEY } from './config';

const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzk3NmFhZTk5YzdmMzI2ZjcxM2FjNDhhNjQ1Nzc2OSIsIm5iZiI6MTcyNTQ3OTMxOC42NDc3MjksInN1YiI6IjY2ZDhiNDBhMDZkMjMxZWVkNDA5NmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0wY6bFgGXEhqB8tqtQwuCa5bDOAY3Cogc5T7l7nKsfk',
  },
};

const fetchMovies = async (params) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie${params}?api_key=${API_KEY}`,
    options
  );

  return data;
};

const fetchMovieDetailsById = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
    options
  );

  return data;
};

export { fetchMovies, fetchMovieDetailsById };
