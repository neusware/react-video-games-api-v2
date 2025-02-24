import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import GamesPage from "./pages/GamesPage"
import GameDetailPage from "./pages/GameDetailPage"
import GamesByPage from "./pages/GamesByPage"
import Footer from "./components/Footer"
import PublisherPage from "./pages/PublisherPage"
import PublishersPage  from "./pages/PublishersPage"

//componente principal que renderiza main.jsx | hace uso de reactrouter para la navegación entre páginas por cambio en url sin recarga SPA
function App() {
  
  //retorno de elementos y componentes
  return (

    //envuelvo en un elemento router
    <Router>
      
      {/* envuelvo header-main en div */}
      <div className="min-h-screen bg-gray-200">
        
        {/* componente encabezado */}
        <Header />

        <main>

          {/* Defino las rutas | path=x -> (renderiza) -> componente x*/}
          <Routes>

            {/* el path raiz renderiza el componente HomePage */}
            <Route path="/" element={<HomePage />} />

            <Route path="/games" element={<GamesPage />} />

            {/* :id/type es un parámetro que se pasa de un link, recoge la ruta la URL  y vuelve a recoger el componente como prop*/}
            <Route path="/game/:id" element={<GameDetailPage />} />

            <Route path="/games/:type/:id" element={<GamesByPage />} />

            <Route path="/publisher/:id" element={<PublisherPage />} />

            <Route path="/publishers" element={<PublishersPage />} />

          </Routes>
        
        </main>

      </div>
      
      {/*elemento pie de pagina +  componente pie de página */}
      <footer>
        <Footer />
      </footer>

    {/* Cierre anidamiento */}
    </Router>
  )
}

//exporto
export default App

// El orden de los elementos-componentes es crucial, desde  este mismo se renderiza la aplicación en este caso.