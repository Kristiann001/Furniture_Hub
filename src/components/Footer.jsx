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
            {/* Social Links */}
            <div className="footer-v2-social">
              <a
                href="https://www.facebook.com/furniturehubkenya"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/furniturehubkenya254/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://x.com/martelsim"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/fredrick-sim-84ab34213/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@furniture_hub_ken"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
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
