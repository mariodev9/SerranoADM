import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlpUKBBpI8224MLVylcQPLPbwo3fOQWPI",
  authDomain: "serrano-c7226.firebaseapp.com",
  projectId: "serrano-c7226",
  storageBucket: "serrano-c7226.appspot.com",
  messagingSenderId: "892925158992",
  appId: "1:892925158992:web:890b56f11f85717d071355",
  measurementId: "G-BFVNYFWVSP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth();
