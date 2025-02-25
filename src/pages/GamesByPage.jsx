

import { useState, useEffect } from "react" //basic hooks
import { useParams } from "react-router-dom" // hook dependencia
import { fetchGamesByCategory } from "../api" //importo el fetch parametrizado
import GameCard from "../components/GameCard" //importo componente

//componente para juegos por categoría
const GamesByPage = () => {
    
    //---hooks
    const { type, id } = useParams()
    const [games, setGames] = useState([])
    
    //---flags
    const [loading, setLoading] = useState(true)

    //fb al usuario en interfaz sobre el error
    const [error, setError] = useState(null)

    //al montar el componente lanzo el fecth
    useEffect(() => {
        
        //declaro e construyo la arrow function
        const fetchGames = async () => {
            
            //manejo excepciones
            try {

                //almaceno la lectura, le paso los parámetros que se reutilizan en el URLSearchParams
                const data = await fetchGamesByCategory(type, id)
                
                //seteo estado
                setGames(data.results)
            
                //seteo flag
                setLoading(false)
            
            //si excepcion
            } catch (error) {
                console.error(`Error fetching en GameByPage: `, error)
                setError(`Fallo en lectura de juegos tipo:  ${type}`)

                //set flag
                setLoading(false)
            }
        }

        //ejecuto la función
        fetchGames()


    }, [type, id]) //dependencias

    //---returns
    
    //return por flag
    if (loading) return <div className="container mx-auto px-4 py-8 text-center">Cargando...</div>
    if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>

    //renderizado de los elementos html que conforman el componente
    return (
        <div className="container mx-auto px-4 py-8">
            
            {/* Operador encadenamiento opcional (?.) para acceder de a las propiedades del objeto, en este caso el primero del estado, y comportamiento en funcion del valor de la propiedad type en este elemento */}
            <h1 className="text-4xl font-bold mb-8 text-red-600">
                Juegos {type}: {games[0]?.[type === "genre" ? "genre" : "tag"]?.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* mapeo el estado, pasando props al componente */}
                {games.map((game) => (
                    <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
                ))}
            </div>
        </div>
    )
}

//exporto
export default GamesByPage

