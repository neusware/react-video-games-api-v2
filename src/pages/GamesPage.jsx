import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { searchGames } from '../api';

function GamesPage() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchGames(searchTerm).then((data) => {
          console.log('Fetched games:', data); // Verifica los datos obtenidos
          setGames(data.results || []); // Asegúrate de que data.results sea un array
        });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Games Library</h1>
      <input
        type="text"
        placeholder="Search games..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-8 border rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.length > 0 ? (
          games.map((game) => (
            <GameCard key={game.id} {...game} />
          ))
        ) : (
          <p>No games found.</p>
        )}
      </div>
    </div>
  );
}

export default GamesPage;