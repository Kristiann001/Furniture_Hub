import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

// ── EmailJS Config ──────────────────────────────────────────────────────────
// Set these three vars in your .env file:
//   VITE_EMAILJS_SERVICE_ID  → e.g. service_xxxxxxx
//   VITE_EMAILJS_TEMPLATE_ID → e.g. template_xxxxxxx
//   VITE_EMAILJS_PUBLIC_KEY  → e.g. xxxxxxxxxxxxxxxxxxxxxx
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const OWNER_EMAIL = "fredrick.simiyu99@gmail.com";

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // If EmailJS keys are not yet configured, warn and fall back gracefully
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSending(false);
      toast.error(
        "Email not configured yet. Please use WhatsApp to contact us.",
      );
      return;
    }

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      toast.success("Message sent! We'll get back to you soon.", {
        icon: "📧",
        style: {
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          borderLeft: "4px solid #059669",
        },
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error("Failed to send message. Please try again or use WhatsApp.", {
        icon: "📧",
        style: {
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          borderLeft: "4px solid #dc2626",
        },
      });
    } finally {
      setSending(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phone = "254720515922";
    const message =
      "Hello Furniture Hub Kenya, I would like to inquire about your furniture collection.";
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="app">
      <Header />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </nav>
          <h1 className="page-title">Get In Touch</h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h1>We'd Love To Hear From You</h1>
              <p className="contact-description">
                Have questions about our products? Need design advice? Reach out
                through any of the channels below or fill out the form.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <div className="contact-label">Showroom Address</div>
                    <div className="contact-value">
                      Furniture Hub Kenya
                      <br />
                      Ngong Racecourse
                      <br />
                      Along Ngong Road
                      <br />
                      Nairobi, Kenya
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">
                      <a href="tel:+254720515922">+254 720 515 922</a>
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">
                      <a href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">💬</div>
                  <div>
                    <div className="contact-label">WhatsApp</div>
                    <div className="contact-value">
                      <button
                        className="btn btn-whatsapp"
                        onClick={handleWhatsAppClick}
                      >
                        Chat on WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-hours">
                <h3>Business Hours</h3>
                <div className="hours-grid">
                  <div className="hours-item">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Saturday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Sunday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-links-section">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a
                    href="https://www.facebook.com/furniturehubkenya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/furniturehubkenya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/furniturehubke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/furniturehubkenya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@furniturehubkenya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="TikTok"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h2>Send Us a Message</h2>
              <p
                style={{
                  color: "var(--text-muted, #888)",
                  marginBottom: "1.5rem",
                  fontSize: "0.9rem",
                }}
              >
                Your message will be sent directly to{" "}
                <strong>{OWNER_EMAIL}</strong>
              </p>

              <form ref={formRef} onSubmit={handleSubmit}>
                {/* Hidden field so EmailJS template can show recipient */}
                <input type="hidden" name="to_email" value={OWNER_EMAIL} />

                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+254 720515922"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us about the furniture you're looking for…"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={sending}
                  style={{ width: "100%" }}
                >
                  {sending ? <span className="btn-spinner" /> : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2 className="section-title text-center">Find Us</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.3915632740689!2d36.742780738180514!3d-1.3052126996705877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a521f95c021%3A0x725059556f60b3f2!2sNgong%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1774450768154!5m2!1sen!2ske"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Furniture Hub Kenya Location"
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* Inline responsive styles for Contact page */}
      <style>{`
        /* Contact page responsive improvements */
        .contact-section {
          padding: var(--spacing-4xl) 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: var(--spacing-3xl);
          align-items: start;
        }

        .contact-info h1 {
          font-size: clamp(24px, 4vw, 36px);
          margin-bottom: var(--spacing-lg);
          color: var(--color-black);
        }

        .contact-description {
          font-size: 16px;
          line-height: 1.7;
          color: var(--color-gray-600);
          margin-bottom: var(--spacing-2xl);
        }

        .contact-details {
          margin-bottom: var(--spacing-2xl);
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
          padding: var(--spacing-md) 0;
          border-bottom: 1px solid var(--color-gray-200);
        }

        .contact-item:last-child {
          border-bottom: none;
        }

        .contact-icon {
          width: 48px;
          height: 48px;
          background-color: var(--color-beige-light);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .contact-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-gray-500);
          margin-bottom: 4px;
        }

        .contact-value {
          font-size: 15px;
          color: var(--color-black);
          line-height: 1.5;
        }

        .contact-value a {
          color: var(--color-black);
          text-decoration: none;
          transition: color var(--transition-base);
        }

        .contact-value a:hover {
          color: var(--color-gray-600);
        }

        .contact-hours {
          background-color: var(--color-off-white);
          padding: var(--spacing-xl);
          border-radius: var(--radius-lg);
        }

        .contact-hours h3 {
          font-size: 18px;
          margin-bottom: var(--spacing-md);
          color: var(--color-black);
        }

        .hours-grid {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .hours-item {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: var(--color-gray-600);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--color-gray-200);
        }

        .hours-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .social-links-section {
          margin-top: var(--spacing-xl);
          padding-top: var(--spacing-xl);
          border-top: 1px solid var(--color-gray-200);
        }

        .social-links-section h3 {
          font-size: 18px;
          margin-bottom: var(--spacing-md);
          color: var(--color-black);
        }

        .social-links {
          display: flex;
          gap: var(--spacing-md);
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background-color: var(--color-off-white);
          color: var(--color-black);
          transition: all var(--transition-base);
        }

        .social-link:hover {
          background-color: var(--color-black);
          color: var(--color-white);
          transform: translateY(-2px);
        }

        .contact-form {
          background-color: var(--color-off-white);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-xl);
        }

        .contact-form h2 {
          font-size: 24px;
          margin-bottom: var(--spacing-md);
          color: var(--color-black);
        }

        .contact-form .form-group {
          margin-bottom: var(--spacing-lg);
        }

        .contact-form label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: var(--color-black);
          margin-bottom: 8px;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          font-size: 15px;
          font-family: inherit;
          transition: border-color var(--transition-base), box-shadow var(--transition-base);
          background-color: var(--color-white);
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: var(--color-black);
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
        }

        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: var(--color-gray-400);
        }

        .contact-form textarea {
          resize: vertical;
          min-height: 120px;
        }

        .contact-form button {
          margin-top: var(--spacing-sm);
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
        }

        .map-section {
          padding: var(--spacing-3xl) 0 var(--spacing-4xl);
        }

        .map-container {
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          margin-top: var(--spacing-xl);
        }

        .map-container iframe {
          display: block;
        }

        /* Responsive: Tablet */
        @media (max-width: 992px) {
          .contact-section {
            padding: var(--spacing-3xl) 0;
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-2xl);
          }

          .contact-info {
            order: 2;
          }

          .contact-form {
            order: 1;
          }

          .contact-info h1 {
            text-align: center;
          }

          .contact-description {
            text-align: center;
            max-width: 100%;
          }

          .contact-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-md);
          }

          .contact-item {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: var(--spacing-lg);
            background-color: var(--color-white);
            border-radius: var(--radius-lg);
            border-bottom: none;
          }

          .contact-hours {
            margin-top: var(--spacing-md);
          }

          .social-links-section {
            text-align: center;
            margin-top: var(--spacing-md);
            padding-top: var(--spacing-md);
          }

          .social-links {
            justify-content: center;
          }

          .hours-item {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 4px;
          }

          .contact-form {
            padding: var(--spacing-xl);
          }

          .map-section {
            padding: var(--spacing-2xl) 0 var(--spacing-3xl);
          }
        }

        /* Responsive: Mobile */
        @media (max-width: 576px) {
          .contact-section {
            padding: var(--spacing-2xl) 0;
          }

          .page-header {
            padding: 80px 0 var(--spacing-xl);
          }

          .contact-grid {
            gap: var(--spacing-xl);
          }

          .contact-info h1 {
            font-size: 24px;
          }

          .contact-description {
            font-size: 15px;
          }

          .contact-details {
            grid-template-columns: 1fr;
            gap: var(--spacing-sm);
          }

          .contact-item {
            padding: var(--spacing-md);
          }

          .contact-icon {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }

          .contact-label {
            font-size: 11px;
          }

          .contact-value {
            font-size: 14px;
          }

          .contact-hours {
            padding: var(--spacing-lg);
          }

          .contact-hours h3 {
            font-size: 16px;
            text-align: center;
          }

          .contact-form {
            padding: var(--spacing-lg);
            border-radius: var(--radius-lg);
          }

          .contact-form h2 {
            font-size: 20px;
            text-align: center;
          }

          .contact-form .form-group {
            margin-bottom: var(--spacing-md);
          }

          .contact-form label {
            font-size: 13px;
          }

          .contact-form input,
          .contact-form textarea {
            padding: 12px 14px;
            font-size: 14px;
          }

          .contact-form textarea {
            min-height: 100px;
          }

          .contact-form button {
            padding: 14px 24px;
            font-size: 15px;
          }

          .map-section {
            padding: var(--spacing-xl) 0 var(--spacing-2xl);
          }

          .map-container {
            border-radius: var(--radius-lg);
            margin-top: var(--spacing-lg);
          }

          .map-container iframe {
            height: 300px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
