import { useState } from 'react';
import { ChevronDown, ChevronUp, RefreshCw, Info, Search } from 'lucide-react';
import { MakeModelFilter } from './filters/MakeModelFilter';
import { YearFilter } from './filters/YearFilter';
// import { PriceFilter } from './filters/PriceFilter';
import { PriceRangeFilter } from './filters/PriceRangeFilter';
import { MileageRangeFilter } from './filters/MileageRangeFilter';
import { LocationFilter } from './filters/LocationFilter';
import { TransmissionFilter } from './filters/TransmissionFilter';
import { FuelTypeFilter } from './filters/FuelTypeFilter';
// import { MileageFilter } from './MileageFilter';
import { Tooltip } from './Tooltip';

export interface FilterOptions {
  make?: string;
  model?: string;
  yearFrom?: number;
  minPrice?: number;
  maxPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  transmission?: string;
  fuel?: string;
  color?: string;
  doors?: string;
  location?: string;
  hasImage?: boolean;
}

interface FiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  totalResults?: number;
  onSearch: () => void;
}

export function Filters({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  hasActiveFilters,
  onSearch
}: FiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    if (key === 'make' && value !== filters.make) {
      onFilterChange({ ...filters, [key]: value || undefined, model: undefined });
    } else {
      onFilterChange({ ...filters, [key]: value || undefined });
    }
  };

  const handlePriceChange = (priceFrom: number | undefined, priceTo: number | undefined) => {
    onFilterChange({
      ...filters,
      minPrice: priceFrom,
      maxPrice: priceTo
    });
  };

  const handleMileageChange = (mileageFrom: number | undefined, mileageTo: number | undefined) => {
    onFilterChange({
      ...filters,
      minMileage: mileageFrom,
      maxMileage: mileageTo
    });
  };

  const hasAdvancedFilters = Boolean(
    filters.transmission ||
    filters.fuel ||
    filters.color ||
    filters.doors ||
    filters.location ||
    filters.hasImage
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 
                       bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-6">
          <MakeModelFilter
            make={filters.make}
            model={filters.model}
            onMakeChange={(value) => updateFilter('make', value)}
            onModelChange={(value) => updateFilter('model', value)}
          />

          <YearFilter
            value={filters.yearFrom}
            onChange={(value) => updateFilter('yearFrom', value)}
          />

          {/* <PriceFilter
            value={filters.priceTo}
            onChange={(value) => updateFilter('priceTo', value)}
          /> */}

          <PriceRangeFilter
            priceFrom={filters.minPrice}
            priceTo={filters.maxPrice}
            onChange={handlePriceChange}
          />

          <MileageRangeFilter
            mileageFrom={filters.minMileage}
            mileageTo={filters.maxMileage}
            onChange={handleMileageChange}
          />

        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium
                     text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors
                     duration-200 group"
        >
          <span className="flex items-center gap-2">
            Advanced Filters
            {hasAdvancedFilters && (
              <span className="bg-teal-50 text-teal-700 text-xs font-medium px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </span>
          <div className="transform transition-transform duration-200">
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </button>

        <div className={`space-y-6 transition-all duration-300 ${
          showAdvanced ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'
        }`}>
          <div className="pt-4 border-t border-gray-100">
            <LocationFilter
              value={filters.location}
              onChange={(value) => updateFilter('location', value)}
            />

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Transmission
                </label>
                <Tooltip content="Choose between automatic transmission for easier driving or manual transmission for more control">
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
              <TransmissionFilter
                value={filters.transmission}
                onChange={(value) => updateFilter('transmission', value)}
              />
            </div>

            <div className="mt-6">
              <FuelTypeFilter
                value={filters.fuel}
                onChange={(value) => updateFilter('fuel', value)}
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <select
                value={filters.color || ''}
                onChange={(e) => updateFilter('color', e.target.value)}
                className="select-field"
              >
                <option value="">All Colors</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="silver">Silver</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="grey">Grey</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Doors
              </label>
              <select
                value={filters.doors || ''}
                onChange={(e) => updateFilter('doors', e.target.value)}
                className="select-field"
              >
                <option value="">All</option>
                <option value="2">2 Doors</option>
                <option value="3">3 Doors</option>
                <option value="4">4 Doors</option>
                <option value="5">5 Doors</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasImage || false}
                  onChange={(e) => updateFilter('hasImage', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                            peer-focus:ring-teal-300 rounded-full peer 
                            peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                            peer-checked:after:border-white after:content-[''] after:absolute 
                            after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 
                            after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                            peer-checked:bg-teal-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-700">
                  Only show listings with images
                </span>
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={onSearch}
          className="w-full relative group overflow-hidden rounded-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-500 opacity-90 
                       group-hover:opacity-100 transition-opacity"></div>
          <div className="relative px-6 py-3 flex items-center justify-center gap-2">
            <Search className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Search Cars</span>
          </div>
        </button>
      </div>
    </div>
  );
}