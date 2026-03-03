import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="banner">
      <div className="container">
        <div className="banner-inner">
          <div className="banner-image">
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800" alt="Office furniture collection" />
          </div>
          <div className="banner-content">
            <span className="banner-label">New Collection</span>
            <h2 className="banner-title">Modern Office Furniture</h2>
            <p className="banner-description">
              Create productive workspaces with our premium office furniture collection. Designed for comfort and professionalism.
            </p>
            <Link to="/products?category=office" className="btn btn-primary">Explore Office</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
