import Api from './Api';

class Services {

  static search(query, page) {
    return Api.get(`s=${query}&page=${page}`);
  } 
}

export default Services;
