// Firestore Setup Helper
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const setupFirestoreDatabase = async () => {
  try {
    console.log("🔧 Setting up Firestore database...");

    // Test if we can write to the products collection
    const testProduct = {
      name: "Test Product - Delete Me",
      category: "living-room",
      woodType: "oak",
      price: "KSh 1,000",
      priceRaw: 1000,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      description: "This is a test product to verify Firestore connection",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "products"), testProduct);
    console.log("✅ Test product added successfully:", docRef.id);

    // Clean up the test product
    await deleteDoc(doc(db, "products", docRef.id));
    console.log("🧹 Test product cleaned up");

    return { success: true, message: "Firestore is properly configured!" };
  } catch (error) {
    console.error("❌ Firestore setup failed:", error);

    if (error.code === "permission-denied") {
      return {
        success: false,
        error: "PERMISSION_DENIED",
        message:
          "Firestore security rules are blocking access. Please update your rules.",
        solution: `🔥 FIRESTORE SETUP NEEDED:

1. Go to: https://console.firebase.google.com/project/furniturehub-dc031/firestore
2. Click "Create database" (if not created yet)
3. Choose "Start in test mode" for now
4. Or update your security rules to:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{documentId} {
      allow read, write: if true; // Temporary - allows all access
    }
  }
}`,
      };
    }

    return { success: false, error: error.message };
  }
};
