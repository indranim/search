import { useState, useRef, useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { Search, X } from 'lucide-react';

export function SearchHeader() {
  const { query, setQuery, suggestions, performSearch } = useSearch();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchTerm: string = inputValue) => {
    setQuery(searchTerm);
    performSearch(searchTerm);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(inputValue.toLowerCase()) && suggestion !== inputValue
  );

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">Search</span>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-2xl mx-8 relative" ref={suggestionsRef}>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyPress={handleKeyPress}
                placeholder="Search for products, services, and information..."
                className="w-full h-12 pl-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                {inputValue && (
                  <button
                    onClick={() => {
                      setInputValue('');
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
                <button
                  onClick={() => handleSearch()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputValue(suggestion);
                      handleSearch(suggestion);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              Advanced Search
            </button>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              Help
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}