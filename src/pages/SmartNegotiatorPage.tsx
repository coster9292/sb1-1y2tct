import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { searchCars } from '../api/cars';
import { Car } from '../types/car';
import { SearchRecord } from '../types/search';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { useAuth } from '../contexts/AuthContext';
import { NegotiatorForm } from '../components/negotiator/NegotiatorForm';
import { NegotiationCard } from '../components/negotiator/NegotiationCard';
import { SparklesIcon, TrendingDown, MessageSquare } from 'lucide-react';

interface PriceStats {
  average: number;
  bestPrice: number;
  totalResults: number;
}

export function SmartNegotiatorPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCars, setSelectedCars] = useState<Set<number>>(new Set());
  const [priceStats, setPriceStats] = useState<PriceStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addSearch } = useSearchHistory();

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

  const handleSearch = async (filters: any) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      setSelectedCars(new Set());
      
      const { cars: results } = await searchCars('', filters, 1, 100);
      
      setPriceStats(calculatePriceStats(results));
      
      const sortedCars = [...results]
        .sort((a, b) => a.price - b.price)
        .slice(0, 5);

      setCars(sortedCars);

      // Add search to history with user context
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

  const handleNegotiationToggle = (carId: number, selected: boolean) => {
    setSelectedCars(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(carId);
      } else {
        newSet.delete(carId);
      }
      return newSet;
    });
  };

  const startNegotiations = () => {
    const selectedCarIds = Array.from(selectedCars);
    navigate(`/negotiations/${selectedCarIds.join(',')}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Rest of the component remains the same */}
    </main>
  );
}