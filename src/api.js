const API_KEY = "23aaa06072c14471b0a7df7f2cd79c5b"
const BASE_URL = "https://api.rawg.io/api"

async function fetchFromAPI(endpoint, params = {}) {
  const queryParams = new URLSearchParams({
    key: API_KEY,
    ...params,
  })
  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export async function fetchPopularGames() {
  try {
    const data = await fetchFromAPI("/games", {
      ordering: "-rating",
      page_size: 10,
    })
    console.log("API Response:", data)
    return data
  } catch (error) {
    console.error("Error fetching popular games:", error)
    throw error
  }
}

export async function searchGames(query, page = 1) {
  try {
    const data = await fetchFromAPI("/games", {
      search: query,
      page,
      page_size: 20,
    })
    return data
  } catch (error) {
    console.error("Error searching games:", error)
    throw error
  }
}

export async function fetchGameDetails(id) {
  try {
    const data = await fetchFromAPI(`/games/${id}`)
    return data
  } catch (error) {
    console.error("Error fetching game details:", error)
    throw error
  }
}

export async function fetchGamesByCategory(type, id, page = 1) {
  try {
    const data = await fetchFromAPI("/games", {
      [`${type}s`]: id,
      page,
      page_size: 20,
    })
    return data
  } catch (error) {
    console.error(`Error fetching games by ${type}:`, error)
    throw error
  }
}

export async function fetchPublisherDetails(id) {
  try {
    const data = await fetchFromAPI(`/publishers/${id}`)
    return data
  } catch (error) {
    console.error("Error fetching publisher details:", error)
    throw error
  }
}

export async function fetchPublisherGames(id, page = 1) {
  try {
    const data = await fetchFromAPI("/games", {
      publishers: id,
      page,
      page_size: 20,
    })
    return data
  } catch (error) {
    console.error("Error fetching publisher games:", error)
    throw error
  }
}

export async function searchPublishers(query = "", page = 1) {
  try {
    const data = await fetchFromAPI("/publishers", {
      search: query,
      page,
      page_size: 20,
    })
    return data
  } catch (error) {
    console.error("Error searching publishers:", error)
    throw error
  }
}

