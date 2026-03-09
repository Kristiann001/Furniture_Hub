import { useState, useEffect } from "react";
import { productCategories, woodTypes } from "../data/products";

const BADGE_OPTIONS = ["", "Best Seller", "New", "Premium", "Sale", "Limited"];

const emptyForm = {
  name: "",
  category: "living-room",
  categoryName: "Living Room",
  woodType: "mahogany",
  price: "",
  priceRaw: 0,
  originalPrice: "",
  badge: "",
  image: "",
  description: "",
  dimensionSummary: "",
  whatsappLink: "",
};

const ProductModal = ({ product, onSave, onClose, saving = false }) => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(product ? { ...emptyForm, ...product } : emptyForm);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updates = { [name]: value };
      if (name === "category") {
        const cat = productCategories.find((c) => c.id === value);
        updates.categoryName = cat ? cat.name : value;
      }
      if (name === "price") {
        updates.priceRaw = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
      }
      return { ...prev, ...updates };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Product name is required.");
    if (!form.price.trim()) return setError("Price is required.");
    if (!form.image.trim()) return setError("Image URL is required.");

    const images = [form.image, form.image, form.image, form.image];
    const colors = product?.colors || [{ name: "Default", hex: "#8b7355" }];
    const features = product?.features || [];
    const dimensions = product?.dimensions || {};

    onSave({ ...form, images, colors, features, dimensions });
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div
        className="admin-modal admin-product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <h2>{product ? "Edit Product" : "Add New Product"}</h2>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>

        {error && (
          <div className="auth-error" style={{ margin: "0 0 16px" }}>
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-modal-form">
          <div className="admin-form-grid">

            {/* Product Name */}
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                name="name"
                className="form-input"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Luxury L-Shape Sofa"
                required
              />
            </div>

            {/* Price */}
            <div className="form-group">
              <label className="form-label">Price (KSh) *</label>
              <input
                name="price"
                className="form-input"
                value={form.price}
                onChange={handleChange}
                placeholder="KSh 85,000"
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                name="category"
                className="form-input"
                value={form.category}
                onChange={handleChange}
              >
                {productCategories.filter((c) => c.id !== "all").map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Wood Type */}
            <div className="form-group">
              <label className="form-label">Wood / Material *</label>
              <select
                name="woodType"
                className="form-input"
                value={form.woodType}
                onChange={handleChange}
              >
                {Object.entries(woodTypes).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            {/* Dimensions */}
            <div className="form-group">
              <label className="form-label">Dimensions</label>
              <input
                name="dimensionSummary"
                className="form-input"
                value={form.dimensionSummary}
                onChange={handleChange}
                placeholder='e.g. 84"W × 36"D × 32"H'
              />
            </div>

            {/* Original Price */}
            <div className="form-group">
              <label className="form-label">Original Price (KSh)</label>
              <input
                name="originalPrice"
                className="form-input"
                value={form.originalPrice}
                onChange={handleChange}
                placeholder="KSh 105,000 (optional, for sale)"
              />
            </div>

            {/* Image URL */}
            <div className="form-group form-group-full">
              <label className="form-label">Image URL *</label>
              <input
                name="image"
                className="form-input"
                value={form.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                required
              />
            </div>

            {/* WhatsApp Order Link */}
            <div className="form-group form-group-full">
              <label className="form-label">WhatsApp Order Link</label>
              <input
                name="whatsappLink"
                className="form-input"
                value={form.whatsappLink}
                onChange={handleChange}
                placeholder="https://wa.me/254720515922?text=I'm interested in this product"
              />
              <p className="form-hint">
                Customers tap this to order via WhatsApp. Format: https://wa.me/[phone]?text=[message]
              </p>
            </div>

            {/* Description */}
            <div className="form-group form-group-full">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-input"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the product — material quality, comfort, craftsmanship…"
              />
            </div>

            {/* Badge */}
            <div className="form-group">
              <label className="form-label">Badge</label>
              <select
                name="badge"
                className="form-input"
                value={form.badge}
                onChange={handleChange}
              >
                {BADGE_OPTIONS.map((b) => (
                  <option key={b} value={b}>{b || "None"}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Image Preview */}
          {form.image && (
            <div className="admin-modal-preview">
              <img src={form.image} alt="Preview" />
              <span>{form.name || "Product preview"}</span>
            </div>
          )}

          <div className="admin-modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving
                ? <span className="btn-spinner" />
                : product ? "Save Changes" : "Add Product"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
