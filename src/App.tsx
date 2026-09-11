import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { UserProfile } from './types/user';

import { FloatingNav } from './FloatingNav';
import { AuthModal } from './AuthModal';

import { Home } from './Home';
import { AddonDetail } from './AddonDetail';
import { SearchPage } from './SearchPage';
import { FavoritesPage } from './FavoritesPage';
import { SettingsPage } from './SettingsPage';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((currentUser: any) => {
        if (currentUser) {
          setUser({
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
          });
        } else {
          setUser(null);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-sky-500 selection:text-slate-950">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addon/:slug" element={<AddonDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorite" element={<FavoritesPage user={user} onOpenAuth={() => setIsAuthModalOpen(true)} />} />
          <Route path="/settings" element={<SettingsPage user={user} setUser={setUser} onOpenAuth={() => setIsAuthModalOpen(true)} />} />
        </Routes>

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} setUser={setUser} />
        <FloatingNav />
      </div>
    </Router>
  );
}
