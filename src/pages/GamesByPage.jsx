

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchGamesByCategory } from "../api"
import GameCard from "../components/GameCard"

const GamesByPage = () => {
    const { type, id } = useParams()
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await fetchGamesByCategory(type, id)
                setGames(data.results)
                setLoading(false)
            } catch (error) {
                console.error(`Error fetching games by ${type}:`, error)
                setError(`Failed to fetch games by ${type}`)
                setLoading(false)
            }
        }
        fetchGames()
    }, [type, id])

    if (loading) return <div className="container mx-auto px-4 py-8 text-center">Cargando...</div>
    if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-red-600">
                Games by {type}: {games[0]?.[type === "genre" ? "genre" : "tag"]?.name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {games.map((game) => (
                    <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
                ))}
            </div>
        </div>
    )
}

export default GamesByPage

