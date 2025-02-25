

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchPublisherDetails, fetchPublisherGames } from "../api"
import GameCard from "../components/GameCard"

//componente para la página del publisher
const PublisherPage = () => {

    //obtengo el id de la URL
    const { id } = useParams()

    //estados
    const [publisher, setPublisher] = useState(null)
    const [games, setGames] = useState([])

    //flags
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    //al montar el componente o cambiar el id
    useEffect(() => {

        //declaro la función async para fetch
        const fetchData = async () => {
            
            //manejo de excepciones
            try {
                
                //doblefetch en paralelo, que internamente ejecutan el fetch a la api segun URLSearchParams
                const [publisherData, gamesData] = await Promise.all([fetchPublisherDetails(id), fetchPublisherGames(id)])

                //setteos de estados
                setPublisher(publisherData)
                setGames(gamesData.results)

                //setteo flag
                setLoading(false)

            //si excepcion
            } catch (error) {
                console.error("Error fetching publisher data:", error)
                setError("Failed to fetch publisher data")
                setLoading(false)
            }
        }

        //ejecuto la función
        fetchData()

    }, [id]) //useEffect dependencia id

    //retornos segun flgs
    if (loading) return <div className="container mx-auto px-4 py-8 text-center">Cargando...</div>
    if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>

    //retorno de elementos que conforman el componente
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-red-600">{publisher.name}</h1>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 p-6">
                <h2 className="text-2xl font-bold mb-4 text-red-600">Sobre {publisher.name}</h2>
                {/* Viene en html, lo incrusto directamente (dangerously)  */}
                <span className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: publisher.description }}></span> 
                <h2 className="text-2xl font-bold mb-4 text-red-600">Catálogo</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* mapeo el estado pasando proprs al componente */}
                    {games.map((game) => (
                        <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PublisherPage

