import { useParams, Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'
import EditRecipeForm from './EditRecipeForm'
import { useState } from 'react'

const RecipeDetails = () => {
  const { id } = useParams()
  const recipeId = parseInt(id)
  const recipe = useRecipeStore(state => 
    state.recipes.find(recipe => recipe.id === recipeId)
  )
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  const [isEditing, setIsEditing] = useState(false)

  if (!recipe) {
    return (
      <div className="recipe-details">
        <h2>Recipe not found</h2>
        <Link to="/">Back to recipes</Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId)
    }
  }

  if (isEditing) {
    return <EditRecipeForm recipe={recipe} onCancel={() => setIsEditing(false)} />
  }

  return (
    <div className="recipe-details">
      <Link to="/" className="back-link">← Back to recipes</Link>
      
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-actions">
          <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
          <button onClick={handleDelete} className="btn-delete">Delete</button>
        </div>
      </div>
      
      <p className="recipe-description">{recipe.description}</p>
      
      <div className="recipe-info">
        <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
      </div>
      
      <div className="ingredients-section">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      
      <div className="instructions-section">
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.split('\n').map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default RecipeDetails
