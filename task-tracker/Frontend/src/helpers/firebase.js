// Import required Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqiA3whBjIdDf4Iko-UQs_etkgrPh6vWU",
  authDomain: "tasktracker-7ac94.firebaseapp.com",
  projectId: "tasktracker-7ac94",
  storageBucket: "tasktracker-7ac94.appspot.com", // fixed `.app` to `.com`
  messagingSenderId: "1057590762828",
  appId: "1:1057590762828:web:20fa885c44a59ced7fc3e9",
  measurementId: "G-2Z8PYN36ZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Firebase Auth and Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Export for use in Signup/Login components
export { auth, provider };
