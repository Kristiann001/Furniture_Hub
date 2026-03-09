import { useState, useEffect, useRef } from "react";
import { useAdmin } from "../context/AdminContext";

const OwnerProfileModal = ({ onClose }) => {
  const { ownerName, updateOwnerName, updateAdminPassword } = useAdmin();

  // Name form
  const [name, setName] = useState(ownerName);
  const [nameSaved, setNameSaved] = useState(false);

  // Password form
  const [currentPw, setCurrentPw]   = useState("");
  const [newPw, setNewPw]           = useState("");
  const [confirmPw, setConfirmPw]   = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwError, setPwError]       = useState("");
  const [pwSuccess, setPwSuccess]   = useState(false);

  const modalRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleNameSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    updateOwnerName(name.trim());
    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 2000);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    setPwError(""); setPwSuccess(false);
    if (newPw !== confirmPw) { setPwError("New passwords do not match."); return; }
    const result = updateAdminPassword(currentPw, newPw);
    if (result.success) {
      setPwSuccess(true);
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      setTimeout(() => setPwSuccess(false), 3000);
    } else {
      setPwError(result.error);
    }
  };

  const EyeToggle = ({ show, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      aria-label={show ? "Hide password" : "Show password"}
      style={{
        position: "absolute", right: 10, top: "50%",
        transform: "translateY(-50%)", background: "none",
        border: "none", cursor: "pointer", fontSize: "1.1rem",
        color: "#888", padding: 4, display: "flex", alignItems: "center",
      }}
    >
      {show ? "👁️" : "👁️‍🗨️"}
    </button>
  );

  return (
    <div
      className="admin-modal-backdrop"
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div
        ref={modalRef}
        className="admin-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 440, padding: "2rem", width: "92vw" }}
      >
        {/* Header */}
        <div className="admin-modal-header" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.75rem" }}>👤</span>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Owner Profile</h2>
              <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "var(--text-muted,#888)" }}>
                Update your display name and password
              </p>
            </div>
          </div>
          <button className="admin-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* ── Display Name ── */}
        <section style={{ marginBottom: "1.75rem" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-secondary,#555)" }}>
            Display Name
          </h3>
          <form onSubmit={handleNameSave} style={{ display: "flex", gap: "0.6rem" }}>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => { setName(e.target.value); setNameSaved(false); }}
              placeholder="e.g. Joe"
              maxLength={40}
              style={{ flex: 1 }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!name.trim() || name.trim() === ownerName}
              style={{ whiteSpace: "nowrap", padding: "0 1rem" }}
            >
              {nameSaved ? "✅ Saved!" : "Save"}
            </button>
          </form>
        </section>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid var(--border,#e5e7eb)", marginBottom: "1.75rem" }} />

        {/* ── Change Password ── */}
        <section>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-secondary,#555)" }}>
            Change Password
          </h3>
          {pwError  && <div className="auth-error"   style={{ marginBottom: "0.75rem" }}>⚠ {pwError}</div>}
          {pwSuccess && <div className="auth-success" style={{ marginBottom: "0.75rem", color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "0.6rem 0.9rem", fontSize: "0.875rem" }}>✅ Password updated successfully!</div>}
          <form onSubmit={handlePasswordSave} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {/* Current password */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="op-current-pw">Current Password</label>
              <div style={{ position: "relative" }}>
                <input
                  id="op-current-pw"
                  type={showCurrent ? "text" : "password"}
                  className="form-input"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  placeholder="Enter current password"
                  style={{ paddingRight: 38 }}
                  autoComplete="current-password"
                />
                <EyeToggle show={showCurrent} onToggle={() => setShowCurrent(v => !v)} />
              </div>
            </div>
            {/* New password */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="op-new-pw">New Password</label>
              <div style={{ position: "relative" }}>
                <input
                  id="op-new-pw"
                  type={showNew ? "text" : "password"}
                  className="form-input"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder="Min. 6 characters"
                  style={{ paddingRight: 38 }}
                  autoComplete="new-password"
                />
                <EyeToggle show={showNew} onToggle={() => setShowNew(v => !v)} />
              </div>
            </div>
            {/* Confirm password */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="op-confirm-pw">Confirm New Password</label>
              <div style={{ position: "relative" }}>
                <input
                  id="op-confirm-pw"
                  type={showConfirm ? "text" : "password"}
                  className="form-input"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="Repeat new password"
                  style={{ paddingRight: 38 }}
                  autoComplete="new-password"
                />
                <EyeToggle show={showConfirm} onToggle={() => setShowConfirm(v => !v)} />
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.25rem" }}>
              <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!currentPw || !newPw || !confirmPw}
                style={{ flex: 2 }}
              >
                Update Password
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default OwnerProfileModal;
