import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes)

  return (
    <div className="recipe-list">
      <h2>All Recipes ({filteredRecipes.length})</h2>
      
      {filteredRecipes.length === 0 ? (
        <p>No recipes match your search criteria.</p>
      ) : (
        <div className="recipes-grid">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <div className="recipe-meta">
                  <span className="category-badge">{recipe.category}</span>
                  <span>{recipe.cookingTime} min</span>
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
