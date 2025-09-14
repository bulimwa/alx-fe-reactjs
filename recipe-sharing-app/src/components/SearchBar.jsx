import useRecipeStore from './recipeStore'

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm)
  const setSelectedCategory = useRecipeStore(state => state.setSelectedCategory)
  const setMaxCookingTime = useRecipeStore(state => state.setMaxCookingTime)
  const categories = useRecipeStore(state => state.categories)
  const maxCookingTime = useRecipeStore(state => state.maxCookingTime)

  return (
    <div className="search-filters">
      <div className="search-group">
        <input
          type="text"
          placeholder="Search recipes by title, description, or ingredients..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="filter-group">
        <label htmlFor="category">Category:</label>
        <select 
          id="category"
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="cookingTime">Max Cooking Time: {maxCookingTime} min</label>
        <input
          type="range"
          id="cookingTime"
          min="5"
          max="120"
          step="5"
          value={maxCookingTime}
          onChange={(e) => setMaxCookingTime(parseInt(e.target.value))}
          className="time-slider"
        />
      </div>
    </div>
  )
}

export default SearchBar
