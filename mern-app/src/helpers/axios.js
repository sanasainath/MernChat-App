// axios helper file (e.g., axios.js)
import axios from 'axios';

const backendUrl = axios.create({
  baseURL: 'https://mernchat-app-prod-va3g.onrender.com/api', // Your backend URL
  // Other axios configurations (if any)
});

export { backendUrl };

