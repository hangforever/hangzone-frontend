import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_URL_BASE_DEV
    : process.env.REACT_APP_URL_BASE_PRD;

export default axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});
