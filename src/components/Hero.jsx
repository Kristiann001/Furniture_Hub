import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-subtitle">Premium Furniture Kenya</span>
          <h1 className="hero-title">
            Elevate Your <span>Space</span> With Elegance
          </h1>
          <p className="hero-description">
            Discover curated collections of luxury furniture for modern living. From residential masterpieces to professional office solutions.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary btn-large">Explore Collections</Link>
            <a href="#categories" className="btn btn-secondary btn-large">Browse Categories</a>
          </div>
        </div>
        
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200" alt="Modern luxury sofa in elegant living room" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
