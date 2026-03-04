import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../firebase/products";

const StatCard = ({ icon, label, value, color }) => (
  <div className="admin-stat-card">
    <div className="admin-stat-icon" style={{ background: color }}>{icon}</div>
    <div>
      <div className="admin-stat-value">{value}</div>
      <div className="admin-stat-label">{label}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(products.map((p) => p.category))].length;
  const featured = products.filter((p) => p.badge).length;
  const totalValue = products.reduce((sum, p) => sum + (p.priceRaw || 0), 0);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-sub">Overview of your store</p>
      </div>

      {/* Stat Cards */}
      <div className="admin-stats-grid">
        <StatCard icon="🛋️" label="Total Products" value={loading ? "…" : products.length} color="#e8f4ff" />
        <StatCard icon="🗂️" label="Categories" value={loading ? "…" : categories} color="#fff3e0" />
        <StatCard icon="⭐" label="Featured Items" value={loading ? "…" : featured} color="#fce4ec" />
        <StatCard
          icon="💰"
          label="Catalog Value"
          value={loading ? "…" : `KSh ${(totalValue / 1000).toFixed(0)}k`}
          color="#e8f5e9"
        />
      </div>

      {/* Quick Actions */}
      <div className="admin-section">
        <h2 className="admin-section-title">Quick Actions</h2>
        <div className="admin-quick-actions">
          <Link to="/admin/products" className="admin-action-card">
            <span className="admin-action-icon">➕</span>
            <span>Add Product</span>
          </Link>
          <Link to="/admin/products" className="admin-action-card">
            <span className="admin-action-icon">📋</span>
            <span>Manage Products</span>
          </Link>
          <Link to="/" target="_blank" className="admin-action-card">
            <span className="admin-action-icon">👁️</span>
            <span>Preview Store</span>
          </Link>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="admin-section">
        <h2 className="admin-section-title">Recent Products</h2>
        <div className="admin-table-wrap">
          {loading ? (
            <div style={{ padding: 40, textAlign: "center" }}>
              <span className="btn-spinner btn-spinner--dark" style={{ width: 32, height: 32 }} />
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Wood</th>
                  <th>Price</th>
                  <th>Badge</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 6).map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="admin-table-product">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="admin-table-img" />
                        ) : (
                          <div className="admin-table-img admin-table-img--empty">📦</div>
                        )}
                        <span>{p.name}</span>
                      </div>
                    </td>
                    <td>{p.categoryName || p.category}</td>
                    <td style={{ textTransform: "capitalize" }}>{p.woodType}</td>
                    <td>{p.price}</td>
                    <td>
                      {p.badge ? (
                        <span className="admin-badge-pill">{p.badge}</span>
                      ) : (
                        <span className="admin-badge-empty">—</span>
                      )}
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="5" className="admin-empty-row">
                      No products yet. Click "Add Product" to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        <Link to="/admin/products" className="btn btn-outline admin-view-all-btn">
          View All Products →
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
