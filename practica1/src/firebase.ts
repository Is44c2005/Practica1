// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_FTpHSgzJFGCgWMXD5KCzP8WLRoYbtEY",
  authDomain: "practica1-eab3a.firebaseapp.com",
  projectId: "practica1-eab3a",
  storageBucket: "practica1-eab3a.firebasestorage.app",
  messagingSenderId: "937934025072",
  appId: "1:937934025072:web:edb66b7146656492f25fb5",
  measurementId: "G-36NQB7VM5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
