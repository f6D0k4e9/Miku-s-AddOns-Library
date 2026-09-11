import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, Settings as SettingsIcon, LogOut, ShieldAlert, CheckCircle2, Globe, Headphones, Smartphone, X, Download, Flame, Layers } from 'lucide-react';
import { auth, loginWithGoogle, logoutUser } from './firebase';

// --- User Interface ---
interface UserProfile {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

// --- Sample Addon Data Structure ---
interface Addon {
  id: string;
  title: string;
  category: string;
  version: string;
  downloads: string;
  imageUrl: string;
}

const SAMPLE_ADDONS: Addon[] = [
  {
    id: '1',
    title: 'Custom Furniture Addon',
    category: 'Decor',
    version: 'v1.2.0',
    downloads: '12.5k',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    title: 'Advanced Vehicles Pack',
    category: 'Vehicles',
    version: 'v2.0.1',
    downloads: '8.9k',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    title: 'More Mobs & Bosses',
    category: 'Entities',
    version: 'v1.0.4',
    downloads: '24.1k',
    imageUrl: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=600&q=80',
  },
];

// --- Bottom Navigation Component ---
const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
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

// --- Home Page ---
const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Popular', 'Entities', 'Decor', 'Vehicles', 'WorldGen'];

  return (
    <div className="p-4 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Miku's AddOns</h1>
          <p className="text-xs text-zinc-400">Discover and download Minecraft addons</p>
        </div>
        <div className="w-9 h-9 rounded-2xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500 font-black text-xs">
          MC
        </div>
      </div>

      {/* Featured Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-900/60 via-zinc-900 to-zinc-900 p-5 border border-red-500/20">
        <div className="relative z-10 space-y-2 max-w-[220px]">
          <span className="inline-flex items-center space-x-1 bg-red-600/30 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
            <Flame className="w-3 h-3" />
            <span>Featured Release</span>
          </span>
          <h2 className="text-base font-black text-white leading-tight">Amethyst SMP Script Engine</h2>
          <p className="text-[11px] text-zinc-300">Custom economy, home teleports, and custom UI system.</p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 ${
              selectedCategory === cat
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Addons Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-red-500" />
            <span>Available Addons</span>
          </h3>
          <span className="text-[11px] text-zinc-500">{SAMPLE_ADDONS.length} Items</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {SAMPLE_ADDONS.map((addon) => (
            <div
              key={addon.id}
              className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-3 flex items-center space-x-3 hover:border-zinc-700 transition"
            >
              <img
                src={addon.imageUrl}
                alt={addon.title}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-zinc-800"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md border border-zinc-700/50">
                    {addon.category}
                  </span>
                  <span className="text-[10px] text-zinc-500">{addon.version}</span>
                </div>
                <h4 className="text-xs font-bold text-white truncate mt-1">{addon.title}</h4>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] text-zinc-400 flex items-center space-x-1">
                    <Download className="w-3 h-3 text-zinc-500" />
                    <span>{addon.downloads} downloads</span>
                  </span>
                  <button className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold px-3 py-1 rounded-lg transition active:scale-95">
                    Get
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
        placeholder="Search by mod link or name..."
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
