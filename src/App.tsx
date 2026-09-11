import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Search, Heart, Settings as SettingsIcon, LogOut, ShieldAlert, CheckCircle2, Globe, Headphones, Smartphone, X, Download } from 'lucide-react';
import { auth, loginWithGoogle, logoutUser } from './firebase';
import { ADDONS_DATA } from './data/addons';
import { Header } from './components/Header';

// --- User Interface ---
interface UserProfile {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

// --- Dynamic Image Locator ---
const addonImages = import.meta.glob<{ default: string }>('/src/addons/*/*.{png,jpg,jpeg,webp}', { eager: true });

function getCoverForAddon(slug: string): string {
  const matchKey = Object.keys(addonImages).find((path) => path.includes(`/addons/${slug}/`));
  return matchKey ? addonImages[matchKey].default : `https://placehold.co/600x400/0ea5e9/ffffff?text=${slug}`;
}

// --- Bottom Navigation Component ---
const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/favorite', icon: Heart, label: 'Favorites' },
    { path: '/settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-900 py-2.5 px-6 flex justify-between items-center">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`p-3 rounded-2xl transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5" />
          </Link>
        );
      })}
    </nav>
  );
};

// --- Home Component ---
const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'Home' | 'For you'>('Home');
  const [currentSlide, setCurrentSlide] = useState(0);

  const featured = ADDONS_DATA[currentSlide] || ADDONS_DATA[0];

  const handleSelectAddon = (slug: string) => {
    window.location.hash = `#/addon/${slug}`;
  };

  return (
    <div className="p-4 space-y-4">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-950/80 via-zinc-900 to-zinc-900 border border-sky-500/20 rounded-2xl p-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center font-bold text-sky-400 text-xs">
            MA
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Upcoming official app soon</h4>
            <p className="text-[10px] text-zinc-400">Get the full experience when launched</p>
          </div>
        </div>
        <span className="bg-sky-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg">
          Soon
        </span>
      </div>

      {/* Carousel */}
      {featured && (
        <div className="space-y-2">
          <div
            onClick={() => handleSelectAddon(featured.slug)}
            className="group cursor-pointer relative aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-800 shadow-xl bg-zinc-900"
          >
            <img
              src={getCoverForAddon(featured.slug)}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end items-start space-y-1">
              <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase bg-sky-500 text-slate-950">
                {featured.category}
              </span>
              <h3 className="text-base font-black text-white tracking-wide">{featured.title}</h3>
            </div>
          </div>

          <div className="flex justify-center space-x-1.5 pt-1">
            {ADDONS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-6 bg-sky-500' : 'w-1.5 bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {ADDONS_DATA.map((addon) => (
          <div
            key={addon.id}
            onClick={() => handleSelectAddon(addon.slug)}
            className="group cursor-pointer bg-zinc-900/90 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-sky-500/50 transition duration-300"
          >
            <div className="relative aspect-[4/3] w-full bg-zinc-800 overflow-hidden">
              <img
                src={getCoverForAddon(addon.slug)}
                alt={addon.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
              <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-sky-400 transition">
                {addon.title}
              </h4>

              <div className="flex items-center justify-between pt-1">
                <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  {addon.category}
                </span>
                <div className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:bg-sky-500 group-hover:text-slate-950 transition">
                  <Download className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Search Page ---
const SearchPage = () => (
  <div className="p-4 space-y-4">
    <div className="relative">
      <input
        type="text"
        placeholder="Search by mod link..."
        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
      />
    </div>
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-2">
      <Search className="w-12 h-12 text-zinc-700" />
      <h3 className="text-sm font-bold text-white">No Matches Found</h3>
      <p className="text-xs text-zinc-500 max-w-xs">
        We couldn't find any content matching your search criteria.
      </p>
    </div>
  </div>
);

// --- Favorites Page ---
const FavoritesPage = ({ user, onOpenAuth }: { user: UserProfile | null; onOpenAuth: () => void }) => (
  <div className="p-4 space-y-4">
    <h1 className="text-xl font-black text-white">Favorites</h1>
    {!user ? (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
        <Heart className="w-12 h-12 text-zinc-700" />
        <h3 className="text-sm font-bold text-white">Login Required</h3>
        <p className="text-xs text-zinc-500 max-w-xs">
          Please log in to view your favorite mods.
        </p>
        <button
          onClick={onOpenAuth}
          className="bg-white text-black font-bold text-xs px-6 py-2.5 rounded-xl transition active:scale-95"
        >
          Sign In
        </button>
      </div>
    ) : (
      <p className="text-xs text-zinc-400">Your saved favorites will appear here.</p>
    )}
  </div>
);

// --- Settings Page ---
const SettingsPage = ({ user, setUser, onOpenAuth }: { user: UserProfile | null; setUser: (u: UserProfile | null) => void; onOpenAuth: () => void }) => {
  const handleSignOut = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-black text-white border-b border-zinc-900 pb-2">Settings</h2>

      {/* Account Info / Auth Box */}
      <div className="bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800 space-y-3">
        {user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border border-sky-400/40 object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              <div className="overflow-hidden">
                <h3 className="text-sm font-bold text-white truncate">{user.displayName || 'Logged In'}</h3>
                <p className="text-[11px] text-zinc-400 truncate max-w-[150px]">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl text-xs font-bold text-red-400 flex items-center space-x-1 transition active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 flex-shrink-0">
                <ShieldAlert className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Settings Access Restricted</h3>
                <p className="text-xs text-zinc-400 leading-snug mt-0.5">
                  You must be logged in to view and modify your account settings.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenAuth}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition active:scale-95"
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Language */}
      <div className="bg-zinc-900/90 rounded-2xl p-3.5 border border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-sky-400">
            <Globe className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white">Language</span>
        </div>
        <span className="text-xs font-semibold text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-lg border border-zinc-700/50">English</span>
      </div>

      {/* Support */}
      <div className="bg-zinc-900/90 rounded-2xl p-3.5 border border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-sky-400">
            <Headphones className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white">Support</span>
        </div>
        <span className="text-xs text-zinc-500">&gt;</span>
      </div>

      {/* App Banner */}
      <div className="bg-gradient-to-r from-sky-950/60 via-zinc-900 to-zinc-900 rounded-2xl p-3.5 border border-sky-500/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center font-black text-slate-950 text-sm shadow-md shadow-sky-500/20">
            MA
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center space-x-1">
              <Smartphone className="w-3.5 h-3.5 text-sky-400 inline" />
              <span>Download App</span>
            </h4>
            <p className="text-[10px] text-zinc-400">Get Miku AddOns app for Android</p>
          </div>
        </div>
        <span className="bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black px-2.5 py-1 rounded-lg">Coming Soon</span>
      </div>
    </div>
  );
};

// --- Auth Modal Component ---
const AuthModal = ({ isOpen, onClose, setUser }: { isOpen: boolean; onClose: () => void; setUser: (u: UserProfile | null) => void }) => {
  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    const loggedUser = await loginWithGoogle();
    if (loggedUser) {
      setUser(loggedUser);
      onClose();
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
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29B9.98 9.98 0 000 12c0 1.61.39 3.14 1.29 4.58l3.99-2.31z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 2.31c.95-2.83 3.6-4.14 6.72-4.14z"/>
          </svg>
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---
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
      <div className="min-h-screen bg-black text-white pb-20 font-sans selection:bg-red-600">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorite" element={<FavoritesPage user={user} onOpenAuth={() => setIsAuthModalOpen(true)} />} />
          <Route path="/settings" element={<SettingsPage user={user} setUser={setUser} onOpenAuth={() => setIsAuthModalOpen(true)} />} />
        </Routes>

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} setUser={setUser} />
        <BottomNav />
      </div>
    </Router>
  );
                }
