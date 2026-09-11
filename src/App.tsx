import { useState, useEffect } from 'react';
import { auth, signInWithGoogle, logoutUser } from './services/firebase';
import { UserProfile } from './types/user';

// Mock Add-ons Data for your Library
const MOCK_ADDONS = [
  {
    id: '1',
    title: 'Miku Vocaloid UI & Audio Pack',
    category: 'UI / Sound',
    downloads: '14.2K',
    rating: '4.9',
    description: 'Replaces game sounds with classic Miku voice lines and adds a cyan holographic interface.',
    author: 'brstudios',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    title: 'Neon Cyberpunk Leek Weaponry',
    category: 'Weapons',
    downloads: '8.7K',
    rating: '4.7',
    description: 'Equip legendary glowing leek swords with custom particle trails and attack animations.',
    author: 'Heroic Productions',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    title: 'Amethyst SMP Utility HUD',
    category: 'Scripting API',
    downloads: '21.5K',
    rating: '5.0',
    description: 'Advanced JavaScript scripting add-on featuring custom teleportation, economy, and stats HUD.',
    author: 'Brent',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60',
  }
];

export function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'favorites' | 'settings'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // Safety timer for mobile web auth resolution
    const timer = setTimeout(() => setLoadingAuth(false), 1000);

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

  const handleLogin = async () => {
    const profile = await signInWithGoogle();
    if (profile) setUser(profile);
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  const filteredAddons = MOCK_ADDONS.filter(addon => {
    const matchesSearch = addon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          addon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || addon.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400 font-black text-sm tracking-widest animate-pulse">
        LOADING MIKU'S LIBRARY...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans select-none pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 font-bold text-lg">
            ♫
          </div>
          <h1 className="font-extrabold text-base tracking-wide bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            Miku's AddOns
          </h1>
        </div>

        <div>
          {user ? (
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
              <span className="text-xs font-semibold text-cyan-300">{(user.name || 'Dev').split(' ')[0]}</span>
              <button onClick={handleLogout} className="text-[10px] text-red-400 hover:text-red-300 ml-1">
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg shadow-cyan-500/20 transition-all"
            >
              Google Sign-In
            </button>
          )}
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-pink-950/40 border border-cyan-500/30 p-5">
              <div className="relative z-10">
                <span className="text-[10px] font-extrabold tracking-widest text-cyan-400 uppercase bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/40">
                  Featured Bedrock
                </span>
                <h2 className="text-xl font-black mt-2 text-white">Next-Gen Addons & Scripts</h2>
                <p className="text-xs text-slate-300 mt-1">Explore custom scripts, UI packs, and weapons crafted for Minecraft Bedrock.</p>
              </div>
            </div>

            {/* Search Bar */}
            <div>
              <input
                type="text"
                placeholder="Search add-ons, scripts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex space-x-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              {['All', 'UI / Sound', 'Weapons', 'Scripting API'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Addon Cards List */}
            <div className="space-y-3 mt-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available Add-ons</h3>
              {filteredAddons.map((addon) => (
                <div key={addon.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 flex space-x-3 items-center">
                  <img src={addon.image} alt={addon.title} className="w-16 h-16 rounded-xl object-cover border border-slate-700" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-cyan-400">{addon.category}</span>
                    <h4 className="font-bold text-sm truncate text-white">{addon.title}</h4>
                    <p className="text-[11px] text-slate-400 truncate">{addon.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-slate-500">⭐ {addon.rating} · 📥 {addon.downloads}</span>
                      <button className="bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-[11px] px-3 py-1 rounded-lg transition-colors border border-cyan-500/30">
                        Get
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black">Search Library</h2>
            <input
              type="text"
              placeholder="Type to search all files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <div className="text-center py-12 text-slate-500 text-xs">
              Showing search results for "{searchQuery}"
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black">Your Favorites</h2>
            {user ? (
              <div className="text-center py-12 text-slate-400 text-xs bg-slate-900/50 rounded-2xl border border-slate-800">
                You haven't favorited any add-ons yet!
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                <p className="mb-3">Sign in with Google to sync your favorites across devices.</p>
                <button onClick={handleLogin} className="bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs">
                  Sign In Now
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black">Settings</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">App Version</span>
                <span className="font-mono text-cyan-400 text-xs">v1.0.0-prod</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">SDK Status</span>
                <span className="font-mono text-emerald-400 text-xs">CDN Compat Active</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Developer</span>
                <span className="font-mono text-pink-400 text-xs">brstudios</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-lg border-t border-slate-800/80 px-6 py-2 flex justify-between items-center z-50">
        {[
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'search', label: 'Search', icon: '🔍' },
          { id: 'favorites', label: 'Saved', icon: '⭐' },
          { id: 'settings', label: 'Settings', icon: '⚙️' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
              activeTab === tab.id ? 'text-cyan-400 scale-105' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-[10px] font-bold mt-0.5">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
    
