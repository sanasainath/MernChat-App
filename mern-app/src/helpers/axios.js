// axios helper file (e.g., axios.js)
import axios from 'axios';

const backendUrl = axios.create({
  baseURL: 'http://localhost:3001/api', // Your backend URL
  // Other axios configurations (if any)
});

export { backendUrl };

