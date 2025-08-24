import { SearchResult as SearchResultType } from '../contexts/SearchContext';
import { ExternalLink, Calendar, Tag } from 'lucide-react';

interface SearchResultProps {
  result: SearchResultType;
  index: number;
}

export function SearchResult({ result, index }: SearchResultProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 0.9) return 'bg-green-100 text-green-800';
    if (score >= 0.8) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <article className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium">#{index}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="capitalize">{result.contentType}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(result.relevanceScore)}`}>
            {Math.round(result.relevanceScore * 100)}% match
          </span>
        </div>
      </div>

      {/* Title and URL */}
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
          <a href={result.url} className="flex items-center gap-2">
            {result.title}
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </h2>
        <div className="text-sm text-green-700 hover:underline">
          {window.location.origin}{result.url}
        </div>
      </div>

      {/* Snippet */}
      <p className="text-gray-600 leading-relaxed mb-4">
        {result.snippet}
      </p>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>Updated {formatDate(result.lastModified)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag className="w-4 h-4" />
          <span>{result.category}</span>
        </div>
      </div>
    </article>
  );
}