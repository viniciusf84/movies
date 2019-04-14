import axios from 'axios';
import { PUBLIC_KEY } from './config';

const DATA_URL = `http://www.omdbapi.com/?apikey=${PUBLIC_KEY}&`;
// const POSTER_URL = `http://img.omdbapi.com/?apikey=${PUBLIC_KEY}&`;

class Api {
  static get(uri) {
    return axios.get(`${DATA_URL}${uri}`);
  }
}

export default Api;
