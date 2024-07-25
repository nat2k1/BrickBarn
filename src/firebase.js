// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics"; // Uncomment if using analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAj6ygThzr7swCGN838-czXHZjTKRld5g",
  authDomain: "vxh110-brickbarn.firebaseapp.com",
  projectId: "vxh110-brickbarn",
  storageBucket: "vxh110-brickbarn.appspot.com",
  messagingSenderId: "383063072910",
  appId: "1:383063072910:web:cc20916bb59d4cc38ae9df",
  measurementId: "G-TMGXTQYB43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Uncomment if using analytics

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export { db, auth };
