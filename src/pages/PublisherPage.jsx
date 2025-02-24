

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchPublisherDetails, fetchPublisherGames } from "../api"
import GameCard from "../components/GameCard"

const PublisherPage = () => {
    const { id } = useParams()
    const [publisher, setPublisher] = useState(null)
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [publisherData, gamesData] = await Promise.all([fetchPublisherDetails(id), fetchPublisherGames(id)])
                setPublisher(publisherData)
                setGames(gamesData.results)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching publisher data:", error)
                setError("Failed to fetch publisher data")
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    if (loading) return <div className="container mx-auto px-4 py-8 text-center">Cargando...</div>
    if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-red-600">{publisher.name}</h1>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 p-6">
                <h2 className="text-2xl font-bold mb-4 text-red-600">Sobre {publisher.name}</h2>
                {/* Viene en html, lo incrusto directamente (dangerously)  */}
                <span className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: publisher.description }}></span> 
                <h2 className="text-2xl font-bold mb-4 text-red-600">Catálogo</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {games.map((game) => (
                        <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PublisherPage

