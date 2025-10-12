import { useQuery } from 'react-query'

// Function to fetch posts from API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const PostsComponent = () => {
  // Use React Query's useQuery hook to fetch data
  const { 
    data: posts, 
    error, 
    isLoading, 
    isError, 
    refetch,
    isFetching 
  } = useQuery(
    'posts', // query key
    fetchPosts, // query function
    {
      // Cache configuration
      staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes - cache persists for 10 minutes
      refetchOnWindowFocus: false, // Don't refetch when window gains focus
    }
  )

  // Loading state
  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading posts...</h2>
        <div className="spinner"></div>
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

      <div className="posts-grid">
        {posts?.slice(0, 12).map((post) => (
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

      {/* Demonstration of caching - this will show cached data instantly */}
      <div className="cache-info">
        <p>
          <strong>React Query Caching Demo:</strong><br />
          - Try navigating away and back to see instant loading from cache<br />
          - Click "Refresh Posts" to force a refetch from the API<br />
          - Data is considered fresh for 5 minutes, cached for 10 minutes
        </p>
      </div>
    </div>
  )
}

export default PostsComponent
