import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { woodTypes, generateWhatsAppLink } from "../data/products";
import { fetchProduct, fetchProducts } from "../firebase/products";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  const loadProduct = useCallback(async () => {
    setLoading(true);
    setError("");
    setCurrentImage(0);
    try {
      const data = await fetchProduct(id);
      if (!data) {
        setError("Product not found.");
        setProduct(null);
        return;
      }
      setProduct(data);
      if (data.colors?.length > 0) setSelectedColor(data.colors[0].name);

      // Load related products — prefer same category, pad with anything else
      try {
        const all = await fetchProducts();
        // Exclude only the current product (show available + don't filter sold strictly)
        const available = all.filter((p) => p.id !== data.id);

        // Priority 1: same category (exclude sold)
        const sameCat = available.filter(
          (p) => p.category === data.category && p.status !== "sold"
        );
        // Priority 2: other categories (exclude sold)
        const otherCat = available
          .filter((p) => p.category !== data.category && p.status !== "sold")
          .sort(() => Math.random() - 0.5);
        // Priority 3: last resort — any product even if sold, for visual completeness
        const anyOther = available
          .filter((p) => p.status === "sold")
          .sort(() => Math.random() - 0.5);

        let pool = [...sameCat, ...otherCat, ...anyOther];
        setRelatedProducts(pool.slice(0, 4));
      } catch {
        // If related products fail, continue without crashing the main product view
        setRelatedProducts([]);
      }
    } catch {
      setError("Failed to load product. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [loadProduct]);

  useEffect(() => {
    const animatedElements = document.querySelectorAll(".animate-fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    animatedElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [product]);

  const handleWhatsAppOrder = () => {
    const link = product.whatsappLink || generateWhatsAppLink(product, 1, selectedColor);
    window.open(link, "_blank");
  };

  // A small back button component
  const BackButton = () => (
    <button
      className="page-back-btn"
      onClick={() => navigate(-1)}
      aria-label="Go back"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Back
    </button>
  );

  // ─── Loading ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="app">
        <Header />
        <section className="product-detail" style={{ paddingTop: "100px" }}>
          <div className="container">
            <div className="product-detail-grid">
              <div style={{ background: "#f0f0f0", borderRadius: 12, minHeight: 400 }} />
              <div>
                <div style={{ background: "#f0f0f0", height: 24, width: "40%", borderRadius: 8, marginBottom: 12 }} />
                <div style={{ background: "#f0f0f0", height: 36, width: "80%", borderRadius: 8, marginBottom: 16 }} />
                <div style={{ background: "#f0f0f0", height: 28, width: "30%", borderRadius: 8 }} />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // ─── Error / Not Found ────────────────────────────────────────────────
  if (error || !product) {
    return (
      <div className="app">
        <Header />
        <section style={{ paddingTop: "120px", textAlign: "center", minHeight: "60vh" }}>
          <h2>😕 {error || "Product not found"}</h2>
          <button className="btn btn-primary" onClick={() => navigate("/products")} style={{ marginTop: "1rem" }}>
            Back to Collections
          </button>
        </section>
        <Footer />
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.image];

  // Parse dimension data into a labelled array
  const getDimensionRows = () => {
    const rows = [];
    if (product.dimensions && typeof product.dimensions === "object") {
      const labelMap = {
        length: { label: "Length", icon: "↔" },
        width: { label: "Width", icon: "↕" },
        height: { label: "Height", icon: "↑" },
        depth: { label: "Depth", icon: "↗" },
        diameter: { label: "Diameter", icon: "⌀" },
        seat_height: { label: "Seat Height", icon: "🪑" },
      };
      Object.entries(product.dimensions).forEach(([key, value]) => {
        const meta = labelMap[key] || { label: key.replace(/_/g, " "), icon: "•" };
        rows.push({ key, ...meta, value });
      });
    }
    return rows;
  };

  const dimensionRows = getDimensionRows();

  return (
    <div className="app">
      <Header />

      {/* Product Detail Section */}
      <section className="product-detail" style={{ paddingTop: "100px" }}>
        <div className="container">
          {/* Breadcrumb + Back */}
          <div className="detail-nav-row">
            <BackButton />
            <nav className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/products">Collections</Link>
              <span>/</span>
              <span>{product.name}</span>
            </nav>
          </div>

          <div className="product-detail-grid">
            {/* Product Gallery */}
            <div className="product-gallery">
              <div className="main-image">
                <img src={images[currentImage]} alt={product.name} />
              </div>
              {images.length > 1 && (
                <div className="thumbnail-grid">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${currentImage === index ? "active" : ""}`}
                      onClick={() => setCurrentImage(index)}
                    >
                      <img src={image} alt={`View ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="product-detail-info">
              <div className="product-detail-category">{product.categoryName || product.category}</div>
              <h1 className="product-detail-name">{product.name}</h1>
              <div className="product-detail-price">
                {product.price}
                {product.originalPrice && (
                  <span className="product-price-original">{product.originalPrice}</span>
                )}
              </div>

              <p className="product-description">{product.description}</p>

              {/* Wood Type */}
              {product.woodType && (
                <div className="product-options">
                  <div className="option-label">Wood / Material</div>
                  <div className="wood-badge">
                    <span className="wood-badge-icon">🪵</span>
                    {woodTypes[product.woodType] || product.woodType}
                  </div>
                </div>
              )}

              {/* Color Options */}
              {product.colors?.length > 0 && (
                <div className="product-options">
                  <div className="option-label">
                    Colour — <span style={{ fontWeight: 400, textTransform: "capitalize" }}>{selectedColor}</span>
                  </div>
                  <div className="color-options">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        className={`color-option ${selectedColor === color.name ? "active" : ""}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        onClick={() => setSelectedColor(color.name)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions — Improved */}
              {(product.dimensionSummary || dimensionRows.length > 0) && (
                <div className="product-dimensions">
                  <h3 className="dim-heading">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8, verticalAlign: "middle" }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    Dimensions
                  </h3>

                  {/* Summary chip */}
                  {product.dimensionSummary && (
                    <div className="dim-summary-chip">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      {product.dimensionSummary}
                    </div>
                  )}

                  {/* Detailed rows */}
                  {dimensionRows.length > 0 && (
                    <div className="dim-table">
                      {dimensionRows.map(({ key, label, icon, value }) => (
                        <div key={key} className="dim-row">
                          <span className="dim-row-label">
                            <span className="dim-row-icon">{icon}</span>
                            {label}
                          </span>
                          <span className="dim-row-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="product-actions">
                <button
                  id="whatsapp-order-btn"
                  className="btn btn-whatsapp btn-large"
                  onClick={handleWhatsAppOrder}
                >
                  <span>💬</span> Order via WhatsApp
                </button>
              </div>

              {/* Features */}
              {product.features?.length > 0 && (
                <div className="product-features">
                  <h3>Features &amp; Specifications</h3>
                  <ul className="features-list">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">You May Also Like</h2>
                <p className="section-subtitle">
                  {relatedProducts.some(p => p.category === product.category)
                    ? `More from ${product.categoryName || product.category} & beyond`
                    : "Hand-picked picks from our collection"}
                </p>
              </div>
              <Link to="/products" className="btn btn-secondary" style={{ whiteSpace: "nowrap" }}>
                View All
              </Link>
            </div>
            <div className="products-grid">
              {relatedProducts.map((rp, index) => (
                <div
                  key={rp.id}
                  className="product-card"
                  style={{ animation: `relatedFadeIn 0.5s ease both`, animationDelay: `${index * 0.1}s` }}
                >
                  <Link to={`/product/${rp.id}`}>
                    <div className="product-image">
                      {rp.badge && <span className="product-badge">{rp.badge}</span>}
                      <img src={rp.image} alt={rp.name} loading="lazy" />
                      <div className="product-image-overlay">
                        <span className="product-view-btn">View Details</span>
                      </div>
                    </div>
                    <div className="product-info">
                      <div className="product-category">{rp.categoryName || rp.category}</div>
                      <h3 className="product-name">{rp.name}</h3>
                      <p className="product-summary">
                        {rp.description
                          ? rp.description.slice(0, 70) + (rp.description.length > 70 ? "…" : "")
                          : rp.woodType
                          ? `${woodTypes[rp.woodType] || rp.woodType} · ${rp.dimensionSummary || ""}`
                          : "Premium quality furniture"}
                      </p>
                      <div className="product-footer">
                        <div className="product-price-wrap">
                          <span className="product-price">{rp.price}</span>
                          {rp.originalPrice && (
                            <span className="product-price-original">{rp.originalPrice}</span>
                          )}
                        </div>
                        <span className="product-cta-arrow">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
