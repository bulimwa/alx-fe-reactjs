import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Recipe Sharing App</h1>
          <nav>
            <Link to="/">All Recipes</Link>
            <Link to="/favorites">My Favorites</Link>
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <AddRecipeForm />
                <SearchBar />
                <RecommendationsList />
                <RecipeList />
              </>
            } />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={
              <>
                <SearchBar />
                <FavoritesList />
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
