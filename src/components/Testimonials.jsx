import { useState, useEffect } from "react";
import { getPinnedReviews, addReview } from "../firebase/reviews";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const fetchReviews = async () => {
    try {
      console.log("🔍 Fetching pinned reviews...");
      const pinnedReviews = await getPinnedReviews();
      console.log("✅ Successfully fetched reviews:", pinnedReviews.length);
      setReviews(pinnedReviews.slice(0, 4));
      setLastUpdated(Date.now());
    } catch (err) {
      console.error("❌ Failed to load reviews:", err);
      // Set empty state on error to prevent infinite loading
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToReviewForm = () => {
    const reviewForm = document.getElementById("leave-review-form");
    if (reviewForm) {
      reviewForm.scrollIntoView({ behavior: "smooth", block: "start" });
      setShowForm(true);
    } else {
      setShowForm(true);
      setTimeout(() => {
        const form = document.getElementById("leave-review-form");
        if (form) {
          form.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    console.log("📝 Submitting review:", {
      name: formData.name,
      rating: formData.rating,
    });
    setIsSubmitting(true);
    const result = await addReview({
      name: formData.name.trim(),
      rating: formData.rating,
      comment: formData.comment.trim(),
    });

    if (result.success) {
      console.log("✅ Review submitted successfully!");
      setSuccess(true);
      setFormData({ name: "", rating: 5, comment: "" });
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
        // No need to manually fetch - real-time listener will handle updates
      }, 3000);
    } else {
      console.error("❌ Failed to submit review:", result.error);
      alert("Failed to submit review. Please try again.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Set up real-time listener for reviews
    console.log("🔍 Setting up real-time reviews listener...");

    const reviewsQuery = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      reviewsQuery,
      (querySnapshot) => {
        console.log("📡 Real-time update received!");
        const allReviews = querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        // Filter only pinned reviews and limit to 4
        const pinnedReviews = allReviews
          .filter((r) => r.status === "pinned")
          .slice(0, 4);
        console.log("✅ Updated pinned reviews:", pinnedReviews.length);

        setReviews(pinnedReviews);
        setLoading(false);
      },
      (error) => {
        console.error("❌ Real-time listener error:", error);
        setLoading(false);
      },
    );

    // Cleanup listener on component unmount
    return () => {
      console.log("🔌 Cleaning up reviews listener");
      unsubscribe();
    };
  }, []);

  const renderStars = (rating) => {
    return Array(5)
      .fill("★")
      .map((star, i) => (
        <span
          key={i}
          className={`star ${i < rating ? "star-filled" : "star-empty"}`}
        >
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
            onClick={scrollToReviewForm}
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
              onClick={scrollToReviewForm}
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
                  <div className="author-avatar">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="author-info">
                    <span className="author-name">{review.name}</span>
                    <span className="author-badge">✓ Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review Form Section */}
        <div
          id="leave-review-form"
          className={`review-form-section ${showForm ? "show" : ""}`}
        >
          <div className="review-form-container">
            <h3>Leave a Review</h3>
            <p>Tell us about your experience with Furniture Hub.</p>

            {success ? (
              <div className="review-success-message">
                <div className="success-icon">✨</div>
                <h4>Review Submitted!</h4>
                <p>
                  Thank you for your feedback. It has been sent to our team for
                  approval.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="review-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <div className="star-rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${formData.rating >= star ? "active" : ""}`}
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Review</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="What did you love about your furniture?"
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="form-buttons">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
