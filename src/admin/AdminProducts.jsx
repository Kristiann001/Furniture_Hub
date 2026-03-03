import { useState, useEffect } from "react";
import { productCategories, woodTypes } from "../data/products";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../firebase/products";
import ProductModal from "./ProductModal";

const AdminProducts = () => {
  const [productList, setProductList] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [filterCat, setFilterCat] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ── Load from Firestore on mount ─────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProductList(data);
      } catch (err) {
        setError("Failed to load products. Check your Firestore connection.");
      } finally {
        setLoadingProducts(false);
      }
    };
    load();
  }, []);

  const filtered = productList.filter((p) => {
    const matchesCat = filterCat === "all" || p.category === filterCat;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      (p.name || "").toLowerCase().includes(searchLower) ||
      (p.categoryName || "").toLowerCase().includes(searchLower);
    return matchesCat && matchesSearch;
  });

  const openAdd = () => { setEditingProduct(null); setModalOpen(true); };
  const openEdit = (p) => { setEditingProduct(p); setModalOpen(true); };

  // ── Save (Add / Edit) ─────────────────────────────────────────
  const handleSave = async (product) => {
    setSaving(true);
    setError("");
    try {
      if (editingProduct) {
        // Edit existing
        const { id, ...updates } = product;
        await updateProduct(id, updates);
        setProductList((prev) => prev.map((p) => (p.id === id ? product : p)));
      } else {
        // Add new
        const newId = await addProduct(product);
        setProductList((prev) => [{ ...product, id: newId }, ...prev]);
      }
      setModalOpen(false);
    } catch (err) {
      setError("Failed to save product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    setSaving(true);
    setError("");
    try {
      await deleteProduct(id);
      setProductList((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError("Failed to delete product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-sub">
            {loadingProducts
              ? "Loading…"
              : `${filtered.length} of ${productList.length} products`}
          </p>
        </div>
        <button className="btn btn-primary" onClick={openAdd} id="add-product-btn">
          + Add Product
        </button>
      </div>

      {error && (
        <div className="auth-error" style={{ marginBottom: 16 }}>
          ⚠ {error}
        </div>
      )}

      {/* Filters */}
      <div className="admin-filters">
        <input
          type="search"
          className="admin-search"
          placeholder="Search products…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          id="product-search"
        />
        <div className="admin-filter-tabs">
          {productCategories.map((c) => (
            <button
              key={c.id}
              className={`admin-filter-tab ${filterCat === c.id ? "active" : ""}`}
              onClick={() => setFilterCat(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        {loadingProducts ? (
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
                <th>Dimensions</th>
                <th>Price</th>
                <th>WhatsApp</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="admin-table-product">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="admin-table-img" />
                      ) : (
                        <div className="admin-table-img admin-table-img--empty">📦</div>
                      )}
                      <div>
                        <div className="admin-product-name">{p.name}</div>
                        <div className="admin-product-id">ID: {p.id?.slice(0, 8)}…</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.categoryName || p.category}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {woodTypes[p.woodType] || p.woodType || "—"}
                  </td>
                  <td className="admin-dim">{p.dimensionSummary || "—"}</td>
                  <td>
                    <div className="admin-price">{p.price}</div>
                    {p.originalPrice && (
                      <div className="admin-original-price">{p.originalPrice}</div>
                    )}
                  </td>
                  <td>
                    {p.whatsappLink ? (
                      <a
                        href={p.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-whatsapp-link"
                        title="Open WhatsApp link"
                      >
                        🟢 Link
                      </a>
                    ) : (
                      <span className="admin-badge-empty">—</span>
                    )}
                  </td>
                  <td>
                    <div className="admin-action-btns">
                      <button
                        className="admin-btn-edit"
                        onClick={() => openEdit(p)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="admin-btn-delete"
                        onClick={() => setDeleteConfirm(p)}
                        title="Delete"
                        disabled={saving}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loadingProducts && (
                <tr>
                  <td colSpan="7" className="admin-empty-row">
                    No products found. Click "+ Add Product" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Product modal */}
      {modalOpen && (
        <ProductModal
          product={editingProduct}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
          saving={saving}
        />
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="admin-modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal admin-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Product?</h3>
            <p>
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This
              cannot be undone.
            </p>
            <div className="admin-confirm-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button
                className="btn admin-btn-danger"
                onClick={() => handleDelete(deleteConfirm.id)}
                disabled={saving}
              >
                {saving ? <span className="btn-spinner" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
