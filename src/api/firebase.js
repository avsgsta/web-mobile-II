// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhRMddvFY0tzZMEHZQcXkc8QFfPqvb9os",
    authDomain: "visitorcount-16b90.firebaseapp.com",
    projectId: "visitorcount-16b90",
    storageBucket: "visitorcount-16b90.firebasestorage.app",
    messagingSenderId: "94898370506",
    appId: "1:94898370506:web:57d3868da8704d79fc0133",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Ekspor Firestore functions
export { db, doc, getDoc, setDoc, updateDoc, collection, addDoc, auth, getDocs };
