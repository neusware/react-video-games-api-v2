// importo la libreria para peticiones fetch async
import axios from 'axios';

// variables globales con la que se forma el endpoint de consulta a la API, apikey y ruta base
const API_KEY = '23aaa06072c14471b0a7df7f2cd79c5b';
const BASE_URL = 'https://api.rawg.io/api';


// declaro función para obttener diez juegos populares, la exporto
export const fetchPopularGames = async () => {

  // manejo de excepciones
  try {

    // uso de la libreria para hacer la petición a la API
    const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=10`);

    // f
    console.log('API Response:', response.data);
    
    // retorno los datos que retorna el fetch
    return response.data;

  } catch (error) {
    
    console.error('Error en el fetch (popularGames) a la API:', error);
    throw error;
  }
};


// declaro función para buscar en el input, con parámetro (input), la exporto
export const searchGames = async (query) => {
  
  // manejo de excepciones
  try {

    // petición a la API y almaceno
    const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}&search=${query}`);

    // retorno los datos que retorna el fetch
    return response.data;
    
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};

// Declaro y exporto la función que hace la petición a la API por id (parámetro)
export const fetchGameDetails = async (id) => {
  
  // manejo de excepciones
  try {

    // petición a la API por id, almaceno
    const response = await axios.get(`${BASE_URL}/games/${id}?key=${API_KEY}`);

    //retorno
    return response.data;
  
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};