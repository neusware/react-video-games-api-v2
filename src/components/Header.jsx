import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="bg-black text-red-400 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Wiki de títulos
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
        </ul>
      </nav>
    </header>
  )
}

export default Header

