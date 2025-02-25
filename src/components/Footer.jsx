import { Link } from 'react-router-dom';

// Declaro el componente
const Footer = () => {
  // retorno el jsx
  return (
    //elementos html que conforman el componente
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-400">
              Sobre la web
            </h3>
            <p className="text-md">
              Wiki desarrollada con React y RAWG para información y reviews de
              videojuegos.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-400">Enlaces</h3>
            <ul className="space-y-2">
              {/* Hago uso de react-router link */}
              <li>
                <Link
                  to="/"
                  className="hover:text-red-400 transition duration-300"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  className="hover:text-red-400 transition duration-300"
                >
                  Biblioteca
                </Link>
              </li>
              <li>
                <Link
                  to="/publishers"
                  className="hover:text-red-400 transition duration-300"
                >
                  Editores
                </Link>
              </li>
              <li>
                {/* Links capados */}
                <Link
                  to="#"
                  className="hover:text-red-400 transition duration-300"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-red-400 transition duration-300"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-400">
              Nuestras redes sociales
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-red-400 transition duration-300"
              >
                Facebook
              </a>
              <a
                href="#"
                className="hover:text-red-400 transition duration-300"
              >
                Twitter
              </a>
              <a
                href="#"
                className="hover:text-red-400 transition duration-300"
              >
                Instagram
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-400">Newsletter</h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Tu email"
                className="px-4 py-2 w-full rounded-l-full focus:outline-none text-black"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-r-full hover:bg-red-700 transition duration-300"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; Neusware - 2025 | Práctica REACT - DIW</p>
        </div>
      </div>
    </footer>
  );
};

// exporto
export default Footer;
