import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { addReview } from "../firebase/reviews";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

/* ── Constants & Configuration ───────────────────── */
const MAX_REVIEWS = 4;
const ANIMATION_STAGGER = 100;
const SCROLL_OFFSET = 100;
const DEBOUNCE_DELAY = 300;

/* ── Star renderer with accessibility ─────────────── */
const Stars = ({ rating, size = "medium" }) => {
  const starSizes = {
    small: 14,
    medium: 18,
    large: 22,
  };

  return (
    <div
      className="tc-stars"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <span
            key={i}
            className={`star ${i < rating ? "star-filled" : "star-empty"}`}
            style={{ fontSize: `${starSizes[size]}px` }}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
    </div>
  );
};

/* ── Advanced testimonial card with animations ─────── */
const TestimonialCard = ({ review, index, totalReviews }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Intersection Observer for performance
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, index * ANIMATION_STAGGER);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  // Dynamic grid positioning
  const cardStyles = useMemo(() => {
    if (totalReviews === 1)
      return { gridColumn: "1 / -1", justifySelf: "center" };
    if (totalReviews === 2 && index === 0) return { gridColumn: "1 / 2" };
    if (totalReviews === 2 && index === 1) return { gridColumn: "2 / 3" };
    return {};
  }, [totalReviews, index]);

  return (
    <div
      ref={ref}
      className={`tc-card ${isVisible ? "tc-visible" : ""} ${isHovered ? "tc-hovered" : ""}`}
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="tc-card-top">
        <div className="tc-stars">
          <Stars rating={review.rating} size="medium" />
        </div>
        <span className="tc-quote-icon" aria-hidden="true">
          "
        </span>
      </div>

      <blockquote className="tc-comment" cite={review.id}>
        {review.comment}
      </blockquote>

      <div className="tc-author">
        <div className="tc-avatar" aria-hidden="true">
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div className="tc-author-info">
          <span className="tc-author-name">{review.name}</span>
          <span className="tc-author-badge" aria-label="Verified buyer">
            ✓ Verified Buyer
          </span>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="tc-card-overlay" />
    </div>
  );
};

/* ── Form validation hook ─────────────────────────── */
const useFormValidation = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback(
    (name, value) => {
      const newErrors = { ...errors };

      switch (name) {
        case "name":
          if (!value.trim()) {
            newErrors.name = "Name is required";
          } else if (value.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
          } else {
            delete newErrors.name;
          }
          break;

        case "comment":
          if (!value.trim()) {
            newErrors.comment = "Review is required";
          } else if (value.trim().length < 10) {
            newErrors.comment = "Review must be at least 10 characters";
          } else if (value.trim().length > 500) {
            newErrors.comment = "Review must be less than 500 characters";
          } else {
            delete newErrors.comment;
          }
          break;

        default:
          break;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [errors],
  );

  const updateField = useCallback(
    (name, value) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setTouched((prev) => ({ ...prev, [name]: true }));
      if (touched[name]) {
        validateField(name, value);
      }
    },
    [touched, validateField],
  );

  const validateAll = useCallback(() => {
    let isValid = true;
    Object.keys(formData).forEach((name) => {
      if (!validateField(name, formData[name])) {
        isValid = false;
      }
    });
    return isValid;
  }, [formData, validateField]);

  return {
    formData,
    errors,
    touched,
    updateField,
    validateAll,
    setFormData,
  };
};

