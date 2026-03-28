import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../firebase/products";
import { testFirebaseConnection } from "../utils/testFirebase";
import { setupFirestoreDatabase } from "../utils/setupFirestore";
import { useAdmin } from "../context/AdminContext";

/* ── Stat Card ─────────────────────────────────── */
const StatCard = ({ icon, label, value, accent, sublabel }) => (
  <div className="dash-stat-card">
    <div className="dash-stat-icon" style={{ background: accent }}>{icon}</div>
    <div className="dash-stat-body">
      <div className="dash-stat-value">{value}</div>
      <div className="dash-stat-label">{label}</div>
      {sublabel && <div className="dash-stat-sublabel">{sublabel}</div>}
    </div>
  </div>
);

/* ── Quick Action Card ──────────────────────────── */
const ActionCard = ({ to, emoji, title, desc, state, accent }) => (
  <Link to={to} state={state} className="dash-action-card" style={{ "--dash-action-accent": accent }}>
    <div className="dash-action-icon">{emoji}</div>
    <div className="dash-action-body">
      <span className="dash-action-title">{title}</span>
      <span className="dash-action-desc">{desc}</span>
    </div>
    <span className="dash-action-arrow">→</span>
  </Link>
);

/* ── Status Badge ───────────────────────────────── */
const StatusDot = ({ status }) => {
  const map = {
    testing:   { color: "#f59e0b", label: "Connecting…" },
    connected: { color: "#10b981", label: "Connected" },
    error:     { color: "#ef4444", label: "Connection failed" },
  };
  const s = map[status] || map.testing;
  return (
    <span className="dash-status-dot-wrap">
      <span className="dash-status-dot" style={{ background: s.color }} />
      {s.label}
    </span>
  );
};

