// news-frontend/src/api.js
import axios from 'axios';

const API_BASE_URL = '/api'; // Thanks to the proxy

// Fetch top headlines with pagination
export const fetchNews = (page = 1, limit = 10) => {
  return axios.get(`${API_BASE_URL}/news`, {
    params: { page, limit },
  });
};

// Search news based on query, region, and category
export const searchNews = (query, region, category, page = 1, limit = 10) => {
  return axios.get(`${API_BASE_URL}/news/search`, {
    params: { query, region, category, page, limit },
  });
};
