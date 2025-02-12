"use client"

import { useState, useEffect } from "react"
import { fetchGames } from "../api"

function GameList({ onSelectGame }) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchGames()
      .then((fetchedGames) => {
        setGames(fetchedGames)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to fetch games")
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Game List</h2>
      <ul>
        {games.map((game) => (
          <li
            key={game.id}
            className="mb-2 p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded"
            onClick={() => onSelectGame(game)}
          >
            {game.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GameList

