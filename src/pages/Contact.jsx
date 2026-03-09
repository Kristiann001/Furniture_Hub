import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ── EmailJS Config ──────────────────────────────────────────────────────────
// Set these three vars in your .env file:
//   VITE_EMAILJS_SERVICE_ID  → e.g. service_xxxxxxx
//   VITE_EMAILJS_TEMPLATE_ID → e.g. template_xxxxxxx
//   VITE_EMAILJS_PUBLIC_KEY  → e.g. xxxxxxxxxxxxxxxxxxxxxx
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const OWNER_EMAIL         = "fredrick.simiyu99@gmail.com";

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setSending(true);

    // If EmailJS keys are not yet configured, warn and fall back gracefully
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSending(false);
      setStatus("config-missing");
      return;
    }

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phone = "254720515922";
    const message = "Hello Furniture Hub Kenya, I would like to inquire about your furniture collection.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
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
                Have questions about our products? Need design advice? Reach out through
                any of the channels below or fill out the form.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <div className="contact-label">Showroom Address</div>
                    <div className="contact-value">
                      Furniture Hub Kenya<br />
                      Westlands Business Centre<br />
                      Ring Road, Westlands<br />
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
                      <button className="btn btn-whatsapp" onClick={handleWhatsAppClick}>
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
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h2>Send Us a Message</h2>
              <p style={{ color: "var(--text-muted, #888)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                Your message will be sent directly to <strong>{OWNER_EMAIL}</strong>
              </p>

              {/* Status messages */}
              {status === "success" && (
                <div
                  style={{
                    background: "#e8f5e9",
                    border: "1px solid #a5d6a7",
                    borderRadius: 8,
                    padding: "1rem",
                    marginBottom: "1.25rem",
                    color: "#2e7d32",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  ✅ <strong>Message sent!</strong>&nbsp; We'll get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="auth-error" style={{ marginBottom: "1.25rem" }}>
                  ⚠ Failed to send message. Please try again or contact us via WhatsApp.
                </div>
              )}

              {status === "config-missing" && (
                <div
                  style={{
                    background: "#fff8e1",
                    border: "1px solid #ffe082",
                    borderRadius: 8,
                    padding: "1rem",
                    marginBottom: "1.25rem",
                    color: "#7a5c00",
                    fontSize: "0.85rem",
                  }}
                >
                  ⚙️ <strong>Email not configured yet.</strong> The site owner needs to add EmailJS keys to the <code>.env</code> file.
                  In the meantime, please use WhatsApp to contact us.
                </div>
              )}

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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7475446944!2d36.8217!3d-1.2715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMTYnMTcuNCJTIDM2wrA0OScxNy4wIkE!5e0!3m2!1sen!2ske!4v1234567890"
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
