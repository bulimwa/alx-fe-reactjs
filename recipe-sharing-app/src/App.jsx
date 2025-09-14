import { useState } from 'react'
import useRecipeStore from './recipeStore'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe)
  const categories = useRecipeStore(state => state.categories.filter(cat => cat !== 'All'))
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [category, setCategory] = useState(categories[0] || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newRecipe = {
      title,
      description,
      ingredients: ingredients.split('\n').filter(i => i.trim() !== ''),
      instructions,
      cookingTime: parseInt(cookingTime),
      category
    }
    
    addRecipe(newRecipe)
    setTitle('')
    setDescription('')
    setIngredients('')
    setInstructions('')
    setCookingTime('')
  }

  return (
    <div className="add-recipe-form">
      <h2>Add New Recipe</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
            required
          />
        </div>
        
        <div className="form-group">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </div>
        
        <div className="form-group">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredients (one per line)"
            required
          />
        </div>
        
        <div className="form-group">
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Instructions"
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            placeholder="Cooking Time (minutes)"
            min="1"
            required
          />
        </div>
        
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  )
}

export default AddRecipeForm
