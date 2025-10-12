import { useState } from 'react'
import { useQuery } from 'react-query'
import './App.css'

// Data fetching component - PostsComponent integrated directly
const PostsComponent = () => {
  // Function to fetch posts from API
  const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  }

  // Use React Query's useQuery hook to fetch data
  const { 
    data: posts, 
    error, 
    isLoading, 
    isError, 
    refetch,
    isFetching,
    dataUpdatedAt 
  } = useQuery(
    'posts', // query key
    fetchPosts, // query function
    {
      // Cache configuration
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: true,
    }
  )

  // Loading state
  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading posts...</h2>
        <div className="spinner"></div>
        <p>Fetching data from JSONPlaceholder API...</p>
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <div className="error">
        <h2>Error loading posts</h2>
        <p>{error.message}</p>
        <button onClick={() => refetch()} className="retry-btn">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="posts-component">
      <div className="posts-header">
        <h1>Posts from JSONPlaceholder API</h1>
        <div className="posts-controls">
          <button 
            onClick={() => refetch()} 
            disabled={isFetching}
            className="refresh-btn"
          >
            {isFetching ? 'Refreshing...' : 'Refresh Posts'}
          </button>
          <span className="posts-count">
            Showing {posts?.length || 0} posts
            {isFetching && ' (updating...)'}
          </span>
        </div>
      </div>

      {/* React Query caching demonstrated */}
      <div className="cache-info">
        <h3>React Query Caching Demo</h3>
        <p>
          <strong>Last Updated:</strong> {new Date(dataUpdatedAt).toLocaleTimeString()}
        </p>
        <p>
          <strong>How to test caching:</strong>
        </p>
        <ul>
          <li>Navigate to "Home" and back to "Posts" - data loads instantly from cache</li>
          <li>Click "Refresh Posts" to force API refetch</li>
          <li>Data is fresh for 5 minutes, cached for 10 minutes</li>
          <li>Try refocusing the browser window to trigger background refresh</li>
        </ul>
      </div>

      <div className="posts-grid">
        {posts?.slice(0, 9).map((post) => (
          <div key={post.id} className="post-card">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
            <div className="post-meta">
              <span>Post ID: {post.id}</span>
              <span>User ID: {post.userId}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Home component to demonstrate navigation and caching
const HomeComponent = () => {
  return (
    <div className="home-component">
      <h1>React Query Data Fetching Demo</h1>
      <p>This application demonstrates advanced data handling with React Query.</p>
      
      <div className="features">
        <h2>Features Demonstrated:</h2>
        <ul>
          <li><strong>Data Fetching:</strong> Automatic API calls with React Query</li>
          <li><strong>Caching:</strong> Data cached automatically - navigate between pages to see instant loads</li>
          <li><strong>Background Updates:</strong> Data refreshes in background when window refocuses</li>
          <li><strong>Loading States:</strong> Proper loading indicators during fetches</li>
          <li><strong>Error Handling:</strong> Graceful error states with retry functionality</li>
          <li><strong>Manual Refetching:</strong> "Refresh Posts" button demonstrates on-demand data updates</li>
        </ul>
      </div>

      <div className="demo-instructions">
        <h3>How to Test:</h3>
        <ol>
          <li>Go to "Posts" page to see initial data load</li>
          <li>Return to "Home" then back to "Posts" - notice instant load from cache</li>
          <li>Click "Refresh Posts" to force new API call</li>
          <li>Switch browser tabs and return to trigger background refresh</li>
        </ol>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('home')

  const renderCurrentView = () => {
    switch (currentView) {
      case 'posts':
        return <PostsComponent />
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
          onClick={() => {
            // Data refetch interaction demonstration
            if (currentView === 'posts') {
              // This would trigger a refetch if we had access to the refetch function
              // For demo purposes, we'll just show an alert
              alert('Navigate to Posts and use the Refresh button to see data refetch interaction!')
            }
            setCurrentView('home')
          }}
        >
          Test Navigation
        </button>
      </nav>

      <main className="app-main">
        {renderCurrentView()}
      </main>

      <footer className="app-footer">
        <p>React Query Demo - Data from JSONPlaceholder API | Caching and Refetching Demonstrated</p>
      </footer>
    </div>
  )
}

export default App
