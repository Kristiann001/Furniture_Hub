import { useState, useEffect } from "react";
import { getAllReviews, updateReviewStatus, deleteReview } from "../firebase/reviews";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const pinnedCount = reviews.filter(r => r.status === "pinned").length;
    if (pinnedCount >= 3) {
      alert("You can only pin up to 3 reviews to the homepage. Please unpin one first.");
      return;
    }
    const res = await updateReviewStatus(id, "pinned");
    if (res.success) fetchReviews();
  };

  const handleUnpin = async (id) => {
    const res = await updateReviewStatus(id, "pending");
    if (res.success) fetchReviews();
  };

  const handleReject = async (id) => {
    const res = await updateReviewStatus(id, "rejected");
    if (res.success) fetchReviews();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this review?")) {
      const res = await deleteReview(id);
      if (res.success) fetchReviews();
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Customer Reviews</h1>
          <p className="admin-subtitle">Moderate and pin your top 3 testimonials for the homepage.</p>
        </div>
      </div>

      <div className="reviews-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Rating</th>
              <th>Review Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500 admin-empty-row">
                  No reviews submitted yet.
                </td>
              </tr>
            ) : (
              reviews.map((rev) => (
                <tr key={rev.id}>
                  <td className="text-sm text-gray-500">
                    {rev.createdAt ? new Date(rev.createdAt.toDate()).toLocaleDateString() : "Just now"}
                  </td>
                  <td>
                    <div className="font-semibold">{rev.name}</div>
                  </td>
                  <td>
                    <div className="text-amber-500">{"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}</div>
                  </td>
                  <td>
                    <div className="mb-2">
                      <span className={`status-badge status-${rev.status}`}>
                        {rev.status.charAt(0).toUpperCase() + rev.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm italic text-gray-600 dark:text-gray-400 max-w-md">"{rev.comment}"</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {rev.status !== "pinned" && rev.status !== "rejected" && (
                        <button
                          onClick={() => handlePin(rev.id)}
                          className="action-btn text-blue-600 hover:text-blue-800"
                          title="Pin to Homepage"
                        >
                          📌
                        </button>
                      )}
                      {rev.status === "pinned" && (
                        <button
                          onClick={() => handleUnpin(rev.id)}
                          className="action-btn text-gray-500 hover:text-gray-700"
                          title="Unpin from Homepage"
                        >
                          ✖
                        </button>
                      )}
                      {rev.status !== "rejected" && (
                         <button
                         onClick={() => handleReject(rev.id)}
                         className="action-btn text-yellow-600 hover:text-yellow-800"
                         title="Hide (Reject)"
                       >
                         ✗
                       </button>
                      )}
                      
                      <button
                        onClick={() => handleDelete(rev.id)}
                        className="action-btn text-red-600 hover:text-red-800"
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
    </div>
  );
};

export default AdminReviews;
