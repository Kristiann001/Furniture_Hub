import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);

  const { signup, signInWithGoogle, authLoading, redirectPending } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") {
      setSelectedRole(value);
    } else {
      if (name === "name") setName(value);
      if (name === "email") setEmail(value);
      if (name === "password") setPassword(value);
      if (name === "confirmPassword") setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const result = await signup(name, email, password, selectedRole);
    if (result.success) {
      navigate("/", { replace: true });
    } else {
      setError(result.error);
    }
  };

  const handleGoogleSignIn = async (role) => {
    setError("");
    setIsGoogleSignIn(true);
    try {
      await signInWithGoogle(role);
      // Redirect will happen automatically
    } catch (error) {
      setError(error.message);
      setIsGoogleSignIn(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Background */}
      <div className="auth-bg">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop"
          alt="Furniture background"
        />
        <div className="auth-bg-overlay" />
      </div>

      {/* Auth Card */}
      <div className="auth-card-wrap">
        <div className="auth-card">
          <Link to="/" className="auth-logo">
            <span className="logo-icon">F</span>
            Furniture Hub
          </Link>

          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">
            Join us to start shopping for premium furniture
          </p>

          {/* Role Selection */}
          <div className="role-toggle">
            <button
              className={`role-tab ${selectedRole === "customer" ? "active" : ""}`}
              onClick={() => setSelectedRole("customer")}
            >
              🛋️ Customer
            </button>
            <button
              className={`role-tab ${selectedRole === "admin" ? "active" : ""}`}
              onClick={() => setSelectedRole("admin")}
            >
              🏪 Owner
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="auth-error">
              <span>⚠️</span>
              {error}
            </div>
          )}

          {/* Signup Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                value={name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={authLoading || redirectPending}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={authLoading || redirectPending}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={handleChange}
                placeholder="Create a strong password"
                required
                disabled={authLoading || redirectPending}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-input"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                disabled={authLoading || redirectPending}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={
                authLoading ||
                redirectPending ||
                !name ||
                !email ||
                !password ||
                !confirmPassword
              }
            >
              {authLoading || redirectPending ? (
                <>
                  <span className="btn-spinner btn-spinner--light"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>OR</span>
          </div>

          {/* Google Sign-In */}
          <button
            className="google-btn"
            onClick={() => handleGoogleSignIn(selectedRole)}
            disabled={authLoading || redirectPending || isGoogleSignIn}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            {isGoogleSignIn ? (
              <span className="btn-spinner btn-spinner--dark"></span>
            ) : (
              "Continue with Google"
            )}
          </button>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
