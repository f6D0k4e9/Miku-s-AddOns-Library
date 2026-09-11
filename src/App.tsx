import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth, db } from './services/firebase';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserProfile } from './types/user';

// Pages & Components
import { Home } from './pages/Home';
import { SearchPage } from './pages/SearchPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SettingsPage } from './pages/SettingsPage';
import { AddonDetail } from './pages/AddonDetail';
import { AuthModal } from './components/AuthModal';

export function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // 1. Handle mobile redirect sign-in result if the browser was redirected
    getRedirectResult(auth).catch((error: any) => {
      console.error('Redirect sign-in error:', error);
    });

    // 2. Listen to real-time Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: any) => {
      if (firebaseUser) {
        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          let profileData: UserProfile;

          if (userSnap.exists()) {
            profileData = userSnap.data() as UserProfile;
          } else {
            profileData = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'Minecraft Dev',
              email: firebaseUser.email || '',
              joinedDate: new Date().toISOString(),
            };
            await setDoc(userRef, profileData);
          }

          setUser(profileData);
        } catch (err: any) {
          console.error('Error syncing user data from Firestore:', err);
        }
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-sky-400 font-black text-sm">
        Loading MIK Addons...
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        {/* Main Content Router */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home user={user} onOpenAuth={() => setIsAuthOpen(true)} />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage user={user} onOpenAuth={() => setIsAuthOpen(true)} />} />
            <Route path="/settings" element={<SettingsPage user={user} setUser={setUser} onOpenAuth={() => setIsAuthOpen(true)} />} />
            <Route path="/addon/:slug" element={<AddonDetail />} />
          </Routes>
        </div>

        {/* Global Auth Modal */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={(profile) => {
            setUser(profile);
            setIsAuthOpen(false);
          }}
        />
      </div>
    </Router>
  );
}

export default App;
