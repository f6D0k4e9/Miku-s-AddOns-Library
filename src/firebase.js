// Global firebase instance loaded from script tag
const firebaseConfig = {
  apiKey: "AIzaSyCCkISqptK67rrBYQ...",
  authDomain: "miku-s-addon-library.firebaseapp.com",
  projectId: "miku-s-addon-library",
  storageBucket: "miku-s-addon-library.appspot.com",
  messagingSenderId: "997303978169",
  appId: "1:997303978169:web:221395...",
  measurementId: "G-25BNS9PK8Z"
};

// Initialize Firebase
if (!window.firebase.apps.length) {
  window.firebase.initializeApp(firebaseConfig);
}

export const auth = window.firebase.auth();
export const db = window.firebase.firestore();
export const googleProvider = new window.firebase.auth.GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google login failed:", error);
    return null;
  }
};

export const logoutUser = () => auth.signOut();
