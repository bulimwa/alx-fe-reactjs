import { create } from 'zustand'

const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with eggs, cheese, and pancetta",
      ingredients: ["spaghetti", "eggs", "pecorino cheese", "pancetta", "black pepper"],
      instructions: "1. Cook pasta 2. Fry pancetta 3. Mix eggs and cheese 4. Combine everything",
      cookingTime: 20
    },
    {
      id: 2,
      title: "Chocolate Chip Cookies",
      description: "Classic homemade chocolate chip cookies",
      ingredients: ["flour", "butter", "sugar", "chocolate chips", "eggs", "vanilla"],
      instructions: "1. Cream butter and sugar 2. Add eggs and vanilla 3. Mix in flour 4. Add chocolate chips 5. Bake at 350°F for 10-12 minutes",
      cookingTime: 30
    }
  ],
  
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
  
  setRecipes: (recipes) => set({ recipes })
}))

export default useRecipeStore
