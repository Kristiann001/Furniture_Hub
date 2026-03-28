import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-v2">
      {/* Background image layer */}
      <div className="hero-v2-bg">
        <img
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80"
          alt="elegant furniture interior"
        />
        <div className="hero-v2-overlay" />
      </div>

      {/* Content */}
      <div className="hero-v2-content">
        {/* Left: text */}
        <div className="hero-v2-text">
          <span className="hero-v2-eyebrow">Premium Furniture Kenya</span>
          <h1 className="hero-v2-title">
            Elevate Your<br />
            <em>Space</em> With<br />
            Elegance
          </h1>
          <p className="hero-v2-desc">
            Curated collections of luxury furniture for modern living — from
            residential masterpieces to professional office solutions.
          </p>

          {/* Trust pills */}
          <div className="hero-v2-trust">
            <span className="hero-v2-pill">🚚 Free Nairobi Delivery</span>
            <span className="hero-v2-pill">⭐ Premium Quality</span>
            <span className="hero-v2-pill">💬 WhatsApp Support</span>
          </div>

          <div className="hero-v2-actions">
            <Link to="/products" className="btn hero-v2-btn-primary">
              Explore Collections
            </Link>
            <a href="#categories" className="btn hero-v2-btn-ghost">
              Browse Categories ↓
            </a>
          </div>
        </div>

        {/* Right: product card */}
        <div className="hero-v2-card">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80"
            alt="Modern luxury sofa"
            className="hero-v2-card-img"
          />
          {/* Floating stat chips */}
          <div className="hero-v2-chip hero-v2-chip--tl">
            <span className="chip-num">500+</span>
            <span className="chip-label">Products</span>
          </div>
          <div className="hero-v2-chip hero-v2-chip--br">
            <span className="chip-num">3 yrs</span>
            <span className="chip-label">Experience</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-v2-scroll">
        <span className="scroll-line" />
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
