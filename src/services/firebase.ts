import { UserProfile } from '../types/user';

// Access the global firebase object injected via CDN script tags in index.html
const firebase = (window as any).firebase;

const firebaseConfig = {
  apiKey: "AIzaSyCCkiSqptK67rrBYQRTRC54_PlpSanSVM0",
  authDomain: "miku-s-addon-library.firebaseapp.com",
  projectId: "miku-s-addon-library",
  storageBucket: "miku-s-addon-library.firebasestorage.app",
  messagingSenderId: "997303978169",
  appId: "1:997303978169:web:9257bd38ff9b61ecf1f368",
  measurementId: "G-4SZGJS9YE8"
};

// Initialize Firebase App if not already initialized
if (firebase && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase ? firebase.auth() : null;
const googleProvider = firebase ? new firebase.auth.GoogleAuthProvider() : null;

export const signInWithGoogle = async (): Promise<UserProfile | null> => {
  if (!auth || !googleProvider) {
    console.error('Firebase Auth is not initialized from CDN.');
    return null;
  }

  try {
    let result;
    try {
      result = await auth.signInWithPopup(googleProvider);
    } catch (popupError) {
      // Fallback for mobile views where popups get blocked
      await auth.signInWithRedirect(googleProvider);
      return null;
    }

    const user = result.user;
    return {
      id: user.uid,
      name: user.displayName || 'Minecraft Dev',
      displayName: user.displayName || 'Minecraft Dev',
      email: user.email || '',
      photoURL: user.photoURL || undefined,
      joinedDate: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    return null;
  }
};

export const logoutUser = async () => {
  if (!auth) return;
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Sign-Out Error:', error);
  }
};
