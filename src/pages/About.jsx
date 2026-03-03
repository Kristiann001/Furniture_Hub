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
      name: "John Mwangi",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      name: "Sarah Kamau",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b332c5cd?w=400",
    },
    {
      name: "David Ochieng",
      role: "Operations Manager",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      name: "Grace Wanjiru",
      role: "Customer Experience Lead",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
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
                Crafting Beautiful Spaces Since 2015
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

      {/* Our Values */}
      <section className="values-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">What drives everything we do</p>
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
    </div>
  );
};

export default About;
