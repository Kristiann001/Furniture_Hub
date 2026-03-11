import { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Testimonials from '../components/Testimonials';
import Banner from '../components/Banner';
import WhyUs from '../components/WhyUs';
import WhatsAppCTA from '../components/WhatsAppCTA';
import Footer from '../components/Footer';

const Home = () => {
  useEffect(() => {
    // Initialize animations when component mounts
    const initAnimations = () => {
      const animatedElements = document.querySelectorAll('.animate-fade-up');
      
      if (!animatedElements.length) return;
      
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      animatedElements.forEach(el => observer.observe(el));
      
      // Parallax effect for hero
      const heroImage = document.querySelector('.hero-image');
      if (heroImage) {
        const handleScroll = () => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * 0.3;
          
          if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
          }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }
    };

    initAnimations();
  }, []);

  return (
    <div className="app">
      <Header />
      <Hero />
      <Categories />
      <Testimonials />
      <Banner />
      <WhyUs />
      <WhatsAppCTA />
      <Footer />
    </div>
  );
};

export default Home;
