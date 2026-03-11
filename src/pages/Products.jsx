import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { productCategories } from "../data/products";
import { fetchProducts } from "../firebase/products";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load products from Firestore once
  useEffect(() => {
    fetchProducts()
      .then((data) => setAllProducts(data.filter((p) => p.status !== "sold")))
      .catch(() => setError("Failed to load products. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  // Intersection observer for fade-up animation
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
  }, [filteredProducts]);

  return (
    <div className="app">
      <Header />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Collections</span>
          </nav>
          <h1 className="page-title">Our Collections</h1>
        </div>
      </section>

      {/* Products Section */}
      <section className="featured-products" style={{ paddingTop: "var(--spacing-3xl)" }}>
        <div className="container">
          {/* Category Filter */}
          <div className="section-header">
            <div>
              <p className="section-subtitle" id="category-subtitle">
                {loading
                  ? "Loading products…"
                  : activeCategory === "all"
                  ? `Showing all ${allProducts.length} products`
                  : `Showing ${filteredProducts.length} products in ${
                      productCategories.find((c) => c.id === activeCategory)?.name
                    }`}
              </p>
            </div>
            <div className="category-filters">
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  className={`btn btn-secondary category-btn ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="auth-error" style={{ marginBottom: 24 }}>⚠ {error}</div>
          )}

          {/* Loading skeleton */}
          {loading ? (
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", padding: "4rem 0" }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 280,
                    height: 360,
                    borderRadius: 12,
                    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
              ))}
            </div>
          ) : (
            /* Products Grid */
            <div className="products-grid" id="products-grid">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`product-card animate-fade-up animate-delay-${index % 4}`}
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="product-image">
                      {product.badge && (
                        <span className="product-badge">{product.badge}</span>
                      )}
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <div className="product-category">{product.categoryName || product.category}</div>
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-price">
                        {product.price}
                        {product.originalPrice && (
                          <span className="product-price-original">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              {filteredProducts.length === 0 && !loading && (
                <div style={{ textAlign: "center", padding: "4rem 0", gridColumn: "1 / -1" }}>
                  <p style={{ color: "var(--text-muted, #888)", fontSize: "1.1rem" }}>
                    No products found in this category.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
