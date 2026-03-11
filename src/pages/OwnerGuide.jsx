import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OwnerGuide = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: "" },
    { id: "admin-access", title: "Admin Access", icon: "" },
    { id: "product-management", title: "Product Management", icon: "" },
    { id: "customer-relations", title: "Customer Relations", icon: "" },
    { id: "analytics", title: "Analytics", icon: "" },
    { id: "best-practices", title: "Best Practices", icon: "" },
  ];

  const content = {
    overview: {
      title: "Admin Overview",
      description:
        "Manage your furniture business efficiently with our comprehensive admin tools.",
      features: [
        { title: "Dashboard", desc: "Real-time business and sales overview" },
        { title: "Products", desc: "Manage inventory and track sold items" },
        { title: "Orders", desc: "Track and fulfill customer orders" },
        { title: "Customers", desc: "Customer relationship management" },
      ],
    },
    "admin-access": {
      title: "Secure Admin Access",
      description: "Protected access to your business management tools.",
      steps: [
        "Click admin icon in header",
        "Enter your credentials",
        "Access secure dashboard",
        "Manage your business",
      ],
    },
    "product-management": {
      title: "Product Management",
      description: "Complete control over your product catalog.",
      features: [
        { title: "Add Products", desc: "Upload new furniture items" },
        { title: "Edit Details", desc: "Update specifications" },
        { title: "Manage Images", desc: "High-quality photo uploads" },
        { title: "Sold Items", desc: "Track products as sold without deleting them" },
      ],
    },
    "customer-relations": {
      title: "Customer Relations",
      description: "Efficient customer communication and order management.",
      features: [
        { title: "WhatsApp Integration", desc: "Direct customer contact" },
        { title: "Order Updates", desc: "Real-time order status" },
        { title: "Customer Support", desc: "Help desk functionality" },
        { title: "Feedback Management", desc: "Customer reviews" },
      ],
    },
    analytics: {
      title: "Business Analytics",
      description: "Data-driven insights for business growth.",
      metrics: [
        { label: "Sales Performance", value: "Track revenue trends" },
        { label: "Product Analytics", value: "Best-selling items" },
        { label: "Customer Insights", value: "Buying patterns" },
        { label: "Inventory Reports", value: "Stock optimization" },
      ],
    },
    "best-practices": {
      title: "Best Practices",
      description: "Professional tips for successful business management.",
      tips: [
        "Update product information regularly",
        "Respond to customer inquiries promptly",
        "Monitor inventory levels daily",
        "Analyze sales data weekly",
        "Maintain high-quality product images",
        "Keep pricing competitive",
        "Optimize delivery processes",
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
            Admin Guide
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
            Everything you need to manage your furniture business efficiently
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

              {/* Metrics Grid */}
              {content[activeSection].metrics && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {content[activeSection].metrics.map((metric, index) => (
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
                        {metric.label}
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#6c757d",
                          margin: "0",
                        }}
                      >
                        {metric.value}
                      </p>
                    </div>
                  ))}
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
            Ready to Get Started?
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
            Access your admin dashboard and start managing your furniture
            business today.
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
              View Products
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
              Get Support
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

export default OwnerGuide;
