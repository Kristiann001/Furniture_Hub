import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { productCategories } from "../data/products";
import { fetchProducts } from "../firebase/products";

const Products = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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

  // Generate a short description based on product attributes
  const getProductSummary = (product) => {
    const parts = [];
    if (product.woodType) parts.push(`${product.woodType} wood`);
    if (product.dimensionSummary) parts.push(product.dimensionSummary);
    if (product.description) {
      // Truncate long descriptions
      const desc = product.description.trim();
      return desc.length > 80 ? desc.slice(0, 78) + "…" : desc;
    }
    if (parts.length) return parts.join(" · ");
    return "Premium quality furniture, crafted with care.";
  };

  return (
    <div className="app">
      <Header />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-nav">
            <button className="page-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <nav className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Collections</span>
            </nav>
          </div>
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
                  : `Showing ${filteredProducts.length} ${
                      filteredProducts.length === 1 ? "product" : "products"
                    } in ${
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
            <div className="products-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="product-card-skeleton">
                  <div className="product-skeleton-image" />
                  <div className="product-skeleton-body">
                    <div className="product-skeleton-line product-skeleton-line--short" />
                    <div className="product-skeleton-line" />
                    <div className="product-skeleton-line product-skeleton-line--med" />
                    <div className="product-skeleton-line product-skeleton-line--price" />
                  </div>
                </div>
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
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <div className="product-image-overlay">
                        <span className="product-view-btn">View Details</span>
                      </div>
                    </div>
                    <div className="product-info">
                      <div className="product-category">{product.categoryName || product.category}</div>
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-summary">{getProductSummary(product)}</p>
                      <div className="product-footer">
                        <div className="product-price-wrap">
                          <span className="product-price">{product.price}</span>
                          {product.originalPrice && (
                            <span className="product-price-original">
                              {product.originalPrice}
                            </span>
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
              {filteredProducts.length === 0 && !loading && (
                <div className="products-empty">
                  <div className="products-empty-icon">🪑</div>
                  <h3>No products found</h3>
                  <p>No products in this category yet. Check back soon!</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setActiveCategory("all")}
                  >
                    View All Products
                  </button>
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
