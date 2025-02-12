import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchGameDetails } from "../api"
import Footer from "../components/Footer"

const GameDetailPage = () => {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [showDescription, setShowDescription] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchGameDetails(id)
        setGame(data)
      } catch (error) {
        console.error("Error fetching game details:", error)
      }
    }

    fetchDetails()
  }, [id])

  if (!game) {
    return <div className="container mx-auto px-4 py-8 text-center">Cargando...</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-red-600">{game.name}</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <img src={game.background_image || "/placeholder.svg"} alt={game.name} className="w-full h-96 object-cover" />
          <div className="p-6">
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="bg-black text-red-400 px-6 py-2 rounded-full hover:text-red-500 transition duration-300 mb-4"
            >
              {showDescription ? "Ocultar sinopsis" : "Mostrar sinopsis"}
            </button>
            {showDescription && <p className="mb-4 text-gray-700">{game.description_raw}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-red-600">Platformas</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {game.platforms.map((platform) => (
                    <li key={platform.platform.id}>{platform.platform.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-red-600">Géneros</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {game.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  )
}

export default GameDetailPage

