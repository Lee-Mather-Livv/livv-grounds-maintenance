import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ▼ Paste your Firebase config here (the entire object!)
const firebaseConfig = // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWrJhokZSmuMxBSBzVJh1fyLQVLYyxbCQ",
  authDomain: "livv-grounds-maintenance.firebaseapp.com",
  projectId: "livv-grounds-maintenance",
  storageBucket: "livv-grounds-maintenance.firebasestorage.app",
  messagingSenderId: "223654503801",
  appId: "1:223654503801:web:fd32393b2a901257317ba8",
  measurementId: "G-8HKHJ4WYSG"
};;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
