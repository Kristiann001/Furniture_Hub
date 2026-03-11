import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CustomerGuide = () => {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    { id: "getting-started", title: "Getting Started", icon: "" },
    { id: "browsing", title: "Browsing", icon: "" },
    { id: "shopping-process", title: "Shopping", icon: "" },
    { id: "product-details", title: "Product Info", icon: "" },
    { id: "ordering", title: "Ordering", icon: "" },
    { id: "tips", title: "Shopping Tips", icon: "" },
  ];

  const content = {
    "getting-started": {
      title: "Getting Started",
      description:
        "Welcome to Furniture Hub - your destination for quality furniture.",
      features: [
        {
          title: "Easy Navigation",
          desc: "Simple and intuitive website layout",
        },
        {
          title: "Quality Products",
          desc: "Curated selection of furniture items",
        },
        {
          title: "Direct Support",
          desc: "WhatsApp integration for quick help",
        },
        { title: "Mobile Friendly", desc: "Shop on any device" },
      ],
    },
    browsing: {
      title: "Browse Collections",
      description: "Find the perfect furniture for your space.",
      steps: [
        "Visit the Collections page",
        "Browse by category or style",
        "Filter products as needed",
        "Click items for details",
      ],
    },
    "shopping-process": {
      title: "Shopping Process",
      description: "Simple steps to find and purchase furniture.",
      features: [
        { title: "Browse Products", desc: "Explore our collections" },
        { title: "Contact Us", desc: "Call or WhatsApp 0720515922" },
        { title: "Confirm Details", desc: "Check specifications and images" },
        { title: "Complete Purchase", desc: "Finalize your order" },
      ],
    },
    "product-details": {
      title: "Product Information",
      description: "Everything you need to know about our products.",
      details: [
        { label: "Multiple Images", value: "View from all angles" },
        { label: "Specifications", value: "Dimensions and materials" },
        { label: "Pricing", value: "Clear and transparent" },
        { label: "Availability", value: "Real-time stock status" },
      ],
    },
    ordering: {
      title: "Order via Call or WhatsApp",
      description: "Fast and convenient ordering through a direct call or WhatsApp.",
      benefits: [
        "Instant response from sales team",
        "Discuss customization options",
        "Get delivery timeline",
        "Arrange payment methods",
        "Track order status",
        "After-sales support",
      ],
      callToAction: true,
    },
    tips: {
      title: "Shopping Tips",
      description: "Helpful advice for a better shopping experience.",
      tips: [
        "Measure your space before shopping",
        "Consider your existing decor style",
        "Set a realistic budget",
        "Read product specifications carefully",
        "Ask about delivery options",
        "Check warranty information",
        "Compare different options",
        "Don't hesitate to ask questions",
      ],
    },
  };

  return (
    <div className="app">
      <Header />

      {/* Minimal Header */}
      <section
        style={{
          padding: "120px 20px 60px",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #e9ecef",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: "700",
              color: "#212529",
              marginBottom: "16px",
              letterSpacing: "-0.5px",
            }}
          >
            Customer Guide
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "#6c757d",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Learn how to find and purchase the perfect furniture for your space
          </p>
        </div>
      </section>

      {/* Simple Navigation */}
      <section
        style={{
          backgroundColor: "#ffffff",
          padding: "20px 0",
          borderBottom: "1px solid #e9ecef",
          position: "sticky",
          top: "0",
          zIndex: 100,
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              padding: "0 20px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  padding: "12px 20px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor:
                    activeSection === section.id ? "#212529" : "#f8f9fa",
                  color: activeSection === section.id ? "#ffffff" : "#6c757d",
                  fontWeight: "500",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>{section.icon}</span>
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section style={{ padding: "60px 20px", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {/* Dynamic Content */}
            <div
              style={{
                animation: "fadeIn 0.3s ease",
                minHeight: "400px",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(24px, 4vw, 32px)",
                  fontWeight: "700",
                  color: "#212529",
                  marginBottom: "20px",
                }}
              >
                {content[activeSection].title}
              </h2>

              <p
                style={{
                  fontSize: "16px",
                  color: "#6c757d",
                  lineHeight: "1.6",
                  marginBottom: "40px",
                }}
              >
                {content[activeSection].description}
              </p>

              {/* Features Grid */}
              {content[activeSection].features && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {content[activeSection].features.map((feature, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "24px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        border: "1px solid #e9ecef",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#e9ecef";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#212529",
                          marginBottom: "8px",
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#6c757d",
                          lineHeight: "1.5",
                          margin: "0",
                        }}
                      >
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Steps List */}
              {content[activeSection].steps && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {content[activeSection].steps.map((step, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "16px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: "#212529",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "600",
                          fontSize: "14px",
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </div>
                      <span
                        style={{
                          fontSize: "16px",
                          color: "#495057",
                          fontWeight: "500",
                        }}
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Details Grid */}
              {content[activeSection].details && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {content[activeSection].details.map((detail, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "20px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        textAlign: "center",
                        border: "1px solid #e9ecef",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#212529",
                          marginBottom: "8px",
                        }}
                      >
                        {detail.label}
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#6c757d",
                          margin: "0",
                        }}
                      >
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Benefits List */}
              {content[activeSection].benefits && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {content[activeSection].benefits.map((benefit, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "16px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid #e9ecef",
                      }}
                    >
                      <span
                        style={{
                          color: "#25d366",
                          fontSize: "18px",
                          fontWeight: "700",
                          flexShrink: 0,
                        }}
                      ></span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#495057",
                          lineHeight: "1.5",
                        }}
                      >
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Special CTA for Ordering Section */}
              {content[activeSection].callToAction && (
                <div style={{ marginTop: 32, textAlign: "center" }}>
                  <a
                    href="tel:0720515922"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "14px 32px",
                      backgroundColor: "#0d6efd",
                      color: "#ffffff",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      fontSize: "16px",
                      transition: "all 0.2s ease",
                      boxShadow: "0 4px 12px rgba(13, 110, 253, 0.2)"
                    }}
                  >
                    📞 Call 0720515922 to Order
                  </a>
                  <p style={{ marginTop: 12, fontSize: 13, color: "#6c757d" }}>
                    Tap to call directly from your mobile device
                  </p>
                </div>
              )}

              {/* Tips List */}
              {content[activeSection].tips && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {content[activeSection].tips.map((tip, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "12px 0",
                        borderBottom:
                          index < content[activeSection].tips.length - 1
                            ? "1px solid #e9ecef"
                            : "none",
                      }}
                    >
                      <span
                        style={{
                          color: "#212529",
                          fontSize: "16px",
                          flexShrink: 0,
                        }}
                      >
                        •
                      </span>
                      <span
                        style={{
                          fontSize: "15px",
                          color: "#495057",
                          lineHeight: "1.5",
                        }}
                      >
                        {tip}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section
        style={{
          padding: "60px 20px",
          backgroundColor: "#f8f9fa",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: "700",
              color: "#212529",
              marginBottom: "20px",
            }}
          >
            Ready to Start Shopping?
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#6c757d",
              marginBottom: "32px",
              maxWidth: "500px",
              margin: "0 auto 32px",
            }}
          >
            Browse our collections and find the perfect furniture for your space
            today.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/products"
              style={{
                padding: "14px 28px",
                backgroundColor: "#212529",
                color: "#ffffff",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "16px",
                transition: "all 0.2s ease",
              }}
            >
              Browse Collections
            </Link>
            <Link
              to="/contact"
              style={{
                padding: "14px 28px",
                backgroundColor: "transparent",
                color: "#212529",
                textDecoration: "none",
                border: "1px solid #212529",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "16px",
                transition: "all 0.2s ease",
              }}
            >
              Get Help
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Hide scrollbar for navigation */
        div::-webkit-scrollbar {
          display: none;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          section {
            padding: 40px 20px !important;
          }

          .container {
            padding: 0;
            width: 100% !important;
          }

          div[style*="grid-template-columns"],
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          div[style*="maxWidth: 800px"] {
            padding: 0 10px;
          }
        }

        @media (max-width: 480px) {
          section {
            padding: 30px 15px !important;
          }

          h1 {
            margin-bottom: 12px !important;
            font-size: 28px !important;
          }

          h2 {
            margin-bottom: 16px !important;
            font-size: 22px !important;
          }
          
          /* Fix sticky nav overlap on tiny screens */
          section[style*="position: sticky"] {
            top: 60px !important;
          }

          div[style*="padding: 24px"] {
            padding: 16px !important;
          }

          div[style*="padding: 20px"] {
            padding: 16px !important;
          }

          div[style*="padding: 16px"] {
            padding: 12px !important;
          }

          div[style*="padding: 12px"] {
            padding: 8px !important;
          }

          div[style*="gap: 20px"] {
            gap: 12px !important;
          }

          div[style*="gap: 16px"] {
            gap: 12px !important;
          }

          div[style*="gap: 12px"] {
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerGuide;
