import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-v2">
      <div className="container">
        <div className="footer-v2-grid">

          {/* Brand column */}
          <div className="footer-v2-brand">
            <Link to="/" className="footer-v2-logo">
              <span className="logo-icon" style={{ fontSize: 18 }}>F</span>
              Furniture Hub
            </Link>
            <p className="footer-v2-tagline">
              Premium modern furniture for homes and offices across Kenya.
              Quality craftsmanship meets contemporary design.
            </p>
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/254720515922"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-v2-whatsapp"
            >
              <span>💬</span> Chat on WhatsApp
            </a>
          </div>

          {/* Shop column */}
          <div className="footer-v2-col">
            <h4 className="footer-v2-heading">Shop</h4>
            <ul className="footer-v2-links">
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?category=living-room">Living Room</Link></li>
              <li><Link to="/products?category=office">Office</Link></li>
              <li><Link to="/products?category=bedroom">Bedroom</Link></li>
              <li><Link to="/products?category=outdoor">Outdoor</Link></li>
            </ul>
          </div>

          {/* Company column */}
          <div className="footer-v2-col">
            <h4 className="footer-v2-heading">Company</h4>
            <ul className="footer-v2-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/help">Help Center</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-v2-bottom">
          <p>© {year} Furniture Hub Kenya. All rights reserved.</p>
          <p className="footer-v2-location">📍 Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
