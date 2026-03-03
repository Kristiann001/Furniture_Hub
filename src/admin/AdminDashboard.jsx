import { Link } from "react-router-dom";
import { products } from "../data/products";

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
  const categories = [...new Set(products.map((p) => p.category))];
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
        <StatCard icon="🛋️" label="Total Products" value={products.length} color="#e8f4ff" />
        <StatCard icon="🗂️" label="Categories" value={categories.length} color="#fff3e0" />
        <StatCard icon="⭐" label="Featured Items" value={featured} color="#fce4ec" />
        <StatCard
          icon="💰"
          label="Catalog Value"
          value={`KSh ${(totalValue / 1000).toFixed(0)}k`}
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
                      <img src={p.image} alt={p.name} className="admin-table-img" />
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td>{p.categoryName}</td>
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
            </tbody>
          </table>
        </div>
        <Link to="/admin/products" className="btn btn-outline admin-view-all-btn">
          View All Products →
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
