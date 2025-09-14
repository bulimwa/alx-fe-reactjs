import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'
import FavouritesList from './components/FavouritesList'
import RecommendationList from './components/RecommendationList'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Recipe Sharing App</h1>
          <nav className="main-nav">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              All Recipes
            </NavLink>
            <NavLink 
              to="/favourites" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              My Favourites
            </NavLink>
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <AddRecipeForm />
                <SearchBar />
                <RecommendationList />
                <RecipeList />
              </>
            } />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favourites" element={
              <>
                <SearchBar />
                <FavouritesList />
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
