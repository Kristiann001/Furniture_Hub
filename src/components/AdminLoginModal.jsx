import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const AdminLoginModal = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAdmin();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Focus input and handle Escape key
  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Small delay for UX feel
    setTimeout(() => {
      const success = adminLogin(password);
      if (success) {
        onClose();
        navigate("/admin");
      } else {
        setError("Incorrect password. Please try again.");
        setPassword("");
        inputRef.current?.focus();
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div
      className="admin-modal-backdrop"
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div
        className="admin-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 400, padding: "2rem" }}
      >
        {/* Header */}
        <div className="admin-modal-header" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.75rem" }}>🔐</span>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.25rem" }}>Admin Access</h2>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted, #888)", marginTop: 2 }}>
                Owner dashboard — enter password to continue
              </p>
            </div>
          </div>
          <button className="admin-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Error */}
        {error && (
          <div className="auth-error" style={{ marginBottom: "1rem" }}>
            ⚠ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "1.25rem" }}>
            <label className="form-label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              ref={inputRef}
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              autoComplete="current-password"
            />
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !password}
              style={{ flex: 2 }}
            >
              {loading ? <span className="btn-spinner" /> : "Access Dashboard"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
