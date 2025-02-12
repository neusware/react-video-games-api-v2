const API_KEY = "23aaa06072c14471b0a7df7f2cd79c5b"
const BASE_URL = "https://api.rawg.io/api"

async function fetchFromAPI(endpoint: string, params = {}) {
  const queryParams = new URLSearchParams({ key: API_KEY, ...params })
  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`)
  if (!response.ok) throw new Error("Network response was not ok")
  return response.json()
}

export async function fetchPopularGames() {
  const data = await fetchFromAPI("/games", { ordering: "-rating", page_size: 10 })
  return data.results
}

export async function searchGames(searchTerm: string) {
  const data = await fetchFromAPI("/games", { search: searchTerm })
  return data.results
}

export async function fetchGameDetails(id: string) {
  return fetchFromAPI(`/games/${id}`)
}

