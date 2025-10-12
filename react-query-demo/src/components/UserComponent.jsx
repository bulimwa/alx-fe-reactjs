const UserComponent = () => {
  return (
    <div className="user-component">
      <h2>Users Page</h2>
      <p>Navigate back to Posts to see React Query's caching in action.</p>
      <p>The posts data will load instantly from cache if it was recently fetched.</p>
    </div>
  )
}

export default UserComponent
