import { useState } from 'react'
import PostsComponent from './components/PostsComponent'
import HomeComponent from './components/HomeComponent'
import UserComponent from './components/UserComponent'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('home')

  const renderCurrentView = () => {
    switch (currentView) {
      case 'posts':
        return <PostsComponent />
      case 'users':
        return <UserComponent />
      case 'home':
      default:
        return <HomeComponent />
    }
  }

  return (
    <div className="App">
      <nav className="app-nav">
        <button 
          onClick={() => setCurrentView('home')}
          className={currentView === 'home' ? 'active' : ''}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentView('posts')}
          className={currentView === 'posts' ? 'active' : ''}
        >
          Posts
        </button>
        <button 
          onClick={() => setCurrentView('users')}
          className={currentView === 'users' ? 'active' : ''}
        >
          Users
        </button>
      </nav>

      <main className="app-main">
        {renderCurrentView()}
      </main>

      <footer className="app-footer">
        <p>React Query Demo - Data from JSONPlaceholder API</p>
      </footer>
    </div>
  )
}

export default App
