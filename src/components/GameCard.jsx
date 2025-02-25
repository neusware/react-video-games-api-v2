// Importo el componente Link de react-router-dom para poder navegar entre las páginas cambiando la ruta del explorador
import { Link } from "react-router-dom"

//Declaro el elemento, con sus props, se le pasarán a partir de los datos cuando se mapee la response de la API
const GameCard = ({ id, name, background_image }) => {
  
  //renderizo los componentes, uso los props
  return (

    // Anido todos los elementos dentro de Link, para controlar el click sobre el componente, el cual navegará a la ruta del juego seleccionado, usando el id por prop
    <Link
      to={`/game/${id}`}
      className="block bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
      onClick={() => console.log(`Navegando a detalles del juego con id: ${id}`)}
    >

      <div className="relative">
        {/* Hago uso de otros props */}
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

