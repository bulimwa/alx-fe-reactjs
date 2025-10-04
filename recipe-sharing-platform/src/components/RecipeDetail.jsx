import React from 'react'
import { useParams, Link } from 'react-router-dom'
import recipeData from '../data.json'

const RecipeDetail = () => {
  const { id } = useParams()
  const recipe = recipeData.find(recipe => recipe.id === parseInt(id))

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h2>
          <Link to="/" className="text-orange-500 hover:text-orange-600">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // Mock detailed recipe data
  const recipeDetails = {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6"
        >
          ← Back to Recipes
        </Link>

        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
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
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                  {recipe.cookingTime} mins
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                  {recipe.difficulty}
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-lg mb-4">{recipe.summary}</p>
            <div className="flex items-center text-gray-500">
              <span>By {recipeDetails.author}</span>
              <span className="mx-2">•</span>
              <span>Serves {recipeDetails.servings}</span>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipeDetails.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipeDetails.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 pt-0.5">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
