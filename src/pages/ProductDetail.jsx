import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { products, woodTypes, generateWhatsAppLink } from "../data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  // Find product by numeric id from the unified products array
  const product = products.find((p) => p.id === parseInt(id, 10)) || products[0];

  // Set default selected color when product changes
  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0].name);
    }
    setCurrentImage(0);
  }, [id, product]);

  useEffect(() => {
    // Scroll to top on product change
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Initialize scroll animations
    const animatedElements = document.querySelectorAll(".animate-fade-up");
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    animatedElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [id]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleWhatsAppOrder = () => {
    const link = generateWhatsAppLink(product, quantity, selectedColor);
    window.open(link, "_blank");
  };

  // Related products: same category, exclude current
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
                <img src={product.images[currentImage]} alt={product.name} />
              </div>
              <div className="thumbnail-grid">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${currentImage === index ? "active" : ""}`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img src={image} alt={`View ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-detail-info">
              <div className="product-detail-category">{product.categoryName}</div>
              <h1 className="product-detail-name">{product.name}</h1>
              <div className="product-detail-price">
                {product.price}
                {product.originalPrice && (
                  <span className="product-price-original">{product.originalPrice}</span>
                )}
              </div>

              <p className="product-description">{product.description}</p>

              {/* Wood Type */}
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
                  marginBottom: "var(--spacing-lg)"
                }}>
                  🪵 {woodTypes[product.woodType] || product.woodType}
                </div>
              </div>

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

              {/* Quantity Selector */}
              <div className="product-options">
                <div className="option-label">Quantity</div>
                <div className="quantity-selector">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max="10"
                    className="quantity-input"
                    id="quantity-input"
                  />
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="product-actions">
                <button
                  id="whatsapp-order-btn"
                  className="btn btn-whatsapp btn-large"
                  onClick={handleWhatsAppOrder}
                >
                  <span>💬</span> Order via WhatsApp
                </button>
                <button className="btn btn-secondary btn-large">
                  ♡ Add to Wishlist
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
              {product.dimensions && Object.keys(product.dimensions).length > 0 && (
                <div className="product-dimensions">
                  <h3>Dimensions</h3>
                  <div className="dimensions-grid">
                    {Object.entries(product.dimensions).map(([key, value]) => (
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
                <p className="section-subtitle">More from {product.categoryName}</p>
              </div>
            </div>
            <div className="products-grid">
              {relatedProducts.map((rp, index) => (
                <div
                  key={rp.id}
                  className={`product-card animate-fade-up animate-delay-${index}`}
                >
                  <Link to={`/product/${rp.id}`}>
                    <div className="product-image">
                      {rp.badge && <span className="product-badge">{rp.badge}</span>}
                      <img src={rp.image} alt={rp.name} />
                    </div>
                    <div className="product-info">
                      <div className="product-category">{rp.categoryName}</div>
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
