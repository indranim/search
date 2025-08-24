import { useSearch } from '../contexts/SearchContext';
import { SearchResult } from './SearchResult';
import { Pagination } from './Pagination';
import { Loader2 } from 'lucide-react';

export function SearchResults() {
  const { results, isLoading, currentPage } = useSearch();

  const resultsPerPage = 10;
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedResults = results.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Searching...</span>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.485 0-4.73.967-6.43 2.54l2.339 2.13a.996.996 0 00.673.26h6.836a.996.996 0 00.673-.26l2.339-2.13A7.962 7.962 0 0112 15z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-600">Try adjusting your search terms or filters</p>
      </div>
    );
  }

  return (
    <div>
      {/* Results List */}
      <div className="space-y-6">
        {paginatedResults.map((result, index) => (
          <SearchResult
            key={result.id}
            result={result}
            index={startIndex + index + 1}
          />
        ))}
      </div>

      {/* Pagination */}
      {results.length > resultsPerPage && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalResults={results.length}
            resultsPerPage={resultsPerPage}
          />
        </div>
      )}
    </div>
  );
}