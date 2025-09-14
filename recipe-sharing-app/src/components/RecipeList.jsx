import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes)

  return (
    <div className="recipe-list">
      <h2>All Recipes</h2>
      
      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <div className="recipe-meta">
                  <span>{recipe.cookingTime} minutes</span>
                  <span>{recipe.ingredients.length} ingredients</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipeList
