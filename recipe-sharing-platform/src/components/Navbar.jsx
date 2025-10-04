import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-orange-500">
            RecipeShare
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/add-recipe"
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors duration-300"
            >
              Add Recipe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
