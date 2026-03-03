import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-icon">F</span>
              Furniture Hub
            </Link>
            <p className="footer-description">
              Premium modern furniture for residential and office spaces in Kenya. Quality craftsmanship meets contemporary design.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">f</a>
              <a href="#" className="social-link" aria-label="Instagram">in</a>
              <a href="#" className="social-link" aria-label="Twitter">tw</a>
              <a href="#" className="social-link" aria-label="Pinterest">P</a>
            </div>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-title">Shop</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=living-room">Living Room</Link></li>
              <li><Link to="/products?category=office">Office</Link></li>
              <li><Link to="/products?category=bedroom">Bedroom</Link></li>
              <li><Link to="/products?category=outdoor">Outdoor</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Warranty</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Furniture Hub Kenya. All rights reserved.</p>
          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
