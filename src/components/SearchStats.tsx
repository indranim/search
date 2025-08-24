import { useSearch } from '../contexts/SearchContext';

export function SearchStats() {
  const { query, totalResults, searchTime, isLoading } = useSearch();

  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <p className="text-sm text-gray-600">
        About <span className="font-medium">{totalResults.toLocaleString()}</span> results 
        {query && <span> for "<span className="font-medium">{query}</span>"</span>}
        <span className="text-gray-400"> ({searchTime.toFixed(2)} seconds)</span>
      </p>
    </div>
  );
}