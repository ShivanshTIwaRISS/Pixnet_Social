// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCya76TjedSs3WFtSgWHuYAieRsccWkOm8",
  authDomain: "pixnet-1892f.firebaseapp.com",
  projectId: "pixnet-1892f",
  storageBucket: "pixnet-1892f.appspot.com", // <-- fix: no `.firebasestorage.app`
  messagingSenderId: "142105084932",
  appId: "1:142105084932:web:301a37c1f170bd4984e151",
  measurementId: "G-MK1PYBFXYL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
