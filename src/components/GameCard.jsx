import { Link } from "react-router-dom"

const GameCard = ({ id, name, background_image }) => {
  return (
    <Link
      to={`/game/${id}`}
      className="block bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
      onClick={() => console.log(`Navigating to game details for game ID: ${id}`)}
    >
      <div className="relative">
        <img src={background_image || "/placeholder.svg"} alt={name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-80 transition duration-300">
          <p className="text-red-400 text-sm  bg-black p-2 rounded-full">Ver detalles</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>
      </div>
    </Link>
  )
}

export default GameCard

