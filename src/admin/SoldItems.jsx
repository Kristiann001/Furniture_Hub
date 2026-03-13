import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchSoldProducts,
  markProductAsAvailable,
} from "../firebase/products";
import { woodTypes } from "../data/products";
import toast from "react-hot-toast";

const SoldItems = () => {
  const [soldProducts, setSoldProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    loadSoldProducts();
  }, []);

  const loadSoldProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchSoldProducts();
      setSoldProducts(data);
    } catch (err) {
      setError("Failed to load sold products.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAvailable = async (product) => {
    if (
      !window.confirm(
        `Are you sure you want to mark "${product.name}" as available again?`,
      )
    ) {
      return;
    }

    try {
      setProcessingId(product.id);
      await markProductAsAvailable(product.id);
      toast.success("Product marked as available", {
        icon: "♻️",
        style: {
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          borderLeft: "4px solid #059669",
        },
      });
      // Remove from list
      setSoldProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (err) {
      toast.error("Failed to update product. Please try again.", {
        icon: "⚠️",
        style: {
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          borderLeft: "4px solid #dc2626",
        },
      });
    } finally {
      setProcessingId(null);
    }
  };

  // Calculate total revenue from sold products
  const totalRevenue = soldProducts.reduce(
    (sum, p) => sum + (p.priceRaw || 0),
    0,
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Sold Items</h1>
          <p className="admin-page-sub">
            {loading ? "Loading…" : `${soldProducts.length} items sold`}
          </p>
        </div>
      </div>

      {error && (
        <div className="auth-error" style={{ marginBottom: 16 }}>
          ⚠ {error}
        </div>
      )}

      {/* Stats Row */}
      {!loading && soldProducts.length > 0 && (
        <div className="admin-quick-stats" style={{ marginBottom: 24 }}>
          <div
            className="admin-quick-stat"
            style={{
              background: "rgba(37, 211, 102, 0.1)",
              borderColor: "rgba(37, 211, 102, 0.3)",
            }}
          >
            <span className="admin-quick-stat-label">Total Revenue</span>
            <span
              className="admin-quick-stat-value"
              style={{ color: "#128C7E" }}
            >
              KSh {totalRevenue.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <div className="admin-table-wrap">
        {loading ? (
          <div style={{ padding: 40, textAlign: "center" }}>
            <span
              className="btn-spinner btn-spinner--dark"
              style={{ width: 32, height: 32 }}
            />
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Wood</th>
                <th>Price Sold</th>
                <th>Date Sold</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {soldProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="admin-table-product">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="admin-table-img"
                        />
                      ) : (
                        <div className="admin-table-img admin-table-img--empty">
                          📦
                        </div>
                      )}
                      <div>
                        <div className="admin-product-name">{p.name}</div>
                        <div className="admin-product-id">
                          ID: {p.id?.slice(0, 8)}…
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{p.categoryName || p.category}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {woodTypes[p.woodType] || p.woodType || "—"}
                  </td>
                  <td>
                    <div className="admin-price">{p.price}</div>
                  </td>
                  <td>
                    {p.soldAt?.toDate
                      ? p.soldAt.toDate().toLocaleDateString()
                      : "Unknown"}
                  </td>
                  <td style={{ maxWidth: 200, whiteSpace: "normal" }}>
                    {p.soldNote || "—"}
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleMarkAvailable(p)}
                      disabled={processingId === p.id}
                      style={{ padding: "6px 12px", fontSize: 14 }}
                    >
                      {processingId === p.id ? "Updating..." : "Mark Available"}
                    </button>
                  </td>
                </tr>
              ))}
              {soldProducts.length === 0 && !loading && (
                <tr>
                  <td colSpan="7" className="admin-empty-row">
                    No sold products yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SoldItems;
