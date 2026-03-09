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

      // Load related products (same category)
      const all = await fetchProducts();
      setRelatedProducts(
        all.filter((p) => p.category === data.category && p.id !== data.id).slice(0, 4)
      );
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

  return (
    <div className="app">
      <Header />

      {/* Product Detail Section */}
      <section className="product-detail" style={{ paddingTop: "100px" }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb" style={{ marginBottom: "var(--spacing-lg)" }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/products">Collections</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

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
                  <div style={{
                    display: "inline-block",
                    padding: "8px 18px",
                    background: "var(--color-off-white)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "var(--color-gray-700)",
                    marginBottom: "var(--spacing-lg)",
                  }}>
                    🪵 {woodTypes[product.woodType] || product.woodType}
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
                  <h3>Features & Specifications</h3>
                  <ul className="features-list">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dimensions */}
              {product.dimensionSummary && (
                <div className="product-dimensions">
                  <h3>Dimensions</h3>
                  <div className="dimensions-grid">
                    <div className="dimension-item">
                      <span className="dimension-label">Summary</span>
                      <span className="dimension-value">{product.dimensionSummary}</span>
                    </div>
                    {product.dimensions && Object.entries(product.dimensions).map(([key, value]) => (
                      <div key={key} className="dimension-item">
                        <span className="dimension-label">{key}</span>
                        <span className="dimension-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">You May Also Like</h2>
                <p className="section-subtitle">More from {product.categoryName || product.category}</p>
              </div>
            </div>
            <div className="products-grid">
              {relatedProducts.map((rp, index) => (
                <div key={rp.id} className={`product-card animate-fade-up animate-delay-${index}`}>
                  <Link to={`/product/${rp.id}`}>
                    <div className="product-image">
                      {rp.badge && <span className="product-badge">{rp.badge}</span>}
                      <img src={rp.image} alt={rp.name} />
                    </div>
                    <div className="product-info">
                      <div className="product-category">{rp.categoryName || rp.category}</div>
                      <h3 className="product-name">{rp.name}</h3>
                      <div className="product-price">
                        {rp.price}
                        {rp.originalPrice && (
                          <span className="product-price-original">{rp.originalPrice}</span>
                        )}
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
