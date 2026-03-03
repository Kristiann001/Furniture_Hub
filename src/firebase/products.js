// ============================================
// FIRESTORE PRODUCT HELPERS — Furniture Hub Kenya
// ============================================
// These helpers connect your product catalog to Firebase Firestore.
// Make sure to add your credentials to src/firebase/config.js first.

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const PRODUCTS_COLLECTION = "products";

/**
 * Fetch all products from Firestore.
 * @returns {Promise<Array>} Array of product objects (with id field)
 */
export const fetchProducts = async () => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Fetch products by category.
 * @param {string} category - Category id (e.g. "living-room")
 * @returns {Promise<Array>}
 */
export const fetchProductsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where("category", "==", category)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

/**
 * Fetch a single product by its Firestore document ID.
 * @param {string} id - Firestore document ID
 * @returns {Promise<Object|null>}
 */
export const fetchProduct = async (id) => {
  try {
    const ref = doc(db, PRODUCTS_COLLECTION, id);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

/**
 * Add a new product to Firestore.
 * @param {Object} productData - Product fields
 * @returns {Promise<string>} New document ID
 */
export const addProduct = async (productData) => {
  try {
    const ref = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return ref.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

/**
 * Update an existing product.
 * @param {string} id - Firestore document ID
 * @param {Object} updates - Fields to update
 */
export const updateProduct = async (id, updates) => {
  try {
    const ref = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

/**
 * Delete a product from Firestore.
 * @param {string} id - Firestore document ID
 */
export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

/**
 * Seed Firestore with the local product catalog (run once).
 * Import products from data/products.js and call this to populate Firestore.
 */
export const seedProducts = async (localProducts) => {
  try {
    const promises = localProducts.map((product) =>
      addDoc(collection(db, PRODUCTS_COLLECTION), {
        ...product,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    );
    await Promise.all(promises);
    console.log(`✅ Seeded ${localProducts.length} products to Firestore`);
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
};
