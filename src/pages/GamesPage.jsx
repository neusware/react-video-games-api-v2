import { useState, useEffect } from "react"
import GameCard from "../components/GameCard"
import { searchGames, fetchPopularGames } from "../api"

//componente pagina biblioteca
function GamesPage() {

  //--hooks

  //--estados
  const [games, setGames] = useState([])
  const [popularGames, setPopularGames] = useState([])

  //input
  const [searchTerm, setSearchTerm] = useState("")
  
  //paginacion
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  //al montar el componente
  useEffect(() => {

    //declaro funcion flecha async por fetch
    const loadPopularGames = async () => {
      
      //manejo errores
      try {
        
        //almaceno la lecutra
        const data = await fetchPopularGames()

        //seteo el estado
        setPopularGames(data.results || []) //segundo parametro valor predeterminado si no hay datos

        //si excepcion
      } catch (error) {
        //fb
        console.error("Error en GamesPage (loadPopularGames):", error)
      }
    }

    //ejecuto la función
    loadPopularGames()
  }, []) //useEffect sin dependencias


  //monto componentes al cambiar el input 
  useEffect(() => {

    //con delay (300) para evitar que se ejecute cuando hay muchos changes en el input
    const delayDebounceFn = setTimeout(() => {

      //si hay input
      if (searchTerm) {

        //ejecuto el metodo, le paso el termino input, el estado (paginacion)
        searchGames(searchTerm, currentPage).then((data) => {

          //seteo estados
          setGames(data.results || [])
          
          // calcula y establece el número total de páginas necesarias para paginar una lista de elementos, asegurando que todos los elementos se distribuyan adecuadamente en las páginas.
          setTotalPages(Math.ceil(data.count / 20))
        })
        
      //sin input
      } else {

        //seteo estados
        setGames([])
        setTotalPages(0)
      }
    }, 300)//delay

    //
    //cancelo el delay si el componente si desmonta o si estado cambia antes d completase el tiempo
    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, currentPage]) //dependencias del useEffect

  //declaro funcion para setear el estado para la paginación, le paso por parametro el numero según click en elemnto html paginacion
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Biblioteca</h1>
        {/* setteo el estado para el input con el evento onChange */}
        <input
            type="text"
            placeholder="Buscar juegos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-8 border rounded"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* anido ternario en función del estado input*/}
          {searchTerm ? (
            // entonces ternario en estado games, si hay..
              games.length > 0 ? (
                // renderizo componentes mapeando el estad
                  games.map((game) => (
                      <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
                  ))
              ) : (
                //si no hay..
                  <p>Buscando...</p>
              )
            
          // si no estado input, miro si estado popularGames
          ) : popularGames.length > 0 ? (

            // para renderizar mapeando
              popularGames.map((game) => (
                  <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
              ))
          ) : (
            // O renderizar elemento 
              <p>Buscando...</p>
          )}
        </div>

        {/* Para mostrar la paginacion si hay mas de una pagina, check estado para renderizar */}
        {totalPages > 1 && (

            <div className="mt-8 flex justify-center">
             
              {/* Array [1....totalPages].mapeando creando botón con el valor correspondiente */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                  // atributo key para identificar el elemento
                      key={page}

                      //setteo el estado
                      onClick={() => handlePageChange(page)}

                      //controlo el estilo según estado para dar fb
                      className={`mx-1 px-3 py-1 rounded ${
                          currentPage === page ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
                      }`}
                  >

                    {/* Valor en el array, contenido del elemento */}
                    {page}
                    
                  </button>
              ))}
            </div>
        )}
      </div>
  )
}

export default GamesPage

