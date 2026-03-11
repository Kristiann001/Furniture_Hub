import { 
  collection, 
  addDoc, 
  getDocs,
  updateDoc,
  deleteDoc,
  doc, 
  query, 
  orderBy,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

const REVIEWS_COLLECTION = 'reviews';

// Customer submits a review (defaults to pending)
export const addReview = async (reviewData) => {
  try {
    const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), {
      ...reviewData,
      status: 'pending', // all new reviews require admin approval
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding review: ", error);
    return { success: false, error: error.message };
  }
};

// Fetch only pinned reviews for the home page (max 3)
// Note: We fetch all and filter client-side to avoid needing a composite index
export const getPinnedReviews = async () => {
  try {
    const q = query(
      collection(db, REVIEWS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const allReviews = querySnapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
    // Filter pinned client-side to avoid composite index requirement
    return allReviews.filter(r => r.status === 'pinned');
  } catch (error) {
    console.error("Error fetching pinned reviews: ", error);
    return [];
  }
};

// Admin fetches all reviews to moderate them
export const getAllReviews = async () => {
  try {
    const q = query(
      collection(db, REVIEWS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
  } catch (error) {
    console.error("Error fetching all reviews: ", error);
    return [];
  }
};

// Admin pins or rejects/unpins a review
export const updateReviewStatus = async (id, status) => {
  try {
    const reviewRef = doc(db, REVIEWS_COLLECTION, id);
    await updateDoc(reviewRef, { status });
    return { success: true };
  } catch (error) {
    console.error("Error updating review status: ", error);
    return { success: false, error: error.message };
  }
};

// Admin permanently deletes a spam or unwanted review
export const deleteReview = async (id) => {
  try {
    const reviewRef = doc(db, REVIEWS_COLLECTION, id);
    await deleteDoc(reviewRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting review: ", error);
    return { success: false, error: error.message };
  }
};
