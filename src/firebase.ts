// Declare global window property for Firebase CDN scripts loaded in index.html
declare global {
  interface Window {
    firebase: any;
  }
}

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "miku-s-addon-library.firebaseapp.com",
  projectId: "miku-s-addon-library",
  storageBucket: "miku-s-addon-library.appspot.com",
  messagingSenderId: "997303978169",
  appId: "YOUR_APP_ID",
  measurementId: "G-25BNS9PK8Z"
};

if (window.firebase && !window.firebase.apps.length) {
  window.firebase.initializeApp(firebaseConfig);
}

export const auth = window.firebase ? window.firebase.auth() : null;
export const db = window.firebase ? window.firebase.firestore() : null;
export const googleProvider = window.firebase ? new window.firebase.auth.GoogleAuthProvider() : null;

export const loginWithGoogle = async (): Promise<any> => {
  try {
    if (!auth || !googleProvider) return null;
    const result = await auth.signInWithPopup(googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google login failed:", error);
    return null;
  }
};

export const logoutUser = async (): Promise<void> => {
  if (auth) {
    await auth.signOut();
  }
};
