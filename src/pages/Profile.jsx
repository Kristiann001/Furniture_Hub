import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const { currentUser, userRole, userProfile, updateProfile, changePassword, uploadProfilePhoto } = useAuth();

  const displayName =
    userProfile?.name || currentUser?.displayName || currentUser?.email?.split("@")[0] || "User";
  const photoURL = userProfile?.photoURL || currentUser?.photoURL || "";

  // ── Name editing ───────────────────────────────────────────────
  const [nameForm, setNameForm] = useState({ name: displayName });
  const [nameStatus, setNameStatus] = useState(null); // {type: "success"|"error", msg: ""}
  const [nameSaving, setNameSaving] = useState(false);

  const handleNameSave = async (e) => {
    e.preventDefault();
    if (!nameForm.name.trim()) return;
    setNameSaving(true);
    setNameStatus(null);
    const result = await updateProfile({ name: nameForm.name.trim(), displayName: nameForm.name.trim() });
    setNameStatus(result.success
      ? { type: "success", msg: "Name updated successfully!" }
      : { type: "error", msg: result.error || "Failed to update name." }
    );
    setNameSaving(false);
  };

  // ── Password changing ──────────────────────────────────────────
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwStatus, setPwStatus] = useState(null);
  const [pwSaving, setPwSaving] = useState(false);

  const handlePwSave = async (e) => {
    e.preventDefault();
    setPwStatus(null);
    if (pwForm.newPw.length < 6) {
      return setPwStatus({ type: "error", msg: "New password must be at least 6 characters." });
    }
    if (pwForm.newPw !== pwForm.confirm) {
      return setPwStatus({ type: "error", msg: "New passwords do not match." });
    }
    setPwSaving(true);
    const result = await changePassword(pwForm.current, pwForm.newPw);
    if (result.success) {
      setPwStatus({ type: "success", msg: "Password changed successfully!" });
      setPwForm({ current: "", newPw: "", confirm: "" });
    } else {
      const errMap = {
        "auth/wrong-password": "Current password is incorrect.",
        "auth/weak-password": "New password is too weak.",
        "auth/requires-recent-login": "Please log out and log in again before changing your password.",
      };
      setPwStatus({ type: "error", msg: errMap[result.error] || result.error || "Failed to change password." });
    }
    setPwSaving(false);
  };

  // ── Photo upload ───────────────────────────────────────────────
  const fileRef = useRef(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoStatus, setPhotoStatus] = useState(null);
  const [previewURL, setPreviewURL] = useState(photoURL);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      return setPhotoStatus({ type: "error", msg: "Please select an image file." });
    }
    if (file.size > 5 * 1024 * 1024) {
      return setPhotoStatus({ type: "error", msg: "Image must be under 5 MB." });
    }
    setPreviewURL(URL.createObjectURL(file));
    setPhotoUploading(true);
    setPhotoStatus(null);
    const result = await uploadProfilePhoto(file);
    setPhotoStatus(result.success
      ? { type: "success", msg: "Profile photo updated!" }
      : { type: "error", msg: result.error || "Upload failed." }
    );
    if (result.photoURL) setPreviewURL(result.photoURL);
    setPhotoUploading(false);
  };

  const isGoogleUser = currentUser?.providerData?.some((p) => p.providerId === "google.com");

  return (
    <>
      <Header />
      <main className="profile-page">
        <div className="profile-container">
          {/* Page header */}
          <div className="profile-header">
            <h1 className="profile-title">My Profile</h1>
            <span className={`profile-role-badge ${userRole === "admin" ? "badge-admin" : "badge-customer"}`}>
              {userRole === "admin" ? "🏪 Owner" : "🛋️ Customer"}
            </span>
          </div>

          {/* Avatar section */}
          <div className="profile-avatar-section">
            <div className="profile-avatar-wrap" onClick={() => fileRef.current?.click()} title="Change photo">
              {previewURL ? (
                <img src={previewURL} alt="Profile" className="profile-avatar-img" />
              ) : (
                <span className="profile-avatar-initials">
                  {displayName[0]?.toUpperCase() || "U"}
                </span>
              )}
              <div className="profile-avatar-overlay">
                {photoUploading ? <span className="btn-spinner btn-spinner--light" /> : "📷"}
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
              id="photo-upload-input"
            />
            <p className="profile-avatar-hint">Click to change photo</p>
            {photoStatus && (
              <p className={`profile-status ${photoStatus.type === "success" ? "status-success" : "status-error"}`}>
                {photoStatus.msg}
              </p>
            )}
          </div>

          <div className="profile-sections">
            {/* Edit Name */}
            <section className="profile-section">
              <h2 className="profile-section-title">Personal Information</h2>
              <form onSubmit={handleNameSave} className="profile-form" noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="profile-name">Display Name</label>
                  <input
                    id="profile-name"
                    type="text"
                    className="form-input"
                    placeholder="Your full name"
                    value={nameForm.name}
                    onChange={(e) => setNameForm({ name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="profile-email">Email Address</label>
                  <input
                    id="profile-email"
                    type="email"
                    className="form-input form-input--readonly"
                    value={currentUser?.email || ""}
                    readOnly
                    disabled
                  />
                  <p className="form-hint">Email cannot be changed here.</p>
                </div>

                {nameStatus && (
                  <p className={`profile-status ${nameStatus.type === "success" ? "status-success" : "status-error"}`}>
                    {nameStatus.msg}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={nameSaving}
                  id="save-name-btn"
                >
                  {nameSaving ? <span className="btn-spinner" /> : "Save Name"}
                </button>
              </form>
            </section>

            {/* Change Password */}
            {!isGoogleUser && (
              <section className="profile-section">
                <h2 className="profile-section-title">Change Password</h2>
                <form onSubmit={handlePwSave} className="profile-form" noValidate>
                  <div className="form-group">
                    <label className="form-label" htmlFor="current-pw">Current Password</label>
                    <input
                      id="current-pw"
                      type="password"
                      className="form-input"
                      placeholder="Enter current password"
                      value={pwForm.current}
                      onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
                      required
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="new-pw">New Password</label>
                    <input
                      id="new-pw"
                      type="password"
                      className="form-input"
                      placeholder="Min. 6 characters"
                      value={pwForm.newPw}
                      onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="confirm-pw">Confirm New Password</label>
                    <input
                      id="confirm-pw"
                      type="password"
                      className="form-input"
                      placeholder="Repeat new password"
                      value={pwForm.confirm}
                      onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
                      required
                      autoComplete="new-password"
                    />
                  </div>

                  {pwStatus && (
                    <p className={`profile-status ${pwStatus.type === "success" ? "status-success" : "status-error"}`}>
                      {pwStatus.msg}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={pwSaving}
                    id="save-password-btn"
                  >
                    {pwSaving ? <span className="btn-spinner" /> : "Change Password"}
                  </button>
                </form>
              </section>
            )}

            {isGoogleUser && (
              <section className="profile-section">
                <h2 className="profile-section-title">Password</h2>
                <div className="profile-google-note">
                  <span>🔒</span>
                  <p>You signed in with Google. Password management is handled through your Google account.</p>
                </div>
              </section>
            )}
          </div>

          {/* Back link */}
          <div className="profile-back">
            <Link to={userRole === "admin" ? "/admin" : "/"} className="auth-link">
              ← Back to {userRole === "admin" ? "Dashboard" : "Home"}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
