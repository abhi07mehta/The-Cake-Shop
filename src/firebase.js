import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB7nvIEvG_YBpc6RK5EDYdYkO2dlwJ-Oag",
    authDomain: "the-cake-shop-be95d.firebaseapp.com",
    projectId: "the-cake-shop-be95d",
    storageBucket: "the-cake-shop-be95d.appspot.com",
    messagingSenderId: "825073331662",
    appId: "1:825073331662:web:d88c74853f2a7b0d46cf9f",
    measurementId: "G-KJXWSNJJYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
export default app;
