import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { searchGames, fetchPopularGames } from '../api';

function GamesPage() {
  const [games, setGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Cargar juegos populares al montar el componente
    const loadPopularGames = async () => {
      try {
        const data = await fetchPopularGames();
        console.log('Fetched popular games:', data); // Verifica los datos obtenidos
        setPopularGames(data.results.slice(0, 10) || []); // Mostrar solo los primeros 10 juegos
      } catch (error) {
        console.error('Error fetching popular games:', error);
      }
    };

    loadPopularGames();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchGames(searchTerm).then((data) => {
          console.log('Fetched games:', data); // Verifica los datos obtenidos
          setGames(data.results || []); // Asegúrate de que data.results sea un array
        });
      } else {
        setGames([]); // Limpiar resultados de búsqueda cuando no hay término de búsqueda
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Biblioteca</h1>
      <input
        type="text"
        placeholder="Buscar juegos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-8 border rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchTerm ? (
          games.length > 0 ? (
            games.map((game) => (
              <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
            ))
          ) : (
            <p>Buscando...</p>
          )
        ) : (
          popularGames.length > 0 ? (
            popularGames.map((game) => (
              <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
            ))
          ) : (
            <p>Buscando...</p>
          )
        )}
      </div>
    </div>
  );
}

export default GamesPage;