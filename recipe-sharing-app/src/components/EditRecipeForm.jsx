import { useState } from 'react'
import useRecipeStore from './recipeStore'
import { useNavigate } from 'react-router-dom'

const EditRecipeForm = ({ recipe, onCancel }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe)
  const navigate = useNavigate()
  
  const [title, setTitle] = useState(recipe.title)
  const [description, setDescription] = useState(recipe.description)
  const [ingredients, setIngredients] = useState(recipe.ingredients.join('\n'))
  const [instructions, setInstructions] = useState(recipe.instructions)
  const [cookingTime, setCookingTime] = useState(recipe.cookingTime)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const updatedRecipe = {
      title,
      description,
      ingredients: ingredients.split('\n').filter(i => i.trim() !== ''),
      instructions,
      cookingTime: parseInt(cookingTime)
    }
    
    updateRecipe(recipe.id, updatedRecipe)
    navigate(`/recipe/${recipe.id}`)
  }

  return (
    <div className="edit-form">
      <h2>Edit Recipe</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (one per line)</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            min="1"
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  )
}

export default EditRecipeForm
