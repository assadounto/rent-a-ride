import axios from 'axios';

export default axios.create({
  baseURL: 'https://rent-a-ride-backend.onrender.com/',
  headers: {
    'Content-type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
});
