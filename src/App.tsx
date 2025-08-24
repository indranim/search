import { useState } from 'react';
import { SearchProvider } from './contexts/SearchContext';
import { SearchHeader } from './components/SearchHeader';
import { SearchFilters } from './components/SearchFilters';
import { SearchResults } from './components/SearchResults';
import { SearchStats } from './components/SearchStats';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-50">
        <SearchHeader />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Filters
            </button>

            {/* Sidebar */}
            <div className={`
              fixed inset-0 z-40 lg:relative lg:inset-auto lg:z-auto
              ${sidebarOpen ? 'block' : 'hidden lg:block'}
            `}>
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="relative bg-white lg:bg-transparent w-80 h-full lg:w-64 lg:h-auto overflow-y-auto">
                <SearchFilters onClose={() => setSidebarOpen(false)} />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <SearchStats />
              <SearchResults />
            </div>
          </div>
        </div>
      </div>
    </SearchProvider>
  );
}

export default App;