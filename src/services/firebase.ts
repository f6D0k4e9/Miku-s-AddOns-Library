import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';
import { UserProfile } from '../types/user';

const firebaseConfig = {
  apiKey: "AIzaSyCCkiSqptK67rrBYQRTRC54_PlpSanSVM0",
  authDomain: "miku-s-addon-library.firebaseapp.com",
  projectId: "miku-s-addon-library",
  storageBucket: "miku-s-addon-library.firebasestorage.app",
  messagingSenderId: "997303978169",
  appId: "1:997303978169:web:9257bd38ff9b61ecf1f368",
  measurementId: "G-4SZGJS9YE8"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<UserProfile | null> => {
  try {
    let result;
    try {
      result = await signInWithPopup(auth, googleProvider);
    } catch (popupError) {
      // Fallback for mobile web environments where popups might be blocked
      await signInWithRedirect(auth, googleProvider);
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
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign-Out Error:', error);
  }
};
