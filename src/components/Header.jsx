import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Explorador de Games
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/games" className="hover:text-gray-300">
              Games
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

