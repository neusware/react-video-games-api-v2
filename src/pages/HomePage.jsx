import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPopularGames } from '../api';
import GameCard from '../components/GameCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import leftArrow from '../assets/left-arrow.svg'; 
// import rightArrow from '../assets/right-arrow.svg';

//functiones para los btns del carousel
/* const CustomLeftArrow = ({ onClick }) => (
  
  // Le agrego función para fb funcionamiento
  <button
    onClick={() => {
      console.log('Left arrow clicked');
      onClick();
    }}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
  >
    <img src={leftArrow} alt="Left Arrow" className="w-6 h-6" />
  </button>
); */

/* const CustomRightArrow = ({ onClick }) => (
  <button
    onClick={() => {
      console.log('Right arrow clicked');
      onClick();
    }}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
  >
    <img src={rightArrow} alt="Right Arrow" className="w-6 h-6" />
  </button>
);
 */

//componente página home
const HomePage = () => {
  
  //estado y setter
  const [popularGames, setPopularGames] = useState([]);

  //useEffect para obtener los juegos populares cuando carga componente
  useEffect(() => {
    
    //declaro la función asincrona que ejecutará la función fetch a la API
    const fetchGames = async () => {
      
      //controlo excepciones
      try {
        //petición a la api a través de metodo declarado app.js
        const data = await fetchPopularGames();
        
        //fb
        console.log('Fetched data:', data);
        
        //setter del estado
        setPopularGames(data.results || []);
      }
       catch (error) {
        console.error('Error fetching popular games:', error);
      }
    };

    //llamada a la función
    fetchGames();
  }, []); //se ejecuta solo una vez no hay dependencias []


  //configuración tipo del carousel (npm)
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  //elementos del componente
   return (
    <>
    <div className="container mx-auto px-4 py-8 bg-gray-100 shadow-lg mt-2">
      {/* <h1 className="text-4xl font-bold mb-8">Bienvenido</h1> */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Top 10</h2>
        
        {/* elemento carousel con sus props */}
        <Carousel
          responsive={responsive}
          // customLeftArrow={<CustomLeftArrow />}
          // customRightArrow={<CustomRightArrow />}
          swipeable={true}
          draggable={true}
          showDots={false}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3500}
          keyBoardControl={true}
          customTransition="all .3"
          transitionDuration={100}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px mx-2"
        >

          {/* mapeo del estado y generación de componentes recorriendolo, ternaria */}
          {popularGames.length > 0 ? (

            // le paso las props al componente según mapeo
            popularGames.map((game) => (
              <GameCard id={game.id} name={game.name} background_image={game.background_image} />
            ))
          ) : (
            //de lo contrario
            <p>No se encontraron títulos</p>
          )}
        </Carousel>
      
      
      </section>
      <div className=''>
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Explora más juegos</h2>
          <p className="mb-4">Busca y descubre miles de juegos en nuestra extensa biblioteca.</p>
          {/* btn con react-router a /games*/}
          <Link to="/games" className="bg-black text-red-400 px-6 py-2 rounded-full hover:text-red-500">
            Ver todos los juegos
          </Link>
      
        </section>
      </div>
    </div>
    </>
  );
};


//exporto componente
export default HomePage;