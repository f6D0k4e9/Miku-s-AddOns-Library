import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { AddonDetail } from './pages/AddonDetail';
import { SearchPage } from './pages/SearchPage';
import { Favorites } from './pages/Favorites';
import { Settings } from './pages/Settings';
import { FloatingNav, NavTab } from './components/FloatingNav';

// Dynamically resolve cover images from src/addons
const addonImages = import.meta.glob<{ default: string }>(
  '/src/addons/*/*.{png,jpg,jpeg,webp}',
  { eager: true }
);

function getCoverForAddon(slug: string): string {
  const matchKey = Object.keys(addonImages).find((path) =>
    path.includes(`/addons/${slug}/`)
  );
  return matchKey
    ? addonImages[matchKey].default
    : `https://placehold.co/600x400/0ea5e9/ffffff?text=${slug}`;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Favorites state with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('miku_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('miku_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  // Animated page transition handler
  const triggerTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 180);
  };

  const handleSelectAddon = (slug: string) => {
    triggerTransition(() => {
      setCurrentSlug(slug);
    });
  };

  const handleTabChange = (tab: NavTab) => {
    triggerTransition(() => {
      setCurrentSlug(null);
      setActiveTab(tab);
    });
  };

  const renderContent = () => {
    if (currentSlug !== null) {
      return (
        <AddonDetail
          slug={currentSlug}
          onBack={() => triggerTransition(() => setCurrentSlug(null))}
          onSelectAddon={handleSelectAddon}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      );
    }

    switch (activeTab) {
      case 'search':
        return (
          <SearchPage
            onSelectAddon={handleSelectAddon}
            getCoverForAddon={getCoverForAddon}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'favorites':
        return (
          <Favorites
            favorites={favorites}
            onSelectAddon={handleSelectAddon}
            onToggleFavorite={toggleFavorite}
            getCoverForAddon={getCoverForAddon}
          />
        );
      case 'settings':
        return (
          <Settings
            favoriteCount={favorites.length}
            onClearFavorites={() => setFavorites([])}
          />
        );
      case 'home':
      default:
        return <Home onSelectAddon={handleSelectAddon} />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen bg-slate-950 text-white px-4 sm:px-6 py-3 pb-24 relative overflow-x-hidden">
      {/* Animated Blur Wrapper */}
      <div
        className={`transition-all duration-300 ease-out ${
          isTransitioning
            ? 'opacity-40 blur-md scale-[0.98]'
            : 'opacity-100 blur-0 scale-100'
        }`}
      >
        {renderContent()}
      </div>

      {/* Floating Navigation Bar */}
      {currentSlug === null && (
        <FloatingNav activeTab={activeTab} setActiveTab={handleTabChange} />
      )}
    </div>
  );
}
