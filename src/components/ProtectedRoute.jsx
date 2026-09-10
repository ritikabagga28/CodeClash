import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

/**
 * Route guard component.
 * Redirects unauthenticated users to the Login page while saving the intended location.
 */
export default function ProtectedRoute({ children }) {
  const { auth } = useApp();
  const location = useLocation();

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
