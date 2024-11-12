import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Car } from '../types/car';
import { CarCard } from './CarCard';
import { LoadMoreButton } from './LoadMoreButton';

interface CarListProps {
  cars: Car[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
  totalItems: number;
}

export function CarList({ 
  cars, 
  loading, 
  error, 
  hasMore,
  onLoadMore,
  totalItems
}: CarListProps) {
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

  const sortedCars = React.useMemo(() => {
    return [...cars].sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }, [cars, sortOrder]);

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  if (loading && cars.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-600">No cars found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-end">
        <button
          onClick={toggleSort}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 
                   bg-white border border-gray-200 rounded-lg hover:bg-gray-50 
                   transition-colors duration-200"
        >
          <ArrowUpDown className="w-4 h-4" />
          Price: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCars.map((car) => (
          <CarCard key={car.car_id} car={car} />
        ))}
      </div>

      {hasMore && (
        <LoadMoreButton 
          onClick={onLoadMore} 
          loading={loading}
        />
      )}
    </div>
  );
}