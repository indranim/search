import { useSearch } from '../contexts/SearchContext';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-medium text-gray-900">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
}

interface FilterCheckboxProps {
  label: string;
  count?: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function FilterCheckbox({ label, count, checked, onChange }: FilterCheckboxProps) {
  return (
    <label className="flex items-center py-2 cursor-pointer hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span className="ml-3 text-sm text-gray-700 flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-gray-500">({count})</span>
      )}
    </label>
  );
}

export function SearchFilters({ onClose }: { onClose: () => void }) {
  const { filters, setFilters } = useSearch();

  const handleContentTypeChange = (contentType: string, checked: boolean) => {
    const newContentTypes = checked
      ? [...filters.contentType, contentType]
      : filters.contentType.filter(type => type !== contentType);
    
    setFilters({ ...filters, contentType: newContentTypes });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.category, category]
      : filters.category.filter(cat => cat !== category);
    
    setFilters({ ...filters, category: newCategories });
  };

  const clearAllFilters = () => {
    setFilters({
      contentType: [],
      dateRange: 'all',
      category: [],
      sortBy: 'relevance'
    });
  };

  const hasActiveFilters = filters.contentType.length > 0 || 
                          filters.category.length > 0 || 
                          filters.dateRange !== 'all';

  return (
    <div className="bg-white lg:bg-transparent h-full flex flex-col">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-0">
          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mb-6">
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Sort By */}
          <FilterSection title="Sort By">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="relevance">Relevance</option>
              <option value="date">Date (Newest)</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </FilterSection>

          {/* Content Type */}
          <FilterSection title="Content Type">
            <div className="space-y-1">
              {[
                { label: 'Product Page', count: 8 },
                { label: 'Article', count: 12 },
                { label: 'Guide', count: 5 },
                { label: 'Comparison', count: 3 },
                { label: 'Legal Document', count: 7 },
                { label: 'FAQ', count: 15 }
              ].map(({ label, count }) => (
                <FilterCheckbox
                  key={label}
                  label={label}
                  count={count}
                  checked={filters.contentType.includes(label)}
                  onChange={(checked) => handleContentTypeChange(label, checked)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Date Range */}
          <FilterSection title="Date Range">
            <div className="space-y-2">
              {[
                { value: 'all', label: 'Any time' },
                { value: 'week', label: 'Past week' },
                { value: 'month', label: 'Past month' },
                { value: 'quarter', label: 'Past 3 months' },
                { value: 'year', label: 'Past year' }
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center py-2 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="dateRange"
                    value={value}
                    checked={filters.dateRange === value}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Category */}
          <FilterSection title="Category">
            <div className="space-y-1">
              {[
                { label: 'Business Banking', count: 18 },
                { label: 'Personal Banking', count: 24 },
                { label: 'Loans & Credit', count: 16 },
                { label: 'Insurance', count: 9 },
                { label: 'Investment', count: 12 },
                { label: 'Education', count: 8 },
                { label: 'Legal', count: 5 },
                { label: 'Small Business', count: 14 }
              ].map(({ label, count }) => (
                <FilterCheckbox
                  key={label}
                  label={label}
                  count={count}
                  checked={filters.category.includes(label)}
                  onChange={(checked) => handleCategoryChange(label, checked)}
                />
              ))}
            </div>
          </FilterSection>
        </div>
      </div>
    </div>
  );
}