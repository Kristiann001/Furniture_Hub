import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const AdminLoginModal = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { adminLogin } = useAdmin();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Focus input and handle Escape key
  useEffect(() => {
    inputRef.current?.focus();
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
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 400, padding: "2rem" }}
      >
        {/* Header */}
        <div className="modal-header" style={{ marginBottom: "1.5rem" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
              }}
            >
              <span style={{ fontSize: "24px", color: "#ffffff" }}>🔐</span>
            </div>
            <div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "rgba(0, 0, 0, 0.9)",
                  margin: "0",
                  letterSpacing: "-0.02em",
                }}
              >
                Admin Access
              </h2>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="admin-password">Admin Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error ? "error" : ""}
              placeholder="Enter admin password"
              style={{ fontSize: "16px", padding: "16px 20px" }}
              required
            />
            {error && (
              <span className="error-message" role="alert">
                {error}
              </span>
            )}
          </div>
          <div className="modal-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                background: loading
                  ? "rgba(99, 102, 241, 0.6)"
                  : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#ffffff",
                padding: "14px 24px",
                fontSize: "16px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {loading ? (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "16px",
                      height: "16px",
                      border: "2px solid #ffffff",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></span>
                  Authenticating...
                </span>
              ) : (
                "Access Dashboard"
              )}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={loading}
              style={{ padding: "14px 24px", fontSize: "16px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
