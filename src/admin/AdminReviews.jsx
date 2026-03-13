import { useState, useEffect } from "react";
import {
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} from "../firebase/reviews";
import toast from "react-hot-toast";

const StarRow = ({ rating }) =>
  Array(5)
    .fill(0)
    .map((_, i) => (
      <span
        key={i}
        style={{ color: i < rating ? "#f59e0b" : "#d1d5db", fontSize: 15 }}
      >
        ★
      </span>
    ));

const StatusBadge = ({ status }) => {
  const map = {
    pinned: { label: "📌 Pinned", cls: "rev-badge rev-badge--pinned" },
    pending: { label: "⏳ Pending", cls: "rev-badge rev-badge--pending" },
    rejected: { label: "✗ Hidden", cls: "rev-badge rev-badge--rejected" },
  };
  const { label, cls } = map[status] ?? map.pending;
  return <span className={cls}>{label}</span>;
};

const fmtDate = (ts) => {
  if (!ts) return "Just now";
  try {
    return new Date(ts.toDate()).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Just now";
  }
};

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchReviews = async () => {
    try {
      const data = await getAllReviews();
      setReviews(data);
    } catch (err) {
      console.error("Error fetching admin reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handlePin = async (id) => {
    const pinnedCount = reviews.filter((r) => r.status === "pinned").length;
    if (pinnedCount >= 4) {
      toast.error("You can only pin up to 4 reviews. Please unpin one first.", {
        icon: "📌",
        style: {
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          borderLeft: "4px solid #dc2626",
        },
      });
      return;
    }
    const res = await updateReviewStatus(id, "pinned");
    if (res.success) {
      toast.success("Review pinned to homepage", {
        icon: "📌",
        style: {
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          borderLeft: "4px solid #059669",
        },
      });
      fetchReviews();
    } else {
      toast.error("Failed to pin review", {
        icon: "❌",
        style: {
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          borderLeft: "4px solid #dc2626",
        },
      });
    }
  };

  const handleUnpin = async (id) => {
    const res = await updateReviewStatus(id, "pending");
    if (res.success) {
      toast.success("Review unpinned", {
        icon: "📤",
        style: {
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          borderLeft: "4px solid #2563eb",
        },
      });
      fetchReviews();
    }
  };

  const handleReject = async (id) => {
    const res = await updateReviewStatus(id, "rejected");
    if (res.success) {
      toast.success("Review hidden", {
        icon: "👁️‍🗨️",
        style: {
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          borderLeft: "4px solid #d97706",
        },
      });
      fetchReviews();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this review?")) {
      const res = await deleteReview(id);
      if (res.success) {
        toast.success("Review deleted permanently", {
          icon: "🗑️",
          style: {
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            borderLeft: "4px solid #dc2626",
          },
        });
        fetchReviews();
      }
    }
  };

  const pinnedReviews = reviews.filter((r) => r.status === "pinned");
  const pendingReviews = reviews.filter((r) => r.status === "pending");
  const rejectedReviews = reviews.filter((r) => r.status === "rejected");

  const filtered =
    filter === "all"
      ? reviews
      : filter === "pinned"
        ? pinnedReviews
        : filter === "pending"
          ? pendingReviews
          : rejectedReviews;

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading reviews…</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Customer Reviews</h1>
          <p className="admin-subtitle">
            Moderate submissions and pin up to 4 testimonials on the homepage.
          </p>
        </div>
        <div className="rev-stats-row">
          <div className="rev-stat-pill rev-stat-pill--total">
            <span className="rev-stat-num">{reviews.length}</span>
            <span className="rev-stat-lbl">Total</span>
          </div>
          <div className="rev-stat-pill rev-stat-pill--pending">
            <span className="rev-stat-num">{pendingReviews.length}</span>
            <span className="rev-stat-lbl">Pending</span>
          </div>
          <div className="rev-stat-pill rev-stat-pill--pinned">
            <span className="rev-stat-num">{pinnedReviews.length}/4</span>
            <span className="rev-stat-lbl">Pinned</span>
          </div>
        </div>
      </div>

      {/* ── Pinned Showcase ────────────────────────────── */}
      <section className="rev-pinned-section">
        <div className="rev-pinned-label">
          <span className="rev-pinned-icon">📌</span>
          <span>Pinned on Homepage</span>
          <span className="rev-pinned-count">{pinnedReviews.length} / 4</span>
        </div>

        {pinnedReviews.length === 0 ? (
          <div className="rev-pinned-empty">
            <span>💬</span>
            <p>
              No reviews pinned yet. Pin up to 4 to showcase on the homepage.
            </p>
          </div>
        ) : (
          <div className="rev-pinned-grid">
            {pinnedReviews.slice(0, 4).map((rev) => (
              <div key={rev.id} className="rev-pinned-card">
                <div className="rev-pinned-card-top">
                  <div className="rev-pinned-avatar">
                    {rev.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="rev-pinned-meta">
                    <span className="rev-pinned-name">{rev.name}</span>
                    <span className="rev-pinned-date">
                      {fmtDate(rev.createdAt)}
                    </span>
                  </div>
                  <button
                    className="rev-unpin-btn"
                    onClick={() => handleUnpin(rev.id)}
                    title="Unpin from homepage"
                  >
                    ✕
                  </button>
                </div>
                <div className="rev-pinned-stars">
                  <StarRow rating={rev.rating} />
                </div>
                <p className="rev-pinned-comment">"{rev.comment}"</p>
              </div>
            ))}

            {/* Empty slots */}
            {Array(4 - pinnedReviews.length)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="rev-pinned-card rev-pinned-card--empty"
                >
                  <span>＋</span>
                  <p>Empty slot</p>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* ── Filter Tabs ────────────────────────────────── */}
      <div className="rev-filter-bar">
        {[
          { key: "all", label: "All", count: reviews.length },
          { key: "pending", label: "Pending", count: pendingReviews.length },
          { key: "pinned", label: "Pinned", count: pinnedReviews.length },
          { key: "rejected", label: "Hidden", count: rejectedReviews.length },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`admin-filter-tab ${filter === tab.key ? "active" : ""}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
            <span className="rev-filter-count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* ── Desktop Table ──────────────────────────────── */}
      <div className="admin-table-wrap admin-table-desktop reviews-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="admin-empty-row">
                  No reviews in this category.
                </td>
              </tr>
            ) : (
              filtered.map((rev) => (
                <tr
                  key={rev.id}
                  className={rev.status === "pinned" ? "rev-row--pinned" : ""}
                >
                  <td>
                    <div className="rev-customer-cell">
                      <span className="rev-table-avatar">
                        {rev.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="rev-table-name">{rev.name}</span>
                    </div>
                  </td>
                  <td>
                    <StarRow rating={rev.rating} />
                  </td>
                  <td className="rev-comment-cell">
                    <span className="rev-comment-text">"{rev.comment}"</span>
                  </td>
                  <td>
                    <StatusBadge status={rev.status} />
                  </td>
                  <td className="rev-date-cell">{fmtDate(rev.createdAt)}</td>
                  <td>
                    <div className="rev-action-group">
                      {rev.status !== "pinned" && rev.status !== "rejected" && (
                        <button
                          className="rev-btn rev-btn--pin"
                          onClick={() => handlePin(rev.id)}
                          title="Pin to Homepage"
                        >
                          📌 Pin
                        </button>
                      )}
                      {rev.status === "pinned" && (
                        <button
                          className="rev-btn rev-btn--unpin"
                          onClick={() => handleUnpin(rev.id)}
                          title="Unpin"
                        >
                          ✕ Unpin
                        </button>
                      )}
                      {rev.status !== "rejected" && (
                        <button
                          className="rev-btn rev-btn--hide"
                          onClick={() => handleReject(rev.id)}
                          title="Hide review"
                        >
                          Hide
                        </button>
                      )}
                      {rev.status === "rejected" && (
                        <button
                          className="rev-btn rev-btn--pin"
                          onClick={() => handlePin(rev.id)}
                          title="Approve & Pin"
                        >
                          📌 Pin
                        </button>
                      )}
                      <button
                        className="rev-btn rev-btn--delete"
                        onClick={() => handleDelete(rev.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Cards ───────────────────────────────── */}
      <div className="admin-mobile-cards rev-mobile-cards">
        {filtered.length === 0 ? (
          <div className="rev-mobile-empty">No reviews in this category.</div>
        ) : (
          filtered.map((rev) => (
            <div
              key={rev.id}
              className={`rev-mobile-card ${rev.status === "pinned" ? "rev-mobile-card--pinned" : ""}`}
            >
              {/* Card Header */}
              <div className="rev-mobile-header">
                <span className="rev-table-avatar rev-mobile-avatar">
                  {rev.name.charAt(0).toUpperCase()}
                </span>
                <div className="rev-mobile-meta">
                  <span className="rev-mobile-name">{rev.name}</span>
                  <span className="rev-mobile-date">
                    {fmtDate(rev.createdAt)}
                  </span>
                </div>
                <StatusBadge status={rev.status} />
              </div>

              {/* Stars */}
              <div className="rev-mobile-stars">
                <StarRow rating={rev.rating} />
              </div>

              {/* Comment */}
              <p className="rev-mobile-comment">"{rev.comment}"</p>

              {/* Actions */}
              <div className="rev-mobile-actions">
                {rev.status !== "pinned" && rev.status !== "rejected" && (
                  <button
                    className="rev-btn rev-btn--pin"
                    onClick={() => handlePin(rev.id)}
                  >
                    📌 Pin
                  </button>
                )}
                {rev.status === "pinned" && (
                  <button
                    className="rev-btn rev-btn--unpin"
                    onClick={() => handleUnpin(rev.id)}
                  >
                    ✕ Unpin
                  </button>
                )}
                {rev.status !== "rejected" && (
                  <button
                    className="rev-btn rev-btn--hide"
                    onClick={() => handleReject(rev.id)}
                  >
                    Hide
                  </button>
                )}
                {rev.status === "rejected" && (
                  <button
                    className="rev-btn rev-btn--pin"
                    onClick={() => handlePin(rev.id)}
                  >
                    📌 Pin
                  </button>
                )}
                <button
                  className="rev-btn rev-btn--delete"
                  onClick={() => handleDelete(rev.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
