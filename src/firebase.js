// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlTeNflsVUl28Rkrfk2hcSNhb1y7iv_OI",
  authDomain: "furniturehub-dc031.firebaseapp.com",
  projectId: "furniturehub-dc031",
  storageBucket: "furniturehub-dc031.firebasestorage.app",
  messagingSenderId: "610666953219",
  appId: "1:610666953219:web:c67f93f078819e45e76c36",
  measurementId: "G-61KM3CFHMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
