import { useState } from "react";
import { addReview } from "../firebase/reviews";
import toast from "react-hot-toast";

const ReviewModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    setIsSubmitting(true);
    const result = await addReview({
      name: formData.name.trim(),
      rating: formData.rating,
      comment: formData.comment.trim(),
    });

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        toast.success(
          "Review submitted successfully! Thank you for your feedback.",
          {
            icon: "🌟",
            style: {
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              borderLeft: "4px solid #059669",
            },
          },
        );
        onClose();
      }, 3000);
    } else {
      toast.error("Failed to submit review. Please try again.", {
        icon: "⚠️",
        style: {
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          borderLeft: "4px solid #dc2626",
        },
      });
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content modal-success"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="success-icon">✨</div>
          <h3>Thank you for your review!</h3>
          <p>
            Your feedback helps us improve and assists other customers in making
            better furniture choices.
          </p>
          <button className="modal-close" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content review-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>Leave a Review</h2>
        <p className="review-modal-sub">
          Tell us about your experience with Furniture Hub.
        </p>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="review-name">Your Name *</label>
            <input
              id="review-name"
              type="text"
              name="name"
              required
              placeholder="e.g. Jane Doe"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={errors.name ? "error" : ""}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span id="name-error" className="error-message" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="review-rating">Rating *</label>
            <div
              className="star-rating-input"
              role="radiogroup"
              aria-label="Select a rating"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${formData.rating >= star ? "active" : ""}`}
                  onClick={() => updateField("rating", star)}
                  aria-pressed={formData.rating === star}
                  aria-label={`${star} star${star !== 1 ? "s" : ""}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="review-comment">Your Review *</label>
            <textarea
              id="review-comment"
              name="comment"
              required
              placeholder="Share your experience with others..."
              value={formData.comment}
              onChange={(e) => updateField("comment", e.target.value)}
              className={errors.comment ? "error" : ""}
              aria-invalid={!!errors.comment}
              aria-describedby={errors.comment ? "comment-error" : undefined}
              rows="5"
            />
            {errors.comment && (
              <span id="comment-error" className="error-message" role="alert">
                {errors.comment}
              </span>
            )}
          </div>

          <div className="modal-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Submitting…" : "Submit Review"}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setFormData({ name: "", rating: 5, comment: "" });
              }}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
