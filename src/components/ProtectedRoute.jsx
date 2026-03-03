import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute — guards routes by auth state and role.
 * Props:
 *   requiredRole: "admin" | "customer" | undefined (any authenticated user)
 *   redirectTo: path to redirect if check fails (default "/login")
 */
const ProtectedRoute = ({ children, requiredRole, redirectTo = "/login" }) => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-spinner" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Admin trying customer-only page or vice versa — redirect appropriately
    return <Navigate to={userRole === "admin" ? "/admin" : "/"} replace />;
  }

  return children;
};

export default ProtectedRoute;
