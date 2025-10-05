import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import recipeData from '../data.json'

const RecipeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  // Use useEffect to fetch recipe data
  useEffect(() => {
    // Simulate API call with setTimeout
    const fetchRecipe = () => {
      setLoading(true)
      // Find the recipe from the data
      const foundRecipe = recipeData.find(recipe => recipe.id === parseInt(id))
      
      // Simulate network delay
      setTimeout(() => {
        setRecipe(foundRecipe)
        setLoading(false)
      }, 500)
    }

    fetchRecipe()
  }, [id]) // Re-run when id changes

  // Mock detailed recipe data function
  const getRecipeDetails = (recipe) => {
    if (!recipe) return null
    
    return {
      ...recipe,
      ingredients: [
        '2 cups all-purpose flour',
        '1 cup sugar',
        '2 eggs',
        '1 cup butter',
        '1 tsp vanilla extract',
        '1 cup chocolate chips'
      ],
      instructions: [
        'Preheat oven to 350°F (175°C)',
        'Mix dry ingredients in a bowl',
        'Cream butter and sugar together',
        'Add eggs and vanilla, mix well',
        'Combine with dry ingredients',
        'Fold in chocolate chips',
        'Bake for 10-12 minutes'
      ],
      servings: 4,
      author: 'Chef John'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h2>
          <p className="text-gray-600 mb-4">The recipe you're looking for doesn't exist.</p>
          <Link 
            to="/" 
            className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const recipeDetails = getRecipeDetails(recipe)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6 font-medium transition-colors duration-300"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Recipes
        </button>

        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 transform transition-all duration-300 hover:shadow-xl">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">
                {recipe.title}
              </h1>
              <div className="flex space-x-4">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {recipe.cookingTime} mins
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {recipe.difficulty}
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              {recipe.summary}
            </p>
            <div className="flex items-center text-gray-500 text-sm">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                By {recipeDetails.author}
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Serves {recipeDetails.servings}
              </span>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipeDetails.ingredients.map((ingredient, index) => (
                <li 
                  key={index} 
                  className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition-colors duration-300"
                >
                  <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Instructions
            </h2>
            <ol className="space-y-4">
              {recipeDetails.instructions.map((instruction, index) => (
                <li 
                  key={index} 
                  className="flex p-4 rounded-lg hover:bg-orange-50 transition-colors duration-300"
                >
                  <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 pt-1">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-12">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 font-medium"
          >
            Back to Recipes
          </button>
          <Link
            to="/add-recipe"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300 font-medium"
          >
            Share Your Recipe
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
