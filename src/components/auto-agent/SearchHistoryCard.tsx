import React from 'react';
import { SearchRecord } from '../../interfaces/search';
import { RotateCcw, Trash2, Clock, Search } from 'lucide-react';
import { formatCarBrand, formatCarModel } from '../../utils/formatters';

interface SearchHistoryCardProps {
  search: SearchRecord;
  onDelete: (id: string) => void;
  onRepeat: (filters: any) => void;
}

export function SearchHistoryCard({ search, onDelete, onRepeat }: SearchHistoryCardProps) {
  const formatNumber = (num: number | undefined) => {
    if (typeof num !== 'number') return '';
    return num.toLocaleString('en-US');
  };

  const formatSearchCriteria = (filters: SearchRecord['filters']) => {
    const parts = [];
    if (filters.make) parts.push(formatCarBrand(filters.make));
    if (filters.model) parts.push(formatCarModel(filters.model));
    if (filters.yearFrom) parts.push(`From ${filters.yearFrom}`);
    if (filters.priceTo) parts.push(`Up to €${formatNumber(filters.priceTo)}`);
    if (filters.maxMileage) parts.push(`Max ${formatNumber(filters.maxMileage)} km`);
    return parts.length > 0 ? parts.join(' • ') : 'All Cars';
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Clock className="h-4 w-4" />
            <span>{formatTimestamp(search.timestamp)}</span>
          </div>
          <p className="text-gray-900 font-medium">
            {formatSearchCriteria(search.filters)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Found {formatNumber(search.results)} matching vehicles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRepeat(search.filters)}
            className="p-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
            title="See Results"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(search.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Search"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}