import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import OwnerProfileModal from "../components/OwnerProfileModal";

const AdminLayout = () => {
  const { adminLogout, ownerName } = useAdmin();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    adminLogout();
    navigate("/", { replace: true });
  };

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: "📊", end: true },
    { to: "/admin/products", label: "Products", icon: "🛋️" },
  ];

  // First letter of owner name for the avatar
  const avatarLetter = ownerName.charAt(0).toUpperCase();

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <span className="logo-icon" style={{ fontSize: 18 }}>F</span>
          <span className="admin-brand">Furniture Hub</span>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-nav-link admin-logout-btn" onClick={handleLogout}>
            <span className="admin-nav-icon">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <span className="admin-page-label">Admin Panel</span>
          </div>
          <div className="admin-topbar-right">
            {/* Clickable owner pill → opens profile modal */}
            <button
              className="admin-user-pill"
              onClick={() => setShowProfile(true)}
              title="Edit profile"
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span className="admin-user-avatar">{avatarLetter}</span>
              <span className="admin-user-name" style={{ fontWeight: 600 }}>{ownerName}</span>
            </button>
            
            {/* Mobile Logout Button (Visible only on small screens via CSS) */}
            <button 
              className="admin-topbar-logout" 
              onClick={handleLogout}
              title="Logout"
              style={{
                background: "none",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                color: "#ff8080"
              }}
            >
              🚪
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      {/* Owner Profile Modal */}
      {showProfile && <OwnerProfileModal onClose={() => setShowProfile(false)} />}
    </div>
  );
};

export default AdminLayout;
