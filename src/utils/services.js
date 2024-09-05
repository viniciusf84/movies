import { fetchMovies, fetchMovieDetailsById } from './Api';

export function getTitleSearch(query, page) {
  return fetchMovies(`?query=${query}&page=${page}`);
}

export function getMovieData(id) {
  return fetchMovieDetailsById(id);
}
