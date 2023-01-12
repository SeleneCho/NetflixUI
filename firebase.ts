// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaNb5I9RG2wmGYkWRpE-S4ikKgZapEuxg",
  authDomain: "netflix-clone-f092d.firebaseapp.com",
  projectId: "netflix-clone-f092d",
  storageBucket: "netflix-clone-f092d.appspot.com",
  messagingSenderId: "857127205543",
  appId: "1:857127205543:web:de41e3bb658edbb5017982",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
