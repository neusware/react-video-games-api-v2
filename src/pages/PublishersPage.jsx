import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { searchPublishers } from "../api"

// componente para la pagina de publishers
function PublishersPage() {

    //--hooks
    const [publishers, setPublishers] = useState([])
    const [searchTerm, setSearchTerm] = useState("") //estado input

    //estados para paginacion
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    //al montar el componente
    useEffect(() => {

        //declaro funcion con delay 
        const delayDebounceFn = setTimeout(() => {

            //fetch interno con URLSearchParams
            searchPublishers(searchTerm, currentPage).then((data) => {
                
                //setteo segun retorno
                setPublishers(data.results || [])

                //setteo con el calculo para paginar en funcion de los elementos retornados
                setTotalPages(Math.ceil(data.count / 20))
            })
        }, 300)//delay

        //limpio el delay si cambia el searchTerm o si currentPage cambia antes de completarlo 
        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm, currentPage])//dependencias

    //delcarando metodo para settear estado paginación en función de elemento
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    //retorno los elementos html que conforman el componente
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Buscar Editores</h1>
            <input
                type="text"
                placeholder="Inserte editor..."
                value={searchTerm}
                // setteo el estado onChange
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-8 border rounded"
            />
            {/* No reutilizo componente aqui pero podria */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* mapeo el estado sacando html a piñon*/}
                {publishers.map((publisher) => (
                    <Link
                        key={publisher.id}
                        to={`/publisher/${publisher.id}`}
                        className="block bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
                    >
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{publisher.name}</h3>
                            <p className="text-sm text-gray-600">Títulos {publisher.games_count}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* paginación, si estado >1 creo array con el totalpages y renderizo elementos btn, su estilo en función del estado */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`mx-1 px-3 py-1 rounded ${
                                currentPage === page ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

//exporto
export default PublishersPage

