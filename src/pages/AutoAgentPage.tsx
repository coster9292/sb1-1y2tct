import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { searchCars } from '../api/cars';
import { Car } from '../types/car';
import { SearchRecord } from '../types/search';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { useAuth } from '../contexts/AuthContext';
import { Bot, TrendingDown, History, Trash2 } from 'lucide-react';
import { NegotiatorForm } from '../components/negotiator/NegotiatorForm';
import { NegotiationCard } from '../components/negotiator/NegotiationCard';

interface SearchFilters {
  make?: string;
  model?: string;
  yearFrom?: number;
  priceTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
}

interface PriceStats {
  average: number;
  bestPrice: number;
  totalResults: number;
}

export function AutoAgentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [priceStats, setPriceStats] = useState<PriceStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { searchHistory, addSearch, removeSearch, clearHistory } = useSearchHistory();

  const calculatePriceStats = (results: Car[]): PriceStats => {
    if (results.length === 0) return { average: 0, bestPrice: 0, totalResults: 0 };

    const total = results.reduce((sum, car) => sum + car.price, 0);
    const average = total / results.length;

    const sortedPrices = [...results].sort((a, b) => a.price - b.price);
    const percentileIndex = Math.floor(results.length * 0.01);
    const bestPrice = sortedPrices[percentileIndex]?.price || sortedPrices[0]?.price;

    return {
      average,
      bestPrice,
      totalResults: results.length
    };
  };

  const handleSearch = async (filters: SearchFilters) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { cars: results } = await searchCars('', filters, 1, 100);
      setPriceStats(calculatePriceStats(results));

      const sortedCars = [...results]
        .sort((a, b) => a.price - b.price)
        .slice(0, 5);

      setCars(sortedCars);

      const searchRecord: SearchRecord = {
        id: uuidv4(),
        timestamp: new Date(),
        filters,
        results: sortedCars.length,
        userId: user.id
      };

      addSearch(searchRecord);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(num);
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
          Let our AI agent monitor the market and negotiate the best deals for you
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <NegotiatorForm onSearch={handleSearch} />

          {priceStats && priceStats.totalResults > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-teal-600" />
                  Market Analysis
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Average Market Price</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(priceStats.average)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Top 1% Best Price</p>
                    <p className="text-2xl font-bold text-teal-600">
                      {formatNumber(priceStats.bestPrice)}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      Based on {priceStats.totalResults.toLocaleString()} listings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Analyzing market data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
              {error}
            </div>
          ) : cars.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Best Results</h2>
              {cars.map((car, index) => (
                <NegotiationCard
                  key={car.car_id}
                  car={car}
                  isLowestPrice={index === 0}
                  hideSelection={true}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <History className="h-5 w-5 text-teal-600" />
                  Search History
                </h2>
                {searchHistory.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-sm text-red-500 hover:text-red-700 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear History
                  </button>
                )}
              </div>

              {searchHistory.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-600">
                    Enter your criteria to find the best deals with AI-powered insights
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {searchHistory.map((search) => (
                    <div
                      key={search.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            {search.timestamp.toLocaleString()}
                          </p>
                          <p className="text-gray-900 mt-1">
                            Found {search.results} matching vehicles
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSearch(search.filters)}
                            className="p-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                          >
                            <History className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => removeSearch(search.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
          )}
        </div>
      </div>
    </main>
  );
}