const WhyUs = () => {
  const features = [
    {
      icon: '🚚',
      title: 'Free Delivery',
      description: 'Free delivery and installation on all orders within Nairobi'
    },
    {
      icon: '⭐',
      title: 'Premium Quality',
      description: 'Sourced from the finest materials and craftsmen'
    },
    {
      icon: '🛡️',
      title: 'Warranty Protected',
      description: 'All products come with manufacturer warranty'
    },
    {
      icon: '💬',
      title: 'WhatsApp Support',
      description: 'Direct support via WhatsApp for instant responses'
    }
  ];

  return (
    <section className="why-us">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Why Choose Furniture Hub</h2>
          <p className="section-subtitle">Experience the difference of premium quality</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className={`feature-item animate-fade-up animate-delay-${index}`}>
              <div className="feature-icon">{feature.icon}</div>
              <h4 className="feature-title">{feature.title}</h4>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
