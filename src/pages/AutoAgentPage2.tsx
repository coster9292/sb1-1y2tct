import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Car } from '../types/car';
import { SearchRecord } from '../types/search';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { useAuth } from '../contexts/AuthContext';
import { Bot, History, Trash2, BookMarked, Search } from 'lucide-react';
import { NegotiatorForm } from '../components/negotiator/NegotiatorForm';

interface SearchFilters {
  make?: string;
  model?: string;
  yearFrom?: number;
  priceTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
}

export function AutoAgentPage2() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { searchHistory, addSearch, removeSearch, clearHistory } = useSearchHistory();

  const handleSaveFilters = async (filters: SearchFilters) => {
    if (!user) return;

    try {
      setLoading(true);

      // Create a search record with the filters
      const searchRecord: SearchRecord = {
        id: uuidv4(),
        timestamp: new Date(),
        filters,
        results: 0, // We're not searching, so no results
        userId: user.id
      };

      addSearch(searchRecord);
    } catch (err) {
      console.error('Error saving filters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = (filters: SearchFilters) => {
    // Convert filters to URL search params
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });
    
    // Navigate to car screener with filters as URL parameters
    navigate(`/?${searchParams.toString()}`);
  };

  const formatSearchCriteria = (filters: SearchFilters): string => {
    const parts = [];
    if (filters.make) parts.push(filters.make.charAt(0).toUpperCase() + filters.make.slice(1));
    if (filters.model) parts.push(filters.model.charAt(0).toUpperCase() + filters.model.slice(1));
    if (filters.yearFrom) parts.push(`From ${filters.yearFrom}`);
    if (filters.priceTo) parts.push(`Up to €${filters.priceTo.toLocaleString()}`);
    if (filters.mileageFrom) parts.push(`Min ${filters.mileageFrom.toLocaleString()} km`);
    if (filters.mileageTo) parts.push(`Max ${filters.mileageTo.toLocaleString()} km`);
    return parts.join(' • ') || 'All Cars';
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-teal-200 rounded-lg blur-sm"></div>
            <Bot className="h-8 w-8 text-teal-600 relative" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Auto Agent</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Set up your search criteria and let our AI agent monitor the market for you
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <NegotiatorForm onSearch={handleSaveFilters} buttonText="Save Search Criteria" />
        </div>

        <div className="lg:col-span-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-teal-600" />
                <h2 className="text-lg font-semibold text-gray-900">Current Negotiations</h2>
              </div>
              {searchHistory.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-sm text-red-500 hover:text-red-700 flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </button>
              )}
            </div>

            {searchHistory.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-600">
                  Save your search criteria and we'll monitor the market for matching vehicles
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchHistory.map((search) => (
                  <div
                    key={search.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <History className="h-4 w-4" />
                          <span>{search.timestamp.toLocaleString()}</span>
                        </div>
                        <p className="text-gray-900 font-medium">
                          {formatSearchCriteria(search.filters)}
                        </p>
                        <p className="text-sm text-teal-600 mt-1">
                          Monitoring for new matches
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSearchClick(search.filters)}
                          className="p-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                          title="Search Now"
                        >
                          <Search className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => removeSearch(search.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove Search"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}