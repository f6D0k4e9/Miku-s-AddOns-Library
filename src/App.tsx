import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './services/firebase';
import { UserProfile } from './types/user';

// Pages & Components
import { Home } from './pages/Home';
import { SearchPage } from './pages/SearchPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SettingsPage } from './pages/SettingsPage';
import { AddonDetail } from './pages/AddonDetail';
import { AuthModal } from './components/AuthModal';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class RouteErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Route crash:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-950/40 border border-red-500/50 text-red-200 m-4 rounded-xl font-mono text-xs overflow-auto">
          <p className="font-bold text-sm mb-2">🚨 Page Render Crash:</p>
          <pre className="whitespace-pre-wrap">{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // Safety fallback: Never let auth loading hang for more than 1.5 seconds
    const safetyTimer = setTimeout(() => {
      setLoadingAuth(false);
    }, 1500);

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
      }).catch((err: any) => console.error(err));
    }

    if (auth && typeof auth.onAuthStateChanged === 'function') {
      const unsubscribe = auth.onAuthStateChanged((firebaseUser: any) => {
        clearTimeout(safetyTimer);
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
        clearTimeout(safetyTimer);
        unsubscribe();
      };
    } else {
      clearTimeout(safetyTimer);
      setLoadingAuth(false);
    }
  }, []);

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-sky-400 font-black text-sm tracking-widest animate-pulse">
        LOADING MIKU'S LIBRARY...
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col">
        <div className="flex-1">
          <RouteErrorBoundary>
            <Routes>
              <Route path="/" element={<Home user={user} onOpenAuth={() => setIsAuthOpen(true)} />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/favorites" element={<FavoritesPage user={user} onOpenAuth={() => setIsAuthOpen(true)} />} />
              <Route path="/settings" element={<SettingsPage user={user} setUser={setUser} onOpenAuth={() => setIsAuthOpen(true)} />} />
              <Route path="/addon/:slug" element={<AddonDetail />} />
            </Routes>
          </RouteErrorBoundary>
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
