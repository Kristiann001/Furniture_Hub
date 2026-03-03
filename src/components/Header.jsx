import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userRole, userProfile, logout } = useAuth();

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

  const handleLogout = async () => {
    closeMobileMenu();
    await logout();
    navigate("/", { replace: true });
  };

  const getActiveClass = (path) => {
    if (path === "/" && location.pathname === "/") return "active";
    if (path !== "/" && location.pathname.startsWith(path)) return "active";
    return "";
  };

  const displayName =
    userProfile?.name || currentUser?.displayName || currentUser?.email?.split("@")[0] || "";
  const photoURL = userProfile?.photoURL || currentUser?.photoURL || "";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Collections" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  // Reusable avatar element
  const AvatarCircle = ({ size = "sm" }) =>
    photoURL ? (
      <img
        src={photoURL}
        alt={displayName}
        className={`user-avatar-photo user-avatar-photo--${size}`}
      />
    ) : (
      <span className="user-avatar-circle">
        {displayName[0]?.toUpperCase() || "U"}
      </span>
    );

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

          {/* Desktop Auth */}
          <div className="header-actions">
            {currentUser ? (
              <div className="user-menu">
                <div className="user-avatar-btn">
                  <AvatarCircle />
                  <span className="user-name-label">{displayName}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="user-dropdown">
                  <Link to="/profile" className="user-dropdown-item">
                    👤 My Profile
                  </Link>
                  {userRole === "admin" && (
                    <Link to="/admin" className="user-dropdown-item">
                      ⚙️ Admin Panel
                    </Link>
                  )}
                  <button className="user-dropdown-item user-dropdown-item--danger" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary header-login-btn">
                Sign In
              </Link>
            )}

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

        {/* User pill inside drawer (when logged in) */}
        {currentUser && (
          <Link to="/profile" className="drawer-user-pill" onClick={closeMobileMenu}>
            <AvatarCircle size="md" />
            <div>
              <div className="drawer-user-name">{displayName}</div>
              <div className="drawer-user-role">
                {userRole === "admin" ? "🏪 Owner" : "🛋️ Customer"}
              </div>
            </div>
          </Link>
        )}

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

          {currentUser && (
            <Link to="/profile" className="drawer-nav-link" onClick={closeMobileMenu}>
              👤 My Profile
            </Link>
          )}

          {userRole === "admin" && (
            <Link to="/admin" className="drawer-nav-link" onClick={closeMobileMenu}>
              ⚙️ Admin Panel
            </Link>
          )}
        </nav>

        {/* Drawer Footer */}
        <div className="drawer-footer">
          {currentUser ? (
            <button className="btn btn-outline btn-full" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary btn-full" onClick={closeMobileMenu}>
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-secondary btn-full" onClick={closeMobileMenu}>
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
