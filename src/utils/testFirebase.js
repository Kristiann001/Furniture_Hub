// Firebase Connection Test
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const testFirebaseConnection = async () => {
  try {
    console.log('🔍 Testing Firebase connection...');
    console.log('📡 Firebase config:', {
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    });
    
    // Test basic Firestore connection
    const testCollection = collection(db, 'products');
    const snapshot = await getDocs(testCollection);
    
    console.log('✅ Firebase connection successful!');
    console.log(`📊 Found ${snapshot.docs.length} products in Firestore`);
    
    // Show first few products for debugging
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('📦 Sample products:', products.slice(0, 3));
    
    return { success: true, count: snapshot.docs.length, products };
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    console.error('Error details:', error.code, error.message);
    
    // Provide helpful error messages
    if (error.code === 'permission-denied') {
      console.error('🔒 Permission denied - Check Firestore security rules');
    } else if (error.code === 'unavailable') {
      console.error('🌐 Network error - Check internet connection');
    } else if (error.code === 'unauthenticated') {
      console.error('🔐 Authentication required - Check auth rules');
    }
    
    return { success: false, error: error.message };
  }
};
