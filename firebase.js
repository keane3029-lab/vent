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
  deleteDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqc8pEY4TBYeZbscn-B0oC8p-Gcg2khcs",
  authDomain: "jsdgbeojkdbk.firebaseapp.com",
  projectId: "jsdgbeojkdbk",
  storageBucket: "jsdgbeojkdbk.firebasestorage.app",
  messagingSenderId: "400417370986",
  appId: "1:400417370986:web:6994ece2cae619ef9eeb13"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  app, auth, db, storage,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile,
  collection, doc, setDoc, getDoc, getDocs, addDoc, query, orderBy, onSnapshot, updateDoc, deleteDoc, serverTimestamp,
  ref, uploadBytes, getDownloadURL
};
