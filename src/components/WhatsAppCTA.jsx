const WhatsAppCTA = () => {
  const handleWhatsAppClick = () => {
    const phone = '254700000000';
    const message = 'Hello Furniture Hub Kenya, I\'m interested in your furniture collection. Can you help me?';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="banner" style={{ backgroundColor: 'var(--color-beige-light)' }}>
      <div className="container">
        <div className="banner-inner">
          <div className="banner-content">
            <span className="banner-label">Need Assistance?</span>
            <h2 className="banner-title">Chat With Us on WhatsApp</h2>
            <p className="banner-description">
              Have questions about our products? Our team is ready to help you find the perfect furniture for your space.
            </p>
            <button className="btn btn-whatsapp" onClick={handleWhatsAppClick}>
              💬 Chat on WhatsApp
            </button>
          </div>
          <div className="banner-image">
            <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800" alt="Customer service" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppCTA;
