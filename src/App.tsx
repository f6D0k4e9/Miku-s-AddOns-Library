import { useState } from 'react';
import { Home } from './pages/Home';
import { AddonDetail } from './pages/AddonDetail';
import { FloatingNav } from './components/FloatingNav';

export default function App() {
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black text-white px-4 py-3 pb-24 relative">
      {currentSlug === null ? (
        <Home onSelectAddon={(slug) => setCurrentSlug(slug)} />
      ) : (
        <AddonDetail
          slug={currentSlug}
          onBack={() => setCurrentSlug(null)}
          onSelectAddon={(slug) => setCurrentSlug(slug)}
        />
      )}

      <FloatingNav onHomeClick={() => setCurrentSlug(null)} />
    </div>
  );
}
