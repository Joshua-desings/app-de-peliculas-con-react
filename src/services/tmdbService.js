// tmdbService.js
import axios from 'axios';

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "805891dc07bfcac9606e95d4137f93d8"; // Reemplaza con tu clave de API de TMDb

const tmdbService = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
  },
});

export default tmdbService;
