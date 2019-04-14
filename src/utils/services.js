import Api from './Api';

class Services {

  static titleSearch(query, page) {
    return Api.get(`type=movie&s=${query}&page=${page}`);
  } 

  static typeSearch(query, page) {
    return Api.get(`type=${query}&page=${page}`);
  } 

  static getData(id) {
    return Api.get(`i=${id}`);
  }
}

export default Services;
