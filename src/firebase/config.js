// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0Y1ACnac4Hx5qjZfuuD_3rWNl8epBl00",
  authDomain: "ksb-3d.firebaseapp.com",
  projectId: "ksb-3d",
  storageBucket: "ksb-3d.firebasestorage.app",
  messagingSenderId: "867853388665",
  appId: "1:867853388665:web:9c04a53b2fc3bd345dbda8",
  measurementId: "G-2NZL99RYWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, analytics, googleProvider };
export default app; 