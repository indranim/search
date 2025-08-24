import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  contentType: string;
  lastModified: string;
  category: string;
  relevanceScore: number;
}

export interface SearchFilters {
  contentType: string[];
  dateRange: string;
  category: string[];
  sortBy: string;
}

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  isLoading: boolean;
  totalResults: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchTime: number;
  suggestions: string[];
  performSearch: (searchQuery?: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'Business Credit Cards - Compare & Apply Online',
    url: '/business/cards/credit-cards',
    snippet: 'Discover our range of business credit cards with competitive rates, rewards programs, and flexible payment options. Apply online today and get instant approval.',
    contentType: 'Product Page',
    lastModified: '2024-01-15',
    category: 'Business Banking',
    relevanceScore: 0.95
  },
  {
    id: '2',
    title: 'Business Credit Application Guide',
    url: '/business/credit/application-guide',
    snippet: 'Step-by-step guide to applying for business credit. Learn about requirements, documentation needed, and tips to improve your application success rate.',
    contentType: 'Guide',
    lastModified: '2024-01-10',
    category: 'Business Banking',
    relevanceScore: 0.88
  },
  {
    id: '3',
    title: 'Understanding Business Credit Scores',
    url: '/business/credit/credit-scores',
    snippet: 'Learn how business credit scores work, what factors affect your score, and strategies to improve your creditworthiness for better lending terms.',
    contentType: 'Article',
    lastModified: '2024-01-08',
    category: 'Education',
    relevanceScore: 0.82
  },
  {
    id: '4',
    title: 'Business Line of Credit vs Business Credit Card',
    url: '/business/credit/line-of-credit-vs-credit-card',
    snippet: 'Compare the benefits and drawbacks of business lines of credit versus business credit cards to determine which option best suits your business needs.',
    contentType: 'Comparison',
    lastModified: '2024-01-05',
    category: 'Business Banking',
    relevanceScore: 0.75
  },
  {
    id: '5',
    title: 'Business Credit Terms and Conditions',
    url: '/business/credit/terms-conditions',
    snippet: 'Review the complete terms and conditions for business credit products including interest rates, fees, payment schedules, and credit limits.',
    contentType: 'Legal Document',
    lastModified: '2023-12-20',
    category: 'Legal',
    relevanceScore: 0.68
  },
  {
    id: '6',
    title: 'Small Business Credit Solutions',
    url: '/small-business/credit-solutions',
    snippet: 'Tailored credit solutions for small businesses including merchant cash advances, equipment financing, and working capital loans.',
    contentType: 'Product Page',
    lastModified: '2024-01-12',
    category: 'Small Business',
    relevanceScore: 0.85
  }
];

const mockSuggestions = [
  'business credit cards',
  'business credit score',
  'business credit application',
  'business credit line',
  'business credit requirements'
];

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('business credit');
  const [results, setResults] = useState<SearchResult[]>(mockResults);
  const [filters, setFilters] = useState<SearchFilters>({
    contentType: [],
    dateRange: 'all',
    category: [],
    sortBy: 'relevance'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTime, setSearchTime] = useState(0.24);
  const [suggestions] = useState(mockSuggestions);

  const performSearch = (searchQuery?: string) => {
    setIsLoading(true);
    const searchTerm = searchQuery || query;
    
    // Simulate API call
    setTimeout(() => {
      let filteredResults = [...mockResults];
      
      if (searchTerm) {
        filteredResults = filteredResults.filter(result => 
          result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.snippet.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply filters
      if (filters.contentType.length > 0) {
        filteredResults = filteredResults.filter(result =>
          filters.contentType.includes(result.contentType)
        );
      }

      if (filters.category.length > 0) {
        filteredResults = filteredResults.filter(result =>
          filters.category.includes(result.category)
        );
      }

      // Apply sorting
      switch (filters.sortBy) {
        case 'relevance':
          filteredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
          break;
        case 'date':
          filteredResults.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
          break;
        case 'title':
          filteredResults.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }

      setResults(filteredResults);
      setSearchTime(Math.random() * 0.5 + 0.1);
      setIsLoading(false);
      setCurrentPage(1);
    }, 500);
  };

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [filters]);

  const totalResults = results.length;

  return (
    <SearchContext.Provider value={{
      query,
      setQuery,
      results,
      filters,
      setFilters,
      isLoading,
      totalResults,
      currentPage,
      setCurrentPage,
      searchTime,
      suggestions,
      performSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}