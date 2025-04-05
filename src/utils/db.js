import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZAEzWTh7Q3kCmkmMa1sXjhek4yb8uWbY",
  authDomain: "mtm6404-contact-book-rea-6d6f6.firebaseapp.com",
  projectId: "mtm6404-contact-book-rea-6d6f6",
  storageBucket: "mtm6404-contact-book-rea-6d6f6.firebasestorage.app",
  messagingSenderId: "607108143746",
  appId: "1:607108143746:web:b8a50b1383e2209e35f29b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;