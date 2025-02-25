//no axios, por fetch de JS

//variables globales base esenciales para formar la URL (endpoint) al que se counsulta
const API_KEY = "23aaa06072c14471b0a7df7f2cd79c5b"
const BASE_URL = "https://api.rawg.io/api"
//el parametro endpoint es el primero que se agrega


//refactorizo en función parametrizada para hacer fetch. endpoint  junto con los parametros opcionales {} terminaran de conformar la ruta a la que se consulta (endpoint) en el URLSearchParams.
async function fetchFromAPI(endpoint, params = {}) {

  //URLSearchParams es una interfaz que facilita crear cadenas de consulta
  //parametros de la consulta A PARTIR DE OBJETO, conformado con la constante key + los parametros (desestructuración)
  const queryParams = new URLSearchParams({
    key: API_KEY,
    ...params,
  })

  //lectura, base_url+endpoint?cadena generada por los parametros
  //Los parámetros de consulta se añaden a la URL después del signo de interrogación ?. Permiten enviar datos adicionales al servidor en la solicitud. queryParams es una cadena que contiene los parámetros en el formato clave-valor, separados por &
  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`)

  //manejo error en el estado de la respuesta
  if (!response.ok) {
    throw new Error("Error al realizar la solicitud fetch en fetchFromAPI")
  }

  //retorno los datos
  return response.json()
}

//declaro y exporto funcion para fetch 10 juegos
export async function fetchPopularGames() {
  //async por await -> fetch

  //manejo de errores
  try {

    //!uso la función parametrizada (.../api/games?{token=xxx&ordering=-rating & page_size=10 })
    const data = await fetchFromAPI("/games", {
      ordering: "-rating",
      page_size: 10,
    })

    //fb
    console.log("Respuesta API:", data)
    
    //retorno de datos
    return data

  } catch (error) {
    console.error("Error fetching en fetchPopularGames", error)
    throw error
  }
}


//declaro y exporto método busqueda de juego (query==input)
export async function searchGames(query, page = 1) {
  
  //procedimiento similar
  try {
    
    const data = await fetchFromAPI("/games", {
      search: query,
      page,
      page_size: 20,
    })
    
    //retorno de datos
    return data

    //si excepción
  } catch (error) {

    //fb
    console.error("Error en searchGames:", error)
    throw error
  }
}

//lectura a API por (id)
export async function fetchGameDetails(id) {
 
  //manejo de exceciones
  try {

    //await para la asíncronia
    const data = await fetchFromAPI(`/games/${id}`)

    //retorno de datos
    return data

    //si excepcion
  } catch (error) {

    //fb
    console.error("Error fetching game details:", error)
    throw error
  }
}

//delcaro y exporto metodo para fetch a la API por categoría parametros(categoría, id)
export async function fetchGamesByCategory(type, id, page = 1) {
 
  try {
    
    //reutilizo la función con parámetros
    const data = await fetchFromAPI("/games", {
      [`${type}s`]: id,
      page,
      page_size: 20,
    })

    //retorno de datos
    return data

  } catch (error) {
    console.error(`Error en fetchingGamesBy ${type}:`, error)
    throw error
  }
}

//declaro y exporto función fetch publisher por id
export async function fetchPublisherDetails(id) {

  //manejo de excepciones
  try {

    //fetch (endpoint+parametro)
    const data = await fetchFromAPI(`/publishers/${id}`)
    
    //retorno los datos
    return data

    //excepción
  } catch (error) {
    console.error("Error en fetchPublisherDetails:", error)
    throw error
  }
}

//declaro y exporto función fetch titulos por publisher
export async function fetchPublisherGames(id, page = 1) {

  //manejo de excepciones
  try {


    //fetch con endpoint a piñon, parametros 
    const data = await fetchFromAPI("/games", {
      publishers: id,
      page,
      page_size: 20,
    })
    
    //retorno
    return data

    //si excepcion
  } catch (error) {
    console.error("Error en fetchPublisherGames", error)
    throw error
  }
}

//declaro y exporto método para buscar publishers (input)
export async function searchPublishers(query = "", page = 1) {
  try {

    const data = await fetchFromAPI("/publishers", {
      search: query, //la sobreescribo con el input
      page,
      page_size: 20,
    })

    //retorno los datos
    return data
  
    //si excepcion
  } catch (error) {
    console.error("Error en searchPublishers:", error)
    throw error
  }
}

