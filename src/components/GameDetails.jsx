//! not using
// //delcaro el componente, con prop
// function GameDetails({ game }) {
//     if (!game) {
//       return <div className="text-lg">Select a game to see details</div>
//     }
  
//     return (
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Game Details</h2>
//         <div className="bg-white p-4 rounded shadow">
//           <img
//             src={game.background_image || "/placeholder.svg"}
//             alt={game.name}
//             className="w-full h-48 object-cover mb-4 rounded"
//           />
//           <p className="mb-2">
//             <strong>Name:</strong> {game.name}
//           </p>
//           <p className="mb-2">
//             <strong>Rating:</strong> {game.rating}
//           </p>
//           <p className="mb-2">
//             <strong>Released:</strong> {game.released}
//           </p>
//           <p>
//             <strong>Genres:</strong> {game.genres.map((genre) => genre.name).join(", ")}
//           </p>
//         </div>
//       </div>
//     )
//   }
  
//   export default GameDetails
  
  