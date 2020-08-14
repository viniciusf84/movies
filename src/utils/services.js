import Api from './Api';

export function titleSearch(query, page) {
	return Api(`type=movie&s=${query}&page=${page}`);
}

export function typeSearch(query, page) {
	return Api(`type=${query}&page=${page}`);
}

export function getMovieData(id) {
	return Api(`i=${id}`);
}
