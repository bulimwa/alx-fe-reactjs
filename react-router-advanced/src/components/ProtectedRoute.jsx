import { Navigate } from 'react-router-dom';

// Define useAuth directly in this file
function useAuth() {
  const isAuthenticated = false; // Change to true to simulate login
  return { isAuthenticated };
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
