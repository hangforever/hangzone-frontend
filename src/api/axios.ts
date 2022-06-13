import axios from 'axios';

// TODO: manage urls depending on env
const baseURL = "http://localhost:8000";

export default axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});
