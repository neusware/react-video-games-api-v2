//!not using

// "use client"
// //importo hook
// import { useState, useEffect } from "react"
// //importo función
// import { fetchGames } from "../api"


// //declaro el compoentne, con prop
// function GameList({ onSelectGame }) {
  
//   //--declaro estados
//   const [games, setGames] = useState([])

//   //estos estados va actuar como flags
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   //uso hook useEffect para hacer fetch de juegos cuando se monta el componente
//   useEffect(() => {

//     // llamo a la funcion
//     fetchGames()
//       .then((fetchedGames) => {

//         //seteo el estado principal
//         setGames(fetchedGames)
//         //seteo flag
//         setLoading(false)
//       })
//       // controlo la excepción
//       .catch((err) => {

//         //seteo flags
//         setError("Failed to fetch games")
//         setLoading(false)
//       })

//   }, []) //sin dependencias, ejecuta cuando se monta el componente

//   //retorno el jsx en función del flag
//   if (loading) return <div>Loading...</div>
//   if (error) return <div>{error}</div>

//   //retorno los elementos
//   return (

//     <div>
//       <h2 className="text-2xl font-bold mb-4">Lista de títulos</h2>
//       <ul>
//         {/* Mapeo el estado, creando elementos html con cada valor */}
//         {games.map((game) => (
        
//           // Hago uso de la clave (id) del estado para identificarlo se 
//           <li
//             key={game.id}
//             className="mb-2 p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded"
//             onClick={() => onSelectGame(game)}
//           >
//             {game.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default GameList

