import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleWhatsAppClick = () => {
    const phone = "254720515922";
    const message =
      "Hello Furniture Hub Kenya, I would like to inquire about your furniture collection.";
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
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
                Have questions about our products? Need design advice? Our team
                is here to help. Reach out through any of the channels below or
                fill out the form.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <div className="contact-label">Showroom Address</div>
                    <div className="contact-value">
                      Furniture Hub Kenya
                      <br />
                      Westlands Business Centre
                      <br />
                      Ring Road, Westlands
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
                      <a href="mailto:info@furniturehub.co.ke">
                        info@furniturehub.co.ke
                      </a>
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
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h2>Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
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
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                  Send Message
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
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
