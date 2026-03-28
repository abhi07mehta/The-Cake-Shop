import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAIgKhdR0vovtUzMUoIWQVrXjrNbjR7XmQ",
  authDomain: "the-cake-shop-e03cc.firebaseapp.com",
  projectId: "the-cake-shop-e03cc",
  storageBucket: "the-cake-shop-e03cc.firebasestorage.app",
  messagingSenderId: "860708705161",
  appId: "1:860708705161:web:3e091193373cd703814758"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
export default app;