/* ── Main component with advanced features ─────────── */
const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const formRef = useRef(null);
  const successTimeoutRef = useRef(null);

  const { formData, errors, touched, updateField, validateAll, setFormData } =
    useFormValidation({ name: "", rating: 5, comment: "" });

  // Optimized real-time listener with error handling
  useEffect(() => {
    setLoading(true);

    const reviewsQuery = query(
      collection(db, "reviews"),
      where("status", "==", "pinned"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snap) => {
        const pinned = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .slice(0, MAX_REVIEWS);
        setReviews(pinned);
        setLoading(false);
        setSubmitError(null);
      },
      (err) => {
        console.error("Reviews listener error:", err);
        setSubmitError("Failed to load reviews. Please refresh the page.");
        setLoading(false);
      },
    );

    return () => {
      unsubscribe();
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  // Enhanced scroll to form with smooth behavior
  const scrollToForm = useCallback(() => {
    setShowForm(true);
    setSubmitError(null);

    // Small delay to ensure form is rendered
    const timer = setTimeout(() => {
      const formElement = document.getElementById("leave-review-form");
      if (formElement) {
        formElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });

        // Focus on first input after scroll
        setTimeout(() => {
          const firstInput = formElement.querySelector("input");
          if (firstInput) {
            firstInput.focus();
          }
        }, 800);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Enhanced form submission with better error handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      // Focus on first error field
      const firstErrorField = formRef.current?.querySelector(
        '[aria-invalid="true"]',
      );
      if (firstErrorField) {
        firstErrorField.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await addReview({
        name: formData.name.trim(),
        rating: formData.rating,
        comment: formData.comment.trim(),
      });

      if (result.success) {
        setSuccess(true);
        setFormData({ name: "", rating: 5, comment: "" });

        // Clear any existing timeout
        if (successTimeoutRef.current) {
          clearTimeout(successTimeoutRef.current);
        }

        successTimeoutRef.current = setTimeout(() => {
          setSuccess(false);
          setShowForm(false);
          setIsSubmitting(false);
        }, 4000);
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError(
        error.message || "Failed to submit review. Please try again.",
      );
      setIsSubmitting(false);
    }
  };

  // Memoized grid class for performance
  const gridClass = useMemo(() => {
    return `tc-grid tc-grid--${reviews.length}`;
  }, [reviews.length]);

  // Character counter for comment field
  const commentLength = formData.comment.length;
  const commentMaxLength = 500;
  const isNearLimit = commentLength > commentMaxLength * 0.9;

  return (
    <section
      className="testimonials-section"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        {/* Header */}
        <header className="testimonials-header">
          <div>
            <p className="cat-eyebrow">Client Love</p>
            <h2 id="testimonials-heading" className="section-title">
              What Our Customers Say
            </h2>
          </div>
          <button
            className="btn btn-outline btn-leave-review"
            onClick={scrollToForm}
            aria-label="Write a review"
          >
            Leave a Review
          </button>
        </header>

        {/* Content Area */}
        <main className="testimonials-content">
          {loading ? (
            <div className="tc-loading" aria-live="polite">
              <div className="spinner" aria-hidden="true" />
              <p>Loading stories…</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="tc-empty">
              <span className="tc-empty-icon" aria-hidden="true">
                💬
              </span>
              <h3>Be the first to share your experience</h3>
              <p>We'd love to hear how Furniture Hub transformed your space.</p>
              <button
                className="btn btn-primary"
                onClick={scrollToForm}
                aria-label="Write the first review"
              >
                Write a Review
              </button>
            </div>
          ) : (
            <div className={gridClass} role="list">
              {reviews.map((review, i) => (
                <TestimonialCard
                  key={review.id}
                  review={review}
                  index={i}
                  totalReviews={reviews.length}
                />
              ))}
            </div>
          )}
        </main>

        {/* Review Form */}
        <section
          id="leave-review-form"
          className={`review-form-section ${showForm ? "show" : ""}`}
          aria-labelledby="review-form-heading"
        >
          <div className="review-form-container">
            {success ? (
              <div className="review-success-message">
                <div className="success-icon" aria-hidden="true">
                  ✨
                </div>
                <h3>Thank you for your review!</h3>
                <p>
                  Your feedback helps us improve and assists other customers.
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="review-form"
                noValidate
              >
                <h3 id="review-form-heading">Share Your Experience</h3>
                <p>Help others make informed decisions about Furniture Hub</p>

                {submitError && (
                  <div className="review-error-message" role="alert">
                    {submitError}
                  </div>
                )}

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
                    <span
                      id="name-error"
                      className="error-message"
                      role="alert"
                    >
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
                    {[5, 4, 3, 2, 1].map((star) => (
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
                    rows={4}
                    maxLength={commentMaxLength}
                    placeholder="Tell us about your experience with Furniture Hub..."
                    value={formData.comment}
                    onChange={(e) => updateField("comment", e.target.value)}
                    className={`${errors.comment ? "error" : ""} ${isNearLimit ? "near-limit" : ""}`}
                    aria-invalid={!!errors.comment}
                    aria-describedby={
                      errors.comment ? "comment-error" : "comment-help"
                    }
                  />
                  <div className="comment-help">
                    <span id="comment-help">
                      {commentLength}/{commentMaxLength} characters
                    </span>
                    {errors.comment && (
                      <span
                        id="comment-error"
                        className="error-message"
                        role="alert"
                      >
                        {errors.comment}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-buttons">
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
                      setShowForm(false);
                      setSubmitError(null);
                      setFormData({ name: "", rating: 5, comment: "" });
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Testimonials;
