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
  images: ["", "", "", ""], // [0] is main, [1..3] are extra
  colors: [{ name: "Default", hex: "#8b7355" }],
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

  const handleImageChange = (index, value) => {
    setForm((prev) => {
      const newImages = [...prev.images];
      newImages[index] = value;
      return { ...prev, images: newImages, image: newImages[0] }; // Sync legacy .image to the first image
    });
  };

  const handleColorChange = (index, field, value) => {
    setForm((prev) => {
      const newColors = [...prev.colors];
      newColors[index] = { ...newColors[index], [field]: value };
      return { ...prev, colors: newColors };
    });
  };

  const addColor = () => {
    setForm((prev) => ({ ...prev, colors: [...prev.colors, { name: "", hex: "#000000" }] }));
  };

  const removeColor = (index) => {
    setForm((prev) => ({ ...prev, colors: prev.colors.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Product name is required.");
    if (!form.price.trim()) return setError("Price is required.");
    if (!form.images[0]?.trim() && !form.image?.trim()) return setError("Main Image URL is required.");

    // Filter out empty images
    const activeImages = form.images.filter((url) => url.trim().length > 0);
    // Legacy mapping (in case it's used elsewhere)
    const image = activeImages[0] || form.image;

    const activeColors = form.colors.filter((c) => c.name.trim().length > 0);
    if (activeColors.length === 0) {
      activeColors.push({ name: "Default", hex: "#8b7355" });
    }

    const features = product?.features || [];
    const dimensions = product?.dimensions || {};

    onSave({ ...form, image, images: activeImages, colors: activeColors, features, dimensions });
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

            {/* Images block */}
            <div className="form-group form-group-full" style={{ marginBottom: "1rem" }}>
              <label className="form-label">Main Image URL *</label>
              <input
                className="form-input"
                value={form.images[0] || ""}
                onChange={(e) => handleImageChange(0, e.target.value)}
                placeholder="https://images.unsplash.com/... (Main photo)"
                required
              />
            </div>
            <div className="form-group form-group-full" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <label className="form-label" style={{ fontSize: "0.8rem", color: "#666" }}>Extra Image {i} (Optional)</label>
                  <input
                    className="form-input"
                    value={form.images[i] || ""}
                    onChange={(e) => handleImageChange(i, e.target.value)}
                    placeholder="URL..."
                  />
                </div>
              ))}
            </div>

            {/* Colors block */}
            <div className="form-group form-group-full" style={{ background: "#f9fafb", padding: "1rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <label className="form-label" style={{ margin: 0 }}>Color Options</label>
                <button type="button" onClick={addColor} style={{ fontSize: "0.8rem", background: "none", border: "none", color: "var(--color-primary)", cursor: "pointer", fontWeight: 600 }}>
                  + Add Color
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {form.colors.map((color, index) => (
                  <div key={index} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <input
                      type="color"
                      value={color.hex}
                      onChange={(e) => handleColorChange(index, "hex", e.target.value)}
                      style={{ width: "36px", height: "36px", border: "none", cursor: "pointer", padding: 0 }}
                    />
                    <input
                      className="form-input"
                      value={color.name}
                      onChange={(e) => handleColorChange(index, "name", e.target.value)}
                      placeholder="Color Name (e.g. Navy Blue)"
                      style={{ flex: 1, padding: "6px 12px" }}
                    />
                    <button type="button" onClick={() => removeColor(index)} style={{ padding: "0.4rem", color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>✕</button>
                  </div>
                ))}
              </div>
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
