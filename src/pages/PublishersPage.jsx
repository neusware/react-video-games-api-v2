"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { searchPublishers } from "../api"

function PublishersPage() {
    const [publishers, setPublishers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchPublishers(searchTerm, currentPage).then((data) => {
                setPublishers(data.results || [])
                setTotalPages(Math.ceil(data.count / 20))
            })
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm, currentPage])

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Buscar Editores</h1>
            <input
                type="text"
                placeholder="Buscar editores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-8 border rounded"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {publishers.map((publisher) => (
                    <Link
                        key={publisher.id}
                        to={`/publisher/${publisher.id}`}
                        className="block bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
                    >
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{publisher.name}</h3>
                            <p className="text-sm text-gray-600">Games count: {publisher.games_count}</p>
                        </div>
                    </Link>
                ))}
            </div>
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

export default PublishersPage

