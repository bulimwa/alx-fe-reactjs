import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const FavouritesList = () => {
  const favorites = useRecipeStore(state => state.favorites)
  const recipes = useRecipeStore(state => state.recipes)
  const removeFavorite = useRecipeStore(state => state.removeFavorite)
  
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id))

  if (favorites.length === 0) {
    return (
      <div className="favourites-list">
        <h2>My Favourites</h2>
        <p>You haven't added any recipes to your favourites yet.</p>
      </div>
    )
  }

  return (
    <div className="favourites-list">
      <h2>My Favourites ({favorites.length})</h2>
      
      <div className="recipes-grid">
        {favoriteRecipes.map(recipe => (
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
            <button 
              onClick={() => removeFavorite(recipe.id)}
              className="btn-remove-favourite"
            >
              Remove from Favourites
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavouritesList
