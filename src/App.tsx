import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './services/firebase';
import { onAuthStateChanged, getRedirectResult, User as FirebaseUser } from 'firebase/auth';
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
    getRedirectResult(auth).then((result: any) => {
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
    }).catch((err: any) => console.error(err));

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
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
