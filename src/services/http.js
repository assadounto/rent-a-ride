import axios from 'axios';

export default axios.create({
  baseURL: 'https://rails-4sct.onrender.com',
  headers: {
    'Content-type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
});
