// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-1bXt5kFZADVjCLJ1-Onyov8C7JtYkA8",
  authDomain: "artesao-b27ee.firebaseapp.com",
  projectId: "artesao-b27ee",
  storageBucket: "artesao-b27ee.firebasestorage.app",
  messagingSenderId: "74570059277",
  appId: "1:74570059277:web:f5c31a2a653883ebb78f44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;