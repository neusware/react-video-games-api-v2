import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameDetails } from '../api';

const GameDetailPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchGameDetails(id);
        console.log('Fetched game details:', data); // Verifica los datos obtenidos
        setGame(data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{game.name}</h1>
      <img src={game.background_image} alt={game.name} className="w-full h-64 object-cover mb-8" />
      <button
        onClick={() => setShowDescription(!showDescription)}
        className="bg-black text-white px-4 py-2 rounded mb-4"
      >
        {showDescription ? 'Hide Description' : 'Show Description'}
      </button>
      {showDescription && <p className="mb-4">{game.description_raw}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Plataformas</h2>
          <ul>
            {game.platforms.map((platform) => (
              <li key={platform.platform.id}>{platform.platform.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Géneros</h2>
          <ul>
            {game.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Renderiza más detalles del juego aquí */}
    </div>
  );
};

export default GameDetailPage;