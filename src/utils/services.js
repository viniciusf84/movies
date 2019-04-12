import Api from './Api';

class Services {

  static search(query) {
    return Api.get(`s=${query}`);
  } 
}

export default Services;
