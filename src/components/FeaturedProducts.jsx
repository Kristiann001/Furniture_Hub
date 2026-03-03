import { Link } from "react-router-dom";
import { products } from "../data/products";

const FeaturedProducts = () => {
  // Pick 4 featured products (badge-worthy items)
  const featuredProducts = products.filter((p) => p.badge).slice(0, 4);

  return (
    <section className="featured-products">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Collection</h2>
            <p className="section-subtitle">Handpicked premium pieces for your home</p>
          </div>
          <Link to="/products" className="btn btn-outline">
            View All Products
          </Link>
        </div>

        <div className="products-grid" id="featured-products">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`product-card animate-fade-up animate-delay-${index}`}
            >
              <Link to={`/product/${product.id}`}>
                <div className="product-image">
                  <span className="product-badge">{product.badge}</span>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <div className="product-category">{product.categoryName}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    {product.price}{" "}
                    <span className="product-price-original">
                      {product.originalPrice}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
