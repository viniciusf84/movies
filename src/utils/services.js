import Api from './Api';

export function titleSearch(query, page) {
	return Api.get(`type=movie&s=${query}&page=${page}`);
}

export function typeSearch(query, page) {
	return Api.get(`type=${query}&page=${page}`);
}

export function getMovieData(id) {
	return Api.get(`i=${id}`);
}
