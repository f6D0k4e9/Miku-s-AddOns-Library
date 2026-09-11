import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Your Page Imports
import { Home } from './pages/Home';
import { SearchPage } from './pages/SearchPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SettingsPage } from './pages/SettingsPage';
import { AddonDetail } from './pages/AddonDetail';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col selection:bg-cyan-500 selection:text-black">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/addon/:slug" element={<AddonDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
