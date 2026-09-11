// src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  signOut 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCkiSqptK67rrBYQRTRC54_PlpSanSVM0",
  authDomain: "miku-s-addon-library.firebaseapp.com",
  projectId: "miku-s-addon-library",
  storageBucket: "miku-s-addon-library.firebasestorage.app",
  messagingSenderId: "997303978169",
  appId: "1:997303978169:web:9257bd38ff9b61ecf1f368",
  measurementId: "G-4SZGJS9YE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Google Sign-In helper (with automatic mobile redirect fallback)
export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
      await signInWithRedirect(auth, googleProvider);
    } else {
      throw error;
    }
  }
};

export const logoutUser = () => signOut(auth);
