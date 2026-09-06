// firebase.js — Firebase setup for vent.
// Exports the initialized auth/db plus the SDK functions each page needs.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMkUfe-0ecuA1vEXlwAULi_iib6jjXDhc",
  authDomain: "secretvaultpro-c5b5e.firebaseapp.com",
  projectId: "secretvaultpro-c5b5e",
  storageBucket: "secretvaultpro-c5b5e.firebasestorage.app",
  messagingSenderId: "379592440524",
  appId: "1:379592440524:web:51057b5acf2f255750e069",
  measurementId: "G-JEEBH6TB75"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  app, auth, db,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile,
  collection, doc, setDoc, getDoc, getDocs, addDoc, query, orderBy, onSnapshot, updateDoc, serverTimestamp
};
