import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link
import { fetchPopularGames } from '../api';
import GameCard from '../components/GameCard'; // Asegúrate de que GameCard esté importado correctamente

const HomePage = () => {
  const [popularGames, setPopularGames] = useState([]);

  useEffect(() => {
    console.log('useEffect executed'); // Verifica que useEffect se está ejecutando
    const fetchGames = async () => {
      try {
        const data = await fetchPopularGames();
        console.log('Fetched data:', data); // Verifica los datos obtenidos
        setPopularGames(data.results || []); // Asegúrate de que data.results sea un array
      } catch (error) {
        console.error('Error fetching popular games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Bienvenido</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Este es el top 10 actual</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularGames.length > 0 ? (
            popularGames.map((game) => (
              <GameCard key={game.id} {...game} />
            ))
          ) : (
            <p>No games found.</p>
          )}
        </div>
      </section>
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Explore More Games</h2>
        <p className="mb-4">Search and discover thousands of games in our extensive library.</p>
        <Link to="/games" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
          Browse All Games
        </Link>
      </section>
    </div>
  );
};

export default HomePage;