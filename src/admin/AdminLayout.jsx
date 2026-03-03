import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const AdminLayout = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: "📊", end: true },
    { to: "/admin/products", label: "Products", icon: "🛋️" },
    { to: "/admin/orders", label: "Orders", icon: "📦" },
  ];

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
          <NavLink to="/" className="admin-nav-link" target="_blank">
            <span className="admin-nav-icon">🌐</span>
            View Store
          </NavLink>
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
            <div className="admin-user-pill">
              <span className="admin-user-avatar">
                {(userProfile?.name || currentUser?.displayName || "A")[0].toUpperCase()}
              </span>
              <span className="admin-user-name">
                {userProfile?.name || currentUser?.displayName || "Admin"}
              </span>
              <span className="admin-role-badge">Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
