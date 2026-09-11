// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
