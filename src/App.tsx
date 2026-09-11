import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Home as HomeIcon, Search, Heart, Settings as SettingsIcon, LogOut, ShieldAlert, CheckCircle2, Globe, Headphones, Smartphone, X, Download, ArrowLeft, ShieldCheck, Languages, Play } from 'lucide-react';
import { auth, loginWithGoogle, logoutUser } from './firebase';
import { ADDONS_DATA } from './data/addons';
import { Header } from './components/Header';

// --- User Interface ---
interface UserProfile {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

// --- Dynamic Image Locators ---
const addonImages = import.meta.glob<{ default: string }>('/src/addons/*/*.{png,jpg,jpeg,webp}', { eager: true });

function getCoverForAddon(slug: string): string {
  const matchKey = Object.keys(addonImages).find((path) => path.includes(`/addons/${slug}/`));
  return matchKey ? addonImages[matchKey].default : `https://placehold.co/600x400/0ea5e9/ffffff?text=${slug}`;
}

function getAddonFolderImages(slug: string): string[] {
  return Object.keys(addonImages)
    .filter((path) => path.includes(`/addons/${slug}/`))
    .map((path) => addonImages[path].default);
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
  const navigate = useNavigate();

  const featured = ADDONS_DATA[currentSlide] || ADDONS_DATA[0];

  const handleSelectAddon = (slug: string) => {
    navigate(`/addon/${slug}`);
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

// --- Addon Detail Component ---
const AddonDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isMediaChanging, setIsMediaChanging] = useState(false);

  const addon = ADDONS_DATA.find((item) => item.slug === slug) || ADDONS_DATA[0];
  const images = slug ? getAddonFolderImages(slug) : [];

  const handleMediaSwitch = (index: number) => {
    if (index === activeMediaIndex) return;
    setIsMediaChanging(true);
    setTimeout(() => {
      setActiveMediaIndex(index);
      setIsMediaChanging(false);
    }, 150);
  };

  const handleDownload = () => {
    if (addon?.downloadUrl) {
      window.open(addon.downloadUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!addon) return <div className="p-4 text-white">Addon not found.</div>;

  return (
    <div className="p-4 space-y-4">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
        <button onClick={() => navigate(-1)} className="flex items-center space-x-1 text-sky-400 font-bold text-xs">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center bg-zinc-900 rounded-full px-3 py-1 border border-zinc-800">
          <span className="text-[11px] font-bold text-sky-400">Upcoming official app soon</span>
          <span className="ml-2 bg-sky-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded">
            Soon
          </span>
        </div>
      </div>

      {/* Media Preview */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-black text-white">{addon.title}</h2>
          <p className="text-xs text-zinc-400">{addon.author}</p>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
          <div
            className={`w-full h-full transition-all duration-200 ease-out ${
              isMediaChanging ? 'opacity-30 blur-md scale-95' : 'opacity-100 blur-0 scale-100'
            }`}
          >
            {activeMediaIndex === 0 && addon.youtubeVideoId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${addon.youtubeVideoId}`}
                title={addon.title}
                allowFullScreen
              />
            ) : (
              <img
                src={images[activeMediaIndex - (addon.youtubeVideoId ? 1 : 0)] || `https://placehold.co/600x400/0ea5e9/ffffff?text=${addon.title}`}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {addon.youtubeVideoId && (
            <button
              onClick={() => handleMediaSwitch(0)}
              className={`flex-shrink-0 w-16 h-12 rounded-xl border-2 flex items-center justify-center bg-zinc-900 transition ${
                activeMediaIndex === 0 ? 'border-sky-500' : 'border-zinc-800'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white">
                <Play className="w-3 h-3 fill-current" />
              </div>
            </button>
          )}

          {images.map((imgSrc, idx) => {
            const indexValue = idx + (addon.youtubeVideoId ? 1 : 0);
            return (
              <button
                key={idx}
                onClick={() => handleMediaSwitch(indexValue)}
                className={`flex-shrink-0 w-16 h-12 rounded-xl border-2 overflow-hidden bg-zinc-900 transition ${
                  activeMediaIndex === indexValue ? 'border-sky-500' : 'border-zinc-800'
                }`}
              >
                <img src={imgSrc} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-b from-zinc-900 via-zinc-950 to-black rounded-3xl p-4 border border-zinc-800/80 space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
          {addon.category}
        </span>

        <h1 className="text-xl font-black text-white">{addon.title}</h1>

        <div className="flex items-center space-x-1.5 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Mod verified by <strong className="text-sky-400">{addon.verifiedBy}</strong></span>
        </div>

        <button
          onClick={handleDownload}
          className="w-full bg-white text-slate-950 py-3 rounded-2xl font-black text-sm flex items-center justify-center space-x-2 active:scale-95 transition"
        >
          <Download className="w-4 h-4 text-slate-950" />
          <span>Download</span>
        </button>

        <div className="pt-2 border-t border-zinc-800/80 space-y-2 text-xs">
          <div className="flex justify-between text-zinc-400">
            <span>File Size</span>
            <span className="font-bold text-white">{addon.fileSize}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Gallery</span>
            <span className="font-bold text-white">{images.length} Images</span>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800/80 space-y-3">
          <h3 className="text-sm font-black text-white">Description</h3>
          <button className="w-full py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-300 flex items-center justify-center space-x-2">
            <Languages className="w-3.5 h-3.5 text-sky-400" />
            <span>Translate</span>
          </button>
          <div className="space-y-1.5 text-xs text-zinc-300 leading-relaxed">
            {addon.description.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>

        {/* Suggested Mods */}
        <div className="pt-4 border-t border-zinc-800/80 space-y-3">
          <h3 className="text-xs font-black text-white flex items-center space-x-2">
            <span className="w-1 h-3 bg-sky-500 rounded-full"></span>
            <span>Suggested Mods</span>
          </h3>

          <div className="flex space-x-3 overflow-x-auto pb-2">
            {ADDONS_DATA.filter((a) => a.slug !== slug).map((mod) => (
              <div
                key={mod.slug}
                onClick={() => {
                  setActiveMediaIndex(0);
                  navigate(`/addon/${mod.slug}`);
                }}
                className="flex-shrink-0 w-32 bg-zinc-900/80 rounded-xl border border-zinc-800 overflow-hidden cursor-pointer hover:border-sky-500/50 transition active:scale-95"
              >
                <div className="p-2 space-y-1">
                  <h4 className="text-[11px] font-bold text-white truncate">{mod.title}</h4>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-sky-500/20 text-sky-400">
                    {mod.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
          <div className="w-10 h-10 rounded-xl bg
