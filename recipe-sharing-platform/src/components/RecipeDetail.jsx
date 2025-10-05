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
    steps: [''] // Changed from 'instructions' to 'steps'
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // useEffect for component side effects
  useEffect(() => {
    console.log('AddRecipeForm component mounted')
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

    // Steps validation (changed from instructions)
    const emptySteps = formData.steps.filter(step => !step.trim())
    if (emptySteps.length > 0) {
      newErrors.steps = 'All steps must be filled' // Updated error key
    } else if (formData.steps.length < 2) {
      newErrors.steps = 'At least 2 steps are required' // Updated error key
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
        steps: formData.steps // Updated to use steps
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
        steps: [''] // Updated to use steps
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
                       
