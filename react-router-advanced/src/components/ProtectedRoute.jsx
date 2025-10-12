import { Navigate } from 'react-router-dom';

const isAuthenticated = false; // Simulate auth

function ProtectedRoute({ children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