/* ── Main Component ─────────────────────────────── */
const AdminDashboard = () => {
  const { ownerName } = useAdmin();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("testing");
  const [setupStatus, setSetupStatus] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const conn = await testFirebaseConnection();
        if (!conn.success) {
          setConnectionStatus("error");
          setSetupStatus({ type: "error", message: "Firebase connection failed", details: conn.error });
          return;
        }
        setConnectionStatus("connected");
        const data = await fetchProducts();
        setProducts(data);
        setSetupStatus(null);
      } catch (err) {
        console.error(err);
        setConnectionStatus("error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSetup = async () => {
    setSetupStatus({ type: "loading", message: "Setting up Firestore…" });
    try {
      const result = await setupFirestoreDatabase();
      if (result.success) {
        setSetupStatus({ type: "success", message: result.message });
        const data = await fetchProducts();
        setProducts(data);
        setConnectionStatus("connected");
      } else {
        setSetupStatus({ type: "error", message: result.message, details: result.solution || result.error });
      }
    } catch (err) {
      setSetupStatus({ type: "error", message: "Setup failed", details: err.message });
    }
  };

  const activeProducts = products.filter((p) => p.status !== "sold");
  const soldProducts   = products.filter((p) => p.status === "sold");
  const categories     = [...new Set(activeProducts.map((p) => p.category))].length;
  const totalValue     = activeProducts.reduce((s, p) => s + (p.priceRaw || 0), 0);
  // Total formatted: sum all price strings if priceRaw is missing
  const totalPriceNum  = activeProducts.reduce((sum, p) => {
    if (p.priceRaw) return sum + Number(p.priceRaw);
    const raw = String(p.price || "").replace(/[^\d]/g, "");
    return sum + (raw ? Number(raw) : 0);
  }, 0);
  const totalDisplay   = totalPriceNum
    ? `KSh ${totalPriceNum.toLocaleString()}`
    : loading ? "—" : "—";

  const today = new Date().toLocaleDateString("en-KE", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="dash-root">

      {/* ── Setup Status Banner ── */}
      {setupStatus && (
        <div className={`dash-banner dash-banner--${setupStatus.type}`}>
          <span className="dash-banner-icon">
            {setupStatus.type === "loading" && "⏳"}
            {setupStatus.type === "success" && "✅"}
            {setupStatus.type === "error"   && "❌"}
          </span>
          <div>
            <strong>{setupStatus.message}</strong>
            {setupStatus.details && (
              <div className="dash-banner-detail">
                {setupStatus.details}
                <button className="dash-setup-btn" onClick={handleSetup}>🔧 Retry Setup</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Dashboard</h1>
          <p className="dash-date">{today}</p>
          <StatusDot status={connectionStatus} />
        </div>
        <div className="dash-welcome-pill">
          👋 Welcome back, <strong>{ownerName}</strong>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="dash-stats-row">
        <StatCard
          icon="🛋️"
          label="Active Products"
          value={loading ? "—" : activeProducts.length}
          sublabel={loading ? "" : `${categories} categories`}
          accent="linear-gradient(135deg,#6366f1,#8b5cf6)"
        />
        <StatCard
          icon="💰"
          label="Items Sold"
          value={loading ? "—" : soldProducts.length}
          sublabel="all time"
          accent="linear-gradient(135deg,#10b981,#059669)"
        />
        <StatCard
          icon="💎"
          label="Total Catalog Value"
          value={loading ? "—" : totalDisplay}
          sublabel={`across ${activeProducts.length} active listing${activeProducts.length !== 1 ? "s" : ""}`}
          accent="linear-gradient(135deg,#f59e0b,#d97706)"
        />
        <StatCard
          icon="🗂️"
          label="Categories"
          value={loading ? "—" : categories}
          sublabel="product types"
          accent="linear-gradient(135deg,#ec4899,#db2777)"
        />
      </div>

      {/* ── Quick Actions ── */}
      <section className="dash-section">
        <header className="dash-section-header">
          <div>
            <h2 className="dash-section-title">Quick Actions</h2>
            <p className="dash-section-sub">Jump to a common task</p>
          </div>
        </header>
        <div className="dash-actions-grid">
          <ActionCard to="/admin/products" state={{ action: "add" }} emoji="➕"
            title="Add Product" desc="Create a new listing" accent="#6366f1" />
          <ActionCard to="/admin/products" emoji="📋"
            title="Manage Products" desc="Edit or remove listings" accent="#10b981" />
          <ActionCard to="/admin/sold-items" emoji="💰"
            title="Sold Items" desc="View sales history" accent="#f59e0b" />
          <ActionCard to="/" emoji="👁️"
            title="Preview Store" desc="See customer-facing site" accent="#ec4899" />
        </div>
      </section>

      {/* ── Recent Products ── */}
      <section className="dash-section">
        <header className="dash-section-header">
          <div>
            <h2 className="dash-section-title">Recent Products</h2>
            <p className="dash-section-sub">Last 5 active listings</p>
          </div>
          <Link to="/admin/products" className="dash-view-all">View All →</Link>
        </header>

        {loading ? (
          <div className="dash-loading">
            <span className="btn-spinner btn-spinner--dark" style={{ width: 28, height: 28 }} />
            <p>Loading products…</p>
          </div>
        ) : activeProducts.length === 0 ? (
          <div className="dash-empty">
            <span className="dash-empty-icon">📦</span>
            <h3>No Products Yet</h3>
            <p>Start by adding your first product to the catalog.</p>
            <Link to="/admin/products" className="btn btn-primary" state={{ action: "add" }}>
              Add Your First Product
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <table className="dash-table admin-table-desktop">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Wood Type</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activeProducts.slice(0, 5).map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="dash-table-product">
                        {p.image
                          ? <img src={p.image} alt={p.name} className="dash-table-thumb" loading="lazy" />
                          : <div className="dash-table-thumb dash-table-thumb--empty">📦</div>}
                        <div>
                          <div className="dash-product-name">{p.name}</div>
                          <div className="dash-product-id">#{p.id?.slice(-6)}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="dash-category-chip">{p.categoryName || p.category}</span></td>
                    <td style={{ textTransform: "capitalize", color: "var(--dash-text-muted)" }}>{p.woodType || "—"}</td>
                    <td>
                      <span className="dash-price">{p.price}</span>
                      {p.originalPrice && <span className="dash-price--old">{p.originalPrice}</span>}
                    </td>
                    <td>
                      <span className={`dash-badge ${p.badge ? p.badge.toLowerCase().replace(" ", "-") : "default"}`}>
                        {p.badge || "In Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile cards */}
            <div className="admin-mobile-cards">
              {activeProducts.slice(0, 5).map((p) => (
                <div key={p.id} className="admin-mobile-card">
                  <div className="admin-mobile-card-header">
                    {p.image
                      ? <img src={p.image} alt={p.name} className="admin-mobile-card-img" loading="lazy" />
                      : <div className="admin-mobile-card-img admin-mobile-card-img--empty">📦</div>}
                    <div className="admin-mobile-card-info">
                      <h3 className="admin-mobile-card-title">{p.name}</h3>
                      <span className="admin-mobile-card-id">#{p.id?.slice(-6)}</span>
                    </div>
                  </div>
                  <div className="admin-mobile-card-details">
                    <div className="admin-mobile-detail-row">
                      <span className="admin-mobile-detail-label">Category</span>
                      <span className="admin-mobile-detail-value">
                        <span className="dash-category-chip">{p.categoryName || p.category}</span>
                      </span>
                    </div>
                    <div className="admin-mobile-detail-row">
                      <span className="admin-mobile-detail-label">Wood</span>
                      <span className="admin-mobile-detail-value">{p.woodType || "—"}</span>
                    </div>
                    <div className="admin-mobile-detail-row">
                      <span className="admin-mobile-detail-label">Price</span>
                      <span className="admin-mobile-detail-value">
                        <span className="dash-price">{p.price}</span>
                      </span>
                    </div>
                    <div className="admin-mobile-detail-row">
                      <span className="admin-mobile-detail-label">Status</span>
                      <span className="admin-mobile-detail-value">
                        <span className={`dash-badge ${p.badge ? p.badge.toLowerCase().replace(" ", "-") : "default"}`}>
                          {p.badge || "In Stock"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
