import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  useEffect(() => {
    // Initialize animations
    const animatedElements = document.querySelectorAll(".animate-fade-up");

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => observer.observe(el));
  }, []);

  const values = [
    {
      icon: "🎯",
      title: "Quality First",
      description:
        "We never compromise on quality. Every piece is carefully selected and crafted to meet the highest standards.",
    },
    {
      icon: "💡",
      title: "Innovation",
      description:
        "We stay ahead of design trends and bring innovative furniture solutions that blend form and function.",
    },
    {
      icon: "🤝",
      title: "Customer Focus",
      description:
        "Our customers are at the heart of everything we do. We strive to exceed expectations with every interaction.",
    },
    {
      icon: "🌱",
      title: "Sustainability",
      description:
        "We are committed to sustainable practices and work with suppliers who share our environmental values.",
    },
  ];

  const team = [
    {
      name: "Fredrick Simiyu",
      role: "Founder & CEO",
      image:
        "https://ui-avatars.com/api/?name=Fredrick+Simiyu&background=2C3E50&color=fff&size=400&font-size=0.4&bold=true",
    },
    {
      name: "Joel Kangu",
      role: "Operations Manager",
      image:
        "https://ui-avatars.com/api/?name=Joel+Kangu&background=2C3E50&color=fff&size=400&font-size=0.4&bold=true",
    },
    {
      name: "Kristiane",
      role: "Technical Manager",
      image:
        "https://ui-avatars.com/api/?name=Kristiane&background=2C3E50&color=fff&size=400&font-size=0.4&bold=true",
    },
    {
      name: "Doris Ogisa",
      role: "Customer Experience Lead",
      image:
        "https://ui-avatars.com/api/?name=Doris+Ogisa&background=2C3E50&color=fff&size=400&font-size=0.4&bold=true",
    },
  ];

  return (
    <div className="app">
      <Header />

      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h1 className="animate-fade-up">
                Crafting Beautiful Spaces Since 2025
              </h1>
              <p className="about-description animate-fade-up animate-delay-1">
                Furniture Hub Kenya was founded with a simple vision: to bring
                world-class furniture design to Kenyan homes and offices. We
                believe that quality furniture is more than just functional—it
                transforms spaces and creates lasting memories.
              </p>
              <p className="about-description animate-fade-up animate-delay-2">
                Today, we are proud to be one of Kenya's leading providers of
                premium modern furniture, serving discerning clients across
                residential, commercial, and hospitality sectors.
              </p>
            </div>
            <div className="about-image animate-fade-up animate-delay-3">
              <img
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800"
                alt="Furniture Hub Kenya showroom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-image animate-fade-up">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800"
                alt="Our mission"
              />
            </div>
            <div className="mission-text">
              <h2 className="animate-fade-up">Our Mission</h2>
              <p className="animate-fade-up animate-delay-1">
                To transform every space into a beautiful, functional sanctuary 
                by providing premium furniture that combines exceptional quality, 
                timeless design, and outstanding value.
              </p>
              <p className="animate-fade-up animate-delay-2">
                We strive to make world-class furniture accessible to every Kenyan 
                home and business, delivered with unparalleled customer service and 
                a commitment to lasting relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item animate-fade-up">
              <div className="stat-number">9+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item animate-fade-up animate-delay-1">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item animate-fade-up animate-delay-2">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item animate-fade-up animate-delay-3">
              <div className="stat-number">50+</div>
              <div className="stat-label">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Our Values */}
      <section className="values-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">What sets us apart from the rest</p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div
                key={index}
                className={`value-card animate-fade-up animate-delay-${index}`}
              >
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate people behind Furniture Hub
            </p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <div
                key={index}
                className={`team-member animate-fade-up animate-delay-${index}`}
              >
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="banner"
        style={{ backgroundColor: "var(--color-beige-light)" }}
      >
        <div className="container">
          <div className="banner-inner">
            <div className="banner-content">
              <span className="banner-label">
                Ready to Transform Your Space?
              </span>
              <h2 className="banner-title">Visit Our Showroom</h2>
              <p className="banner-description">
                Experience our furniture collection firsthand. Our team is ready
                to help you find the perfect pieces for your space.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Get Directions
              </Link>
            </div>
            <div className="banner-image">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
                alt="Furniture Hub showroom"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Inline responsive styles for About page */}
      <style>{`
        /* Mission Section */
        .mission-section {
          padding: var(--spacing-4xl) 0;
          background-color: #ffffff; /* Explicit white for light mode */
        }
        
        [data-theme="dark"] .mission-section {
          background-color: #1c1a17;
        }

        .mission-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-3xl);
          align-items: center;
        }

        .mission-image {
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-xl);
        }

        .mission-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        .mission-text h2 {
          font-size: clamp(28px, 4vw, 42px);
          margin-bottom: var(--spacing-lg);
          color: #111111; /* Explicit black for light mode */
        }

        .mission-text p {
          font-size: 18px;
          line-height: 1.8;
          color: #525252; /* Explicit dark gray for light mode */
          margin-bottom: var(--spacing-lg);
        }
        
        /* Dark mode overrides for Mission section inline styles */
        [data-theme="dark"] .mission-text h2 { color: #f5f0e8; }
        [data-theme="dark"] .mission-text p { color: #c0b0a0; }

        /* Mobile-first responsive adjustments */
        @media (max-width: 992px) {
          .about-hero {
            padding: 100px 0 var(--spacing-3xl);
          }

          .about-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: var(--spacing-2xl);
          }

          .about-text {
            order: 2;
          }

          .about-text h1 {
            font-size: clamp(24px, 5vw, 36px);
          }

          .about-description {
            font-size: 16px;
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }

          .about-image {
            order: 1;
            max-width: 500px;
            margin: 0 auto;
          }

          .mission-section {
            padding: var(--spacing-3xl) 0;
          }

          .mission-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-2xl);
          }

          .mission-image {
            order: 1;
            max-width: 500px;
            margin: 0 auto;
          }

          .mission-text {
            order: 2;
            text-align: center;
          }

          .mission-text h2 {
            font-size: clamp(24px, 4vw, 32px);
          }

          .mission-text p {
            font-size: 16px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-xl);
          }

          .values-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-lg);
          }

          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-lg);
          }

          .team-section,
          .values-section {
            padding: var(--spacing-3xl) 0;
          }
        }

        @media (max-width: 576px) {
          .about-hero {
            padding: 80px 0 var(--spacing-2xl);
          }

          .about-description {
            font-size: 15px;
            line-height: 1.7;
          }

          .mission-section {
            padding: var(--spacing-2xl) 0;
          }

          .mission-text p {
            font-size: 15px;
            line-height: 1.7;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }

          .stat-number {
            font-size: clamp(36px, 10vw, 48px);
          }

          .values-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }

          .value-card {
            padding: var(--spacing-lg);
          }

          .team-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }

          .member-image {
            width: 150px;
            height: 150px;
          }

          .team-section,
          .values-section {
            padding: var(--spacing-2xl) 0;
          }

          .banner-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .banner-content {
            padding: var(--spacing-xl);
            padding-top: 0;
          }

          .banner-image {
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
