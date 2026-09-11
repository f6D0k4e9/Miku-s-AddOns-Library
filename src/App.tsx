import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './services/firebase';
import { UserProfile } from './types/user';

// Your Actual Page Imports
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
    // 1-second fallback timer so mobile views never hang indefinitely
    const timer = setTimeout(() => setLoadingAuth(false), 1000);

    // Handle mobile redirect result if applicable
    if (auth && typeof auth.getRedirectResult === 'function') {
      auth.getRedirectResult().then((result: any) => {
        if (result && result.user) {
          const u = result.user;
          setUser({
            id: u.uid,
            name: u.displayName || 'Minecraft Dev',
            displayName: u.displayName || 'Minecraft Dev',
            email: u.email || '',
            photoURL: u.photoURL || undefined,
            joinedDate: new Date().toISOString(),
          });
        }
      }).catch((err: any) => console.error('Redirect auth error:', err));
    }

    if (auth && typeof auth.onAuthStateChanged === 'function') {
      const unsubscribe = auth.onAuthStateChanged((firebaseUser: any) => {
        clearTimeout(timer);
        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Minecraft Dev',
            displayName: firebaseUser.displayName || 'Minecraft Dev',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || undefined,
            joinedDate: new Date().toISOString(),
          });
        } else {
          setUser(null);
        }
        setLoadingAuth(false);
      });
      return () => {
        clearTimeout(timer);
        unsubscribe();
      };
    } else {
      clearTimeout(timer);
      setLoadingAuth(false);
    }
  }, []);

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400 font-black text-sm tracking-widest animate-pulse">
        LOADING MIKU'S LIBRARY...
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home user={user} onOpenAuth={() => setIsAuthOpen(true)} />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage user={user} onOpenAuth={() => setIsAuthOpen(true)} />} />
            <Route path="/settings" element={<SettingsPage user={user} setUser={setUser} onOpenAuth={() => setIsAuthOpen(true)} />} />
            <Route path="/addon/:slug" element={<AddonDetail />} />
          </Routes>
        </div>

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
