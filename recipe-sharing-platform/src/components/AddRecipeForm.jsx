import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const AddRecipeForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: '',
    cookingTime: '',
    difficulty: 'Easy',
    servings: '',
    ingredients: [''],
    instructions: ['']
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // useEffect for any side effects (if needed for testing)
  useEffect(() => {
    console.log('AddRecipeForm component mounted')
    // You could fetch categories or pre-populate data here
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }))

    // Clear array errors
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayField = (index, field) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        [field]: newArray
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required field validation
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required'
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Recipe title must be at least 3 characters'
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'Recipe summary is required'
    } else if (formData.summary.trim().length < 10) {
      newErrors.summary = 'Summary must be at least 10 characters'
    }

    if (!formData.cookingTime || formData.cookingTime <= 0) {
      newErrors.cookingTime = 'Valid cooking time is required'
    }

    if (!formData.servings || formData.servings <= 0) {
      newErrors.servings = 'Valid serving size is required'
    }

    // Ingredients validation
    const emptyIngredients = formData.ingredients.filter(ing => !ing.trim())
    if (emptyIngredients.length > 0) {
      newErrors.ingredients = 'All ingredients must be filled'
    } else if (formData.ingredients.length < 2) {
      newErrors.ingredients = 'At least 2 ingredients are required'
    }

    // Instructions validation
    const emptyInstructions = formData.instructions.filter(inst => !inst.trim())
    if (emptyInstructions.length > 0) {
      newErrors.instructions = 'All instructions must be filled'
    } else if (formData.instructions.length < 2) {
      newErrors.instructions = 'At least 2 instructions are required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0]
      const element = document.querySelector(`[name="${firstError}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, you would send this data to a backend
      const newRecipe = {
        id: Date.now(), // Temporary ID
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        image: formData.image.trim() || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        cookingTime: parseInt(formData.cookingTime),
        difficulty: formData.difficulty,
        servings: parseInt(formData.servings),
        ingredients: formData.ingredients,
        instructions: formData.instructions
      }

      console.log('Recipe submitted:', newRecipe)
      
      // Show success message
      alert('Recipe added successfully!')
      
      // Reset form
      setFormData({
        title: '',
        summary: '',
        image: '',
        cookingTime: '',
        difficulty: 'Easy',
        servings: '',
        ingredients: [''],
        instructions: ['']
      })
      
      // Redirect to home page
      navigate('/')
    } catch (error) {
      console.error('Error submitting recipe:', error)
      alert('Error adding recipe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Share Your Recipe
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Contribute to our community by sharing your delicious recipes with fellow food lovers
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Form Section */}
            <div className="lg:col-span-2 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Recipe Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    Recipe Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300 ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Classic Chocolate Chip Cookies"
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Recipe Summary */}
                <div>
                  <label htmlFor="summary" className="block text-sm font-semibold text-gray-700 mb-2">
                    Recipe Summary *
                  </label>
                  <textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300 ${
                      errors.summary ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Brief description of your recipe and what makes it special..."
                  />
                  {errors.summary && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.summary}
                    </p>
                  )}
                </div>

                {/* Image URL */}
                <div>
                  <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                    Recipe Image URL
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                    placeholder="https://example.com/your-recipe-image.jpg"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Leave empty to use a default recipe image
                  </p>
                </div>

                {/* Cooking Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Cooking Time */}
                  <div>
                    <label htmlFor="cookingTime" className="block text-sm font-semibold text-gray-700 mb-2">
                      Cooking Time (minutes) *
                    </label>
                    <input
                      type="number"
                      id="cookingTime"
                      name="cookingTime"
                      value={formData.cookingTime}
                      onChange={handleInputChange}
                      min="1"
                      max="600"
                      className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300 ${
                        errors.cookingTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.cookingTime && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        {errors.cookingTime}
                      </p>
                    )}
                  </div>

                  {/* Servings */}
                  <div>
                    <label htmlFor="servings" className="block text-sm font-semibold text-gray-700 mb-2">
                      Servings *
                    </label>
                    <input
                      type="number"
                      id="servings"
                      name="servings"
                      value={formData.servings}
                      onChange={handleInputChange}
                      min="1"
                      max="20"
                      className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300 ${
                        errors.servings ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.servings && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        {errors.servings}
                      </p>
                    )}
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-700 mb-2">
                      Difficulty *
                    </label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ingredients *
                  </label>
                  <div className="space-y-3">
                    {formData.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-3 flex-shrink-0">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
                          className={`flex-1 px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300 ${
                            errors.ingredients && !ingredient.trim() ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder={`Ingredient ${index + 1} (e.g., 2 cups flour)`}
                        />
                        {formData.ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField(index, 'ingredients')}
                            className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayField('ingredients')}
                    className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 font-medium"
                  >
                    + Add Ingredient
                  </button>
                  {errors.ingredients && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.ingredients}
                    </p>
                  )}
                </div>

                {/* Instructions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Instructions *
                  </label>
                  <div className="space-y-4">
                    {formData.instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-3">
                        <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <textarea
                            value={instruction}
                            onChange={(e) => handleArrayChange(index, e.target.value, 'instructions')}
                            rows={3}
                            className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300 ${
                              errors.instructions && !instruction.trim() ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder={`Step ${index + 1} - Describe this step in detail...`}
                          />
                        </div>
                        {formData.instructions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField(index, 'instructions')}
                            className="mt-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 font-medium h-fit"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayField('instructions')}
                    className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 font-medium"
                  >
                    + Add Step
                  </button>
                  {errors.instructions && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.instructions}
                    </p>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <Link
                    to="/"
                    className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-semibold text-center"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-orange-300 transition-colors duration-300 font-semibold flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Recipe...
                      </>
                    ) : (
                      'Add Recipe'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Preview Section */}
            <div className="bg-gray-50 p-8 border-l border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recipe Preview</h3>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={formData.image || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'}
                  alt="Recipe preview"
                  className="w-full h-40 object-cover"
                  onError={handleImageError}
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {formData.title || 'Your Recipe Title'}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {formData.summary || 'Recipe summary will appear here...'}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{formData.cookingTime ? `${formData.cookingTime} mins` : 'Time'}</span>
                    <span>{formData.difficulty}</span>
                    <span>{formData.servings ? `${formData.servings} servings` : 'Servings'}</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Tips for a great recipe:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Be specific with measurements</li>
                  <li>• Include step-by-step instructions</li>
                  <li>• Add cooking tips and variations</li>
                  <li>• Use high-quality images</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRecipeForm
