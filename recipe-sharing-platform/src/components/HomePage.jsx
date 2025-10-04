import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import recipeData from '../data.json'

const HomePage = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    setRecipes(recipeData)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Delicious Recipes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and share amazing recipes from our community of food lovers
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {recipe.summary}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {recipe.cookingTime} mins
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {recipe.difficulty}
                  </span>
                </div>

                <Link
                  to={`/recipe/${recipe.id}`}
                  className="inline-block w-full bg-orange-500 text-white text-center py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recipes found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
