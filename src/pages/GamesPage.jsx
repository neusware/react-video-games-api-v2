import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { searchGames, fetchPopularGames } from '../api';

//componente pagina biblioteca
function GamesPage() {

  //--------hooks

  //elementos fruto del input
  const [games, setGames] = useState([]);

  //primera carga, 10 elementos
  const [popularGames, setPopularGames] = useState([]);

  //input busqueda
  const [searchTerm, setSearchTerm] = useState('');

  //useEffect para obtener los juegos populares al montar componente
  useEffect(() => {

    //declaro la función async que ejecutará la función fetch a la API 
    const loadPopularGames = async () => {

      //manejo de excepciones
      try {

        //petición asíncrona con el método de app.js
        const data = await fetchPopularGames();

        //fb
        console.log('Fetched popular games:', data);

        //uso del seter, si está vacío o valor falsy se asigna un array vacío
        setPopularGames(data.results || []);

      } catch (error) {
        console.error('Error fetching popular games:', error);
      }
    };

    //llamada a la función
    loadPopularGames();
  }, []); //useEffect cuando monta el componente, sin dependencias []


  //useEffect para montar componentes al cambiar input
  useEffect(() => {

    //con pequeño delay (300)
    const delayDebounceFn = setTimeout(() => {

      //si hay input
      if (searchTerm) {

        //busco
        searchGames(searchTerm).then((data) => {

          //fb
          console.log('Fetched games:', data);

          //seteo estado de juegos para cargar los componentes != a los 10 primeros
          setGames(data.results || []);
        });

      } else {
        setGames([]); // Limpiar resultados de búsqueda cuando no hay término de búsqueda
      }

    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Biblioteca</h1>

      <input
        type="text"
        placeholder="Buscar juegos..."

        // vinculo el valor del input (atributo value) con el estado (searchTerm), y le endorso el evento onChange, de forma que si cambia el input, recogo el nuevo valor y seteo el estado, desencadenando la lógica con el useEffect()
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-8 border rounded"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {/* doble terminario; si hay termino (input) evalui si el estado juegos tiene elementos, de ser así mapeo y renderizo los componentes. Si no es así, renderizo el elemento <p>. De no haber input renderizo componentes con el estado juegos populares, si no hay elementos renderizo elemento <p> */}
        {searchTerm ? (
          games.length > 0 ? (
            games.map((game) => (
              <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
            ))
          ) : (
            <p>Buscando...</p>
          )
        ) : (
          popularGames.length > 0 ? (
            popularGames.map((game) => (
              <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
            ))
          ) : (
            <p>Buscando...</p>
          )
        )}
      </div>
    </div>
  );
}

//exporto
export default GamesPage;