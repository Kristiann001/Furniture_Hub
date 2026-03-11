import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="banner-v2">
      <div className="container">
        <div className="banner-v2-inner">
          {/* Image side */}
          <div className="banner-v2-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80"
              alt="Modern office furniture collection"
            />
            <div className="banner-v2-badge">New Collection</div>
          </div>

          {/* Text side */}
          <div className="banner-v2-text">
            <p className="cat-eyebrow">Featured Collection</p>
            <h2 className="banner-v2-title">Modern Office<br />Furniture</h2>
            <p className="banner-v2-desc">
              Create productive workspaces with our premium office furniture.
              Designed for comfort, professionalism, and long-lasting quality.
            </p>
            <div className="banner-v2-features">
              <span>✓ Ergonomic designs</span>
              <span>✓ Premium materials</span>
              <span>✓ Customizable options</span>
            </div>
            <Link to="/products?category=office" className="btn btn-primary banner-v2-cta">
              Explore Office Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
