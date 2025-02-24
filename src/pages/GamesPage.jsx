"use client"

import { useState, useEffect } from "react"
import GameCard from "../components/GameCard"
import { searchGames, fetchPopularGames } from "../api"

function GamesPage() {
  const [games, setGames] = useState([])
  const [popularGames, setPopularGames] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const loadPopularGames = async () => {
      try {
        const data = await fetchPopularGames()
        setPopularGames(data.results || [])
      } catch (error) {
        console.error("Error fetching popular games:", error)
      }
    }
    loadPopularGames()
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchGames(searchTerm, currentPage).then((data) => {
          setGames(data.results || [])
          setTotalPages(Math.ceil(data.count / 20))
        })
      } else {
        setGames([])
        setTotalPages(0)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, currentPage])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Biblioteca</h1>
        <input
            type="text"
            placeholder="Buscar juegos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-8 border rounded"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchTerm ? (
              games.length > 0 ? (
                  games.map((game) => (
                      <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
                  ))
              ) : (
                  <p>Buscando...</p>
              )
          ) : popularGames.length > 0 ? (
              popularGames.map((game) => (
                  <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
              ))
          ) : (
              <p>Buscando...</p>
          )}
        </div>
        {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`mx-1 px-3 py-1 rounded ${
                          currentPage === page ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {page}
                  </button>
              ))}
            </div>
        )}
      </div>
  )
}

export default GamesPage

