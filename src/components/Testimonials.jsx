import { useState, useEffect } from 'react';
import { getPinnedReviews } from '../firebase/reviews';
import ReviewModal from './ReviewModal';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchReviews = async () => {
    try {
      const pinnedReviews = await getPinnedReviews();
      setReviews(pinnedReviews.slice(0, 3));
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    return Array(5).fill('★').map((star, i) => (
      <span key={i} className={`star ${i < rating ? 'star-filled' : 'star-empty'}`}>
        {star}
      </span>
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <div>
            <p className="cat-eyebrow">Client Love</p>
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <button 
            className="btn btn-outline btn-leave-review"
            onClick={() => setShowModal(true)}
          >
            Leave a Review
          </button>
        </div>

        {loading ? (
          <div className="reviews-loading">
            <div className="spinner"></div>
            <p>Loading stories...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="reviews-empty">
            <div className="reviews-empty-icon">💭</div>
            <h3>Be the first to share your experience</h3>
            <p>We'd love to hear how Furniture Hub transformed your space.</p>
            <button 
              className="btn btn-primary mt-4"
              onClick={() => setShowModal(true)}
            >
              Write a Review
            </button>
          </div>
        ) : (
          <div className="testimonials-grid">
            {reviews.map((review) => (
              <div key={review.id} className="testimonial-card animate-fade-up">
                <div className="testimonial-stars">
                  {renderStars(review.rating)}
                </div>
                <blockquote className="testimonial-comment">
                  "{review.comment}"
                </blockquote>
                <div className="testimonial-author">
                  <div className="author-avatar">{review.name.charAt(0).toUpperCase()}</div>
                  <div className="author-info">
                    <span className="author-name">{review.name}</span>
                    <span className="author-badge">✓ Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && <ReviewModal onClose={() => { setShowModal(false); fetchReviews(); }} />}
    </section>
  );
};

export default Testimonials;
