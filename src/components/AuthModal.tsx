import React from 'react';
import { X } from 'lucide-react';
import { auth, signInWithGoogle } from '../services/firebase';
import { UserProfile } from '../types/user';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userProfile: UserProfile = {
          id: currentUser.uid,
          name: currentUser.displayName || 'Minecraft Dev',
          displayName: currentUser.displayName || 'Minecraft Dev',
          email: currentUser.email || '',
          photoURL: currentUser.photoURL || undefined,
          joinedDate: new Date().toISOString(),
        };
        onLoginSuccess(userProfile);
        onClose();
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 w-full max-w-sm relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-black text-white">Welcome Back</h2>
        <p className="text-xs text-zinc-400 mt-1 mb-6">Please sign in to continue</p>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-black font-black py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 transition active:scale-95 shadow-lg"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29B9.98 9.98 0 000 12c0 1.61.39 3.14 1.29 4.58l3.99-2.31z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 2.31c.95-2.83 3.6-4.14 6.72-4.14z" />
          </svg>
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
