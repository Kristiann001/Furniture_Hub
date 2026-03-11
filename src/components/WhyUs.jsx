const features = [
  {
    icon: '🚚',
    title: 'Free Delivery',
    description: 'Free delivery and installation on all orders within Nairobi',
    accent: '#6366f1',
  },
  {
    icon: '⭐',
    title: 'Premium Quality',
    description: 'Sourced from the finest materials and expert craftsmen',
    accent: '#f59e0b',
  },
  {
    icon: '🛡️',
    title: 'Warranty Protected',
    description: 'All products come with manufacturer warranty coverage',
    accent: '#10b981',
  },
  {
    icon: '💬',
    title: 'WhatsApp Support',
    description: 'Direct support via WhatsApp for instant responses',
    accent: '#25d366',
  },
];

const WhyUs = () => {
  return (
    <section className="whyus-section">
      <div className="container">
        <div className="whyus-header">
          <p className="cat-eyebrow">Why Us</p>
          <h2 className="whyus-title">Why Choose Furniture Hub</h2>
          <p className="whyus-sub">
            We're more than furniture — we're committed to your complete satisfaction.
          </p>
        </div>

        <div className="whyus-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className="whyus-card"
              style={{ '--accent': f.accent }}
            >
              <div className="whyus-icon">{f.icon}</div>
              <h4 className="whyus-card-title">{f.title}</h4>
              <p className="whyus-card-desc">{f.description}</p>
              <div className="whyus-bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
