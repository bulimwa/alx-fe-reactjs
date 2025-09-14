import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with eggs, cheese, and pancetta",
      ingredients: ["spaghetti", "eggs", "pecorino cheese", "pancetta", "black pepper"],
      instructions: "1. Cook pasta 2. Fry pancetta 3. Mix eggs and cheese 4. Combine everything",
      cookingTime: 20,
      category: "Italian"
    },
    {
      id: 2,
      title: "Chocolate Chip Cookies",
      description: "Classic homemade chocolate chip cookies",
      ingredients: ["flour", "butter", "sugar", "chocolate chips", "eggs", "vanilla"],
      instructions: "1. Cream butter and sugar 2. Add eggs and vanilla 3. Mix in flour 4. Add chocolate chips 5. Bake at 350°F for 10-12 minutes",
      cookingTime: 30,
      category: "Dessert"
    },
    {
      id: 3,
      title: "Chicken Curry",
      description: "Spicy Indian chicken curry",
      ingredients: ["chicken", "onions", "tomatoes", "curry powder", "coconut milk", "spices"],
      instructions: "1. Sauté onions 2. Add spices 3. Add chicken and cook 4. Add tomatoes and coconut milk 5. Simmer for 20 minutes",
      cookingTime: 45,
      category: "Indian"
    }
  ],
  
  // Search and filter state
  searchTerm: '',
  selectedCategory: 'All',
  maxCookingTime: 60,
  
  // Actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] 
  })),
  
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  
  setRecipes: (recipes) => set({ recipes }),
  
  // Search and filter actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  setMaxCookingTime: (time) => set({ maxCookingTime: time }),
  
  // Get filtered recipes
  get filteredRecipes() {
    const { recipes, searchTerm, selectedCategory, maxCookingTime } = get()
    
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.ingredients.some(ingredient => 
                             ingredient.toLowerCase().includes(searchTerm.toLowerCase())
                           )
      
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory
      const matchesCookingTime = recipe.cookingTime <= maxCookingTime
      
      return matchesSearch && matchesCategory && matchesCookingTime
    })
  },
  
  // Get all unique categories for filter dropdown
  get categories() {
    const categories = [...new Set(get().recipes.map(recipe => recipe.category))]
    return ['All', ...categories]
  }
}))

export default useRecipeStore
