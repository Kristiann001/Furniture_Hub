import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../firebase/products";
import { testFirebaseConnection } from "../utils/testFirebase";
import { setupFirestoreDatabase } from "../utils/setupFirestore";
import { useAdmin } from "../context/AdminContext";

const StatCard = ({ icon, label, value, color, trend }) => (
  <div className="admin-stat-card">
    <div className="admin-stat-icon" style={{ background: color }}>
      {icon}
    </div>
    <div>
      <div className="admin-stat-value">{value}</div>
      <div className="admin-stat-label">{label}</div>
      {trend && <span className="admin-stat-trend">{trend}</span>}
    </div>
  </div>
);

const AdminDashboard = () => {
  const { ownerName } = useAdmin();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [connectionStatus, setConnectionStatus] = useState("testing");
  const [setupStatus, setSetupStatus] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setConnectionStatus("testing");

        // First test Firebase connection
        const connectionTest = await testFirebaseConnection();

        if (!connectionTest.success) {
          setConnectionStatus("error");
          setSetupStatus({
            type: "error",
            message: "Firebase connection failed",
            details: connectionTest.error,
          });
          throw new Error(
            `Firebase connection failed: ${connectionTest.error}`,
          );
        }

        setConnectionStatus("connected");

        // Then fetch products
        const data = await fetchProducts();
        setProducts(data);
        setSetupStatus(null); // Clear any previous setup errors
      } catch (err) {
        console.error("Dashboard load error:", err);
        setConnectionStatus("error");
        // Don't set error state here, let the individual components handle it
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleSetupFirestore = async () => {
    setSetupStatus({ type: "loading", message: "Setting up Firestore..." });

    try {
      const result = await setupFirestoreDatabase();

      if (result.success) {
        setSetupStatus({ type: "success", message: result.message });
        // Reload products after successful setup
        const data = await fetchProducts();
        setProducts(data);
        setConnectionStatus("connected");
      } else {
        setSetupStatus({
          type: "error",
          message: result.message,
          details: result.solution || result.error,
        });
      }
    } catch (err) {
      setSetupStatus({
        type: "error",
        message: "Setup failed",
        details: err.message,
      });
    }
  };

  const categories = [...new Set(products.map((p) => p.category))].length;
  const featured = products.filter((p) => p.badge).length;
  const totalValue = products.reduce((sum, p) => sum + (p.priceRaw || 0), 0);


  return (
    <div className="admin-page">
      {setupStatus && (
        <div className={`admin-setup-status ${setupStatus.type}`}>
          {setupStatus.type === "loading" && (
            <div className="flex items-center gap-3">
              <div className="admin-spinner-small"></div>
              <span>{setupStatus.message}</span>
            </div>
          )}
          {setupStatus.type === "success" && (
            <div className="flex items-center gap-3">
              <span className="text-green-600">✅</span>
              <span>{setupStatus.message}</span>
            </div>
          )}
          {setupStatus.type === "error" && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-red-600">❌</span>
                <span>{setupStatus.message}</span>
              </div>
              {setupStatus.details && (
                <div className="admin-setup-details">
                  <p>{setupStatus.details}</p>
                  <button
                    className="admin-setup-btn"
                    onClick={handleSetupFirestore}
                  >
                    🔧 Setup Firestore Database
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Enhanced Header */}
      <div className="admin-page-header">
        <div className="admin-header-content">
          <div>
            <h1 className="admin-page-title">Dashboard</h1>
            <p className="admin-page-sub">Welcome back, {ownerName} 👋</p>
            <div className={`admin-connection-status ${connectionStatus}`}>
              {connectionStatus === "testing" && "🔄 Testing connection..."}
              {connectionStatus === "connected" && "✅ Connected"}
              {connectionStatus === "error" && "❌ Connection failed"}
            </div>
          </div>

        </div>
      </div>

      {/* Enhanced Stat Cards */}
      <div className="admin-stats-grid">
        <StatCard
          icon="🛋️"
          label="Total Products"
          value={loading ? "…" : products.length}
          color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        />
        <StatCard
          icon="🗂️"
          label="Categories"
          value={loading ? "…" : categories}
          color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        />

      </div>

      {/* Quick Stats Row */}
      <div className="admin-quick-stats">
        <div className="admin-quick-stat">
          <span className="admin-quick-stat-label">Avg. Product Value</span>
          <span className="admin-quick-stat-value">
            KSh{" "}
            {products.length
              ? Math.round(totalValue / products.length).toLocaleString()
              : 0}
          </span>
        </div>
        <div className="admin-quick-stat">
          <span className="admin-quick-stat-label">Last Updated</span>
          <span className="admin-quick-stat-value">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="admin-section">
        <div className="admin-section-header">
          <h2 className="admin-section-title">
            Quick Actions
            <span className="admin-section-sub">Frequently used tasks</span>
          </h2>
        </div>
        <div className="admin-quick-actions">
          <Link
            to="/admin/products"
            className="admin-action-card admin-action-card--add"
            state={{ action: "add" }}
          >
            <span className="admin-action-icon">➕</span>
            <div className="admin-action-content">
              <span className="admin-action-title">Add Product</span>
              <span className="admin-action-desc">
                Create a new product listing
              </span>
            </div>
          </Link>
          <Link to="/admin/products" className="admin-action-card admin-action-card--manage">
            <span className="admin-action-icon">📋</span>
            <div className="admin-action-content">
              <span className="admin-action-title">Manage Products</span>
              <span className="admin-action-desc">
                Edit, update or remove products
              </span>
            </div>
          </Link>
          <Link to="/" className="admin-action-card admin-action-card--preview">
            <span className="admin-action-icon">👁️</span>
            <div className="admin-action-content">
              <span className="admin-action-title">Preview Store</span>
              <span className="admin-action-desc">
                View your store as customers see it
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Enhanced Recent Products Table */}
      <div className="admin-section">
        <div className="admin-section-header">
          <h2 className="admin-section-title">
            Recent Products
            <span className="admin-section-sub">
              Latest additions to your catalog
            </span>
          </h2>
          <Link to="/admin/products" className="admin-view-all-link">
            View All <span className="admin-arrow">→</span>
          </Link>
        </div>
        <div className="admin-table-wrap">
          {loading ? (
            <div className="admin-loading-state">
              <div className="admin-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <table className="admin-table admin-table-desktop">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Wood</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="admin-table-product">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.name}
                              className="admin-table-img"
                              loading="lazy"
                            />
                          ) : (
                            <div className="admin-table-img admin-table-img--empty">
                              📦
                            </div>
                          )}
                          <div className="admin-product-info">
                            <span className="admin-product-name">{p.name}</span>
                            <span className="admin-product-id">
                              ID: {p.id?.slice(-6)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="admin-category-badge">
                          {p.categoryName || p.category}
                        </span>
                      </td>
                      <td style={{ textTransform: "capitalize" }}>
                        {p.woodType}
                      </td>
                      <td>
                        <div className="admin-price-cell">
                          <span className="admin-current-price">{p.price}</span>
                          {p.originalPrice && (
                            <span className="admin-old-price">
                              {p.originalPrice}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        {p.badge ? (
                          <span
                            className={`admin-status-badge ${p.badge.toLowerCase().replace(" ", "-")}`}
                          >
                            {p.badge}
                          </span>
                        ) : (
                          <span className="admin-status-badge default">
                            In Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Card View */}
              <div className="admin-mobile-cards">
                {products.slice(0, 5).map((p) => (
                  <div key={p.id} className="admin-mobile-card">
                    <div className="admin-mobile-card-header">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="admin-mobile-card-img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="admin-mobile-card-img admin-mobile-card-img--empty">
                          📦
                        </div>
                      )}
                      <div className="admin-mobile-card-info">
                        <h3 className="admin-mobile-card-title">{p.name}</h3>
                        <span className="admin-mobile-card-id">
                          ID: {p.id?.slice(-6)}
                        </span>
                      </div>
                    </div>
                    <div className="admin-mobile-card-details">
                      <div className="admin-mobile-detail-row">
                        <span className="admin-mobile-detail-label">
                          Category:
                        </span>
                        <span className="admin-mobile-detail-value">
                          <span className="admin-category-badge">
                            {p.categoryName || p.category}
                          </span>
                        </span>
                      </div>
                      <div className="admin-mobile-detail-row">
                        <span className="admin-mobile-detail-label">Wood:</span>
                        <span
                          className="admin-mobile-detail-value"
                          style={{ textTransform: "capitalize" }}
                        >
                          {p.woodType}
                        </span>
                      </div>
                      <div className="admin-mobile-detail-row">
                        <span className="admin-mobile-detail-label">
                          Price:
                        </span>
                        <span className="admin-mobile-detail-value">
                          <span className="admin-current-price">{p.price}</span>
                          {p.originalPrice && (
                            <span className="admin-old-price admin-mobile-old-price">
                              {p.originalPrice}
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="admin-mobile-detail-row">
                        <span className="admin-mobile-detail-label">
                          Status:
                        </span>
                        <span className="admin-mobile-detail-value">
                          {p.badge ? (
                            <span
                              className={`admin-status-badge ${p.badge.toLowerCase().replace(" ", "-")}`}
                            >
                              {p.badge}
                            </span>
                          ) : (
                            <span className="admin-status-badge default">
                              In Stock
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {products.length === 0 && !loading && (
          <div className="admin-empty-state">
            <span className="admin-empty-icon">📦</span>
            <h3>No Products Yet</h3>
            <p>Get started by adding your first product to the catalog.</p>
            <Link
              to="/admin/products"
              className="btn btn-primary"
              state={{ action: "add" }}
            >
              Add Your First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
