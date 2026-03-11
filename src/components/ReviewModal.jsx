import { useState } from 'react';
import { addReview } from '../firebase/reviews';

const ReviewModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
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
      comment: formData.comment.trim()
    });

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } else {
      alert("Failed to submit review. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content review-success" onClick={e => e.stopPropagation()}>
          <div className="success-icon">✨</div>
          <h3>Review Submitted!</h3>
          <p>Thank you for your feedback. It has been sent to our team for approval.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content review-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>Leave a Review</h2>
        <p className="review-modal-sub">Tell us about your experience with Furniture Hub.</p>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label>Your Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Jane Doe"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <div className="star-rating-input">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, rating: star})}
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
              onChange={e => setFormData({...formData, comment: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
