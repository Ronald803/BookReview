// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQZwnkTa9W5xx9WRxZxFrLpBH_xUQb994",
  authDomain: "micomidafavorita-fd9be.firebaseapp.com",
  projectId: "micomidafavorita-fd9be",
  storageBucket: "micomidafavorita-fd9be.firebasestorage.app",
  messagingSenderId: "490252669156",
  appId: "1:490252669156:web:8a816a923a995d77abdcf1",
  measurementId: "G-NTM21JVNTM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
