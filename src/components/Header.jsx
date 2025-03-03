// Importo el componente Link de react-router-dom para poder navegar entre las páginas cambiando la ruta del explorador
import { Link } from "react-router-dom"
import CircularText from "./CircularText"

// Declaro el componente
function Header() {

  // Retorno el JSX que contiene los elemetos del header
  return (

    <header className="bg-black text-red-400 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Links con el Link de react-router, to (raíz). Funciona como un anchor, aunque tiene otra naturaleza, evita recargar la página */}
        <Link to="/" className="flex items-center">
          <CircularText text="DIW**REACT**API**" onHover="speedUp" spinDuration={20} className="w-16 h-16 mr-2 ml-2 mb-1 mt-1" />
          {/* <span className="text-2xl font-bold">Wiki de títulos</span> */}
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/games" className="hover:text-gray-300">
              Biblioteca
            </Link>
          </li>
          <li>
            <Link to="/publishers" className="hover:text-gray-300">Editores</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

// Exporto
export default Header

