import axios from 'axios';
import { PUBLIC_KEY } from './config';

const DATA_URL = `http://www.omdbapi.com/?apikey=${PUBLIC_KEY}&`;

function Api(uri) {
  return axios.get(`${DATA_URL}${uri}`);
}

export default Api;
