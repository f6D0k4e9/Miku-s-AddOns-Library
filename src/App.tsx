import { useState } from 'react';
import { Home } from './pages/Home';
import { AddonDetail } from './pages/AddonDetail';
import { FloatingNav } from './components/FloatingNav';

export default function App() {
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Trigger page transition with a quick blur effect
  const handlePageChange = (slug: string | null) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlug(slug);
      // Remove blur after content updates
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 180);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black text-white px-4 py-3 pb-24 relative overflow-hidden">
      {/* Page Content wrapper with animated blur */}
      <div
        className={`transition-all duration-300 ease-out ${
          isTransitioning
            ? 'opacity-40 blur-md scale-[0.98]'
            : 'opacity-100 blur-0 scale-100'
        }`}
      >
        {currentSlug === null ? (
          <Home onSelectAddon={(slug) => handlePageChange(slug)} />
        ) : (
          <AddonDetail
            slug={currentSlug}
            onBack={() => handlePageChange(null)}
            onSelectAddon={(slug) => handlePageChange(slug)}
          />
        )}
      </div>

      <FloatingNav onHomeClick={() => handlePageChange(null)} />
    </div>
  );
}
