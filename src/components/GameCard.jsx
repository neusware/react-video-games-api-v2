import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ id, name, background_image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={background_image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <Link to={`/game/${id}`} className="text-blue-500 hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default GameCard;