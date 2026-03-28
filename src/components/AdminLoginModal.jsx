import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const AdminLoginModal = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const { adminLogin } = useAdmin();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Focus input and handle Escape key
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const success = adminLogin(password);
      if (success) {
        onClose();
        navigate("/admin");
      } else {
        setError("Incorrect password. Please try again.");
        setShakeError(true);
        setTimeout(() => setShakeError(false), 600);
        setPassword("");
        inputRef.current?.focus();
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div
        className="admin-login-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background elements */}
        <div className="admin-login-bg-orb admin-login-bg-orb--1" />
        <div className="admin-login-bg-orb admin-login-bg-orb--2" />

        {/* Icon header */}
        <div className="admin-login-icon-wrap">
          <div className="admin-login-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="10" rx="2" fill="white" opacity="0.9"/>
              <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1.5" fill="#8B5E3C"/>
            </svg>
          </div>
          <div className="admin-login-icon-ring" />
        </div>

        {/* Title */}
        <div className="admin-login-heading">
          <h2>Admin Access</h2>
          <p>Enter your password to access the dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className={`admin-login-field ${error ? "has-error" : ""} ${shakeError ? "shake" : ""}`}>
            <label htmlFor="admin-password">Password</label>
            <div className="admin-login-input-wrap">
              <span className="admin-login-input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                ref={inputRef}
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter admin password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="admin-login-eye-btn"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
            {error && (
              <div className="admin-login-error" role="alert">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {error}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="admin-login-actions">
            <button
              type="submit"
              className="admin-login-submit"
              disabled={loading || !password}
            >
              {loading ? (
                <>
                  <span className="admin-login-spinner" />
                  Authenticating…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Access Dashboard
                </>
              )}
            </button>
            <button
              type="button"
              className="admin-login-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Security note */}
        <div className="admin-login-security-note">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Protected admin area — owner access only
        </div>

        {/* Close button */}
        <button
          className="admin-login-close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AdminLoginModal;
