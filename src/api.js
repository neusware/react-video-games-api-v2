import axios from 'axios';

const API_KEY = '23aaa06072c14471b0a7df7f2cd79c5b';
const BASE_URL = 'https://api.rawg.io/api';

export const fetchPopularGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=10`);
    console.log('API Response:', response.data); // Agrega este console.log para verificar la respuesta
    return response.data;
  } catch (error) {
    console.error('Error fetching popular games:', error);
    throw error;
  }
};

export const searchGames = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}&search=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};

export const fetchGameDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/${id}?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};