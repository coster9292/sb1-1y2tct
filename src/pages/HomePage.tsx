import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { CarList } from '../components/CarList';
import { Filters, FilterOptions } from '../components/Filters';
import { searchCars } from '../api/cars';
import { Car } from '../types/car';

const ITEMS_PER_PAGE = 100;

export function HomePage() {
  const location = useLocation();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Parse URL parameters on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlFilters: FilterOptions = {};
    
    // Map URL parameters to filter options
    searchParams.forEach((value, key) => {
      if (key === 'yearFrom' || key === 'priceTo' || key === 'mileageFrom' || key === 'mileageTo') {
        urlFilters[key] = parseInt(value);
      } else {
        urlFilters[key] = value;
      }
    });

    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
      // Reset pagination and trigger search with URL filters
      setCars([]);
      setPage(1);
      setHasMore(true);
      fetchCars(false, urlFilters);
    }
  }, [location.search]);

  // Check if there are any active filters
  const hasActiveFilters = Object.values(filters).some(
    value => value !== undefined && value !== '' && value !== false
  );

  // Fetch cars with updated filters and page information
  const fetchCars = useCallback(
    async (isLoadMore = false, searchFilters = filters) => {
      try {
        setLoading(true);
        setError(null);

        const { cars: newCars, total } = await searchCars(
          '', 
          searchFilters,
          page,
          ITEMS_PER_PAGE
        );

        setCars(prevCars => (isLoadMore ? [...prevCars, ...newCars] : newCars));
        setTotalItems(total);
        setHasMore(page * ITEMS_PER_PAGE < total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cars');
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    },
    [filters, page]
  );

  // Fetch new results whenever filters or page change
  useEffect(() => {
    if (!location.search) { // Only fetch if not coming from URL params
      fetchCars(page > 1);
    }
  }, [fetchCars, page, location.search]);

  // Reset pagination and fetch new cars on search
  const handleSearch = () => {
    setCars([]);
    setPage(1);
    setHasMore(true);
    fetchCars(false);
  };

  // Handle filter change and reset pagination
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCars([]);
    setPage(1);
    setHasMore(true);
  };

  // Clear filters, reset results and pagination
  const handleClearFilters = () => {
    setFilters({});
    setCars([]);
    setPage(1);
    setHasMore(true);
  };

  // Load more results on scroll or button click
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Search className="h-8 w-8 text-teal-600" />
          <h1 className="text-3xl font-bold text-gray-900">Car Screener</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find your perfect car with our advanced search filters and comprehensive listings
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <Filters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
            totalResults={totalItems}
            onSearch={handleSearch}
          />
        </div>

        <div className="lg:w-3/4">
          <section id="car-listings">
            <CarList
              cars={cars}
              loading={loading}
              error={error}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              totalItems={totalItems}
            />
          </section>
        </div>
      </div>
    </main>
  );
}