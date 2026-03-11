import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { useTheme } from "../context/ThemeContext";
import AdminLoginModal from "./AdminLoginModal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, adminLogout } = useAdmin();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.pageYOffset > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  const handleAdminLogout = () => {
    closeMobileMenu();
    adminLogout();
    navigate("/", { replace: true });
  };

  const handleAdminIconClick = () => {
    if (isAdmin) {
      navigate("/admin");
    } else {
      setShowAdminModal(true);
    }
  };

  const getActiveClass = (path) => {
    if (path === "/" && location.pathname === "/") return "active";
    if (path !== "/" && location.pathname.startsWith(path)) return "active";
    return "";
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Collections" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <span className="logo-icon">F</span>
            Furniture Hub
          </Link>

          {/* Desktop Nav */}
          <nav className="nav desktop-nav">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className={`nav-link ${getActiveClass(l.to)}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="header-actions">
            {/* Dark Mode Toggle */}
            <button
              className="admin-icon-btn theme-toggle-btn"
              onClick={toggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle dark mode"
            >
              <span style={{ fontSize: "1.1rem" }}>{isDark ? "☀️" : "🌙"}</span>
            </button>

            {/* Admin icon button */}
            <button
              className="admin-icon-btn"
              onClick={handleAdminIconClick}
              title={isAdmin ? "Go to Admin Dashboard" : "Admin Login"}
              aria-label="Admin access"
            >
              {isAdmin ? (
                <span style={{ fontSize: "1.1rem" }}>⚙️</span>
              ) : (
                <span style={{ fontSize: "1.1rem" }}>🔐</span>
              )}
            </button>

            {/* Hamburger */}
            <button
              className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop */}
      <div
        className={`mobile-backdrop ${isMobileMenuOpen ? "active" : ""}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? "open" : ""}`} role="dialog" aria-modal="true">
        {/* Drawer Header */}
        <div className="drawer-header">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <span className="logo-icon">F</span>
            Furniture Hub
          </Link>
          <button className="drawer-close-btn" onClick={closeMobileMenu} aria-label="Close menu">
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="drawer-nav">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`drawer-nav-link ${getActiveClass(l.to)}`}
              onClick={closeMobileMenu}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="drawer-footer">
          {isAdmin ? (
            <>
              <Link
                to="/admin"
                className="btn btn-primary btn-full"
                onClick={closeMobileMenu}
              >
                ⚙️ Admin Dashboard
              </Link>
              <button className="btn btn-outline btn-full" onClick={handleAdminLogout}>
                🚪 Logout Admin
              </button>
            </>
          ) : (
            <button
              className="btn btn-secondary btn-full"
              onClick={() => { closeMobileMenu(); setShowAdminModal(true); }}
            >
              🔐 Owner Login
            </button>
          )}
        </div>
      </div>

      {/* Admin Login Modal */}
      {showAdminModal && (
        <AdminLoginModal onClose={() => setShowAdminModal(false)} />
      )}
    </>
  );
};

export default Header;
