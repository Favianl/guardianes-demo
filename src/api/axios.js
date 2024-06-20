import axios from 'axios';

const API_URL = 'https://localhost:3000/api';

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
