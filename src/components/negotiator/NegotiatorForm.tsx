import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { MakeModelFilter } from '../filters/MakeModelFilter';
import { YearFilter } from '../filters/YearFilter';
import { Info, Search, Sparkles } from 'lucide-react';
import { Tooltip } from '../Tooltip';

interface NegotiatorFormProps {
  onSearch: (filters: any) => void;
  buttonText?: string;
}

const MIN_MILEAGE = 0;
const MAX_MILEAGE = 200000;
const STEP = 5000;

export function NegotiatorForm({ onSearch, buttonText = "Launch Negotiation" }: NegotiatorFormProps) {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    yearFrom: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    mileageFrom: undefined as number | undefined,
    mileageTo: undefined as number | undefined,
  });

  const formatNumber = (value: string) => {
    const number = value.replace(/[^\d]/g, '');
    return number ? parseInt(number, 10) : undefined;
  };

  const formatMileage = (value: number) => {
    return `${(value / 1000).toFixed(0)}k km`;
  };

  const handleMileageChange = (values: number[]) => {
    setFilters(prev => ({
      ...prev,
      mileageFrom: values[0] === MIN_MILEAGE ? undefined : values[0],
      mileageTo: values[1] === MAX_MILEAGE ? undefined : values[1]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      make: filters.make || undefined,
      model: filters.model || undefined,
      yearFrom: filters.yearFrom,
      priceTo: filters.maxPrice,
      mileageFrom: filters.mileageFrom,
      mileageTo: filters.mileageTo,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Find Your Perfect Deal</h2>
          
          <div className="space-y-6">
            <MakeModelFilter
              make={filters.make}
              model={filters.model}
              onMakeChange={(value) => setFilters({ ...filters, make: value, model: '' })}
              onModelChange={(value) => setFilters({ ...filters, model: value })}
            />

            <YearFilter
              value={filters.yearFrom}
              onChange={(value) => setFilters({ ...filters, yearFrom: value })}
            />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Maximum Price
                </label>
                <Tooltip content="Set your budget limit for better negotiation leverage">
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
              <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/80">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={filters.maxPrice?.toLocaleString() || ''}
                    onChange={(e) => setFilters({ ...filters, maxPrice: formatNumber(e.target.value) })}
                    className="input-field pl-8"
                    placeholder="e.g., 25,000"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mileage Range
                </label>
                <Tooltip content="Filter cars based on their mileage range">
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                </Tooltip>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{formatMileage(filters.mileageFrom ?? MIN_MILEAGE)}</span>
                  <span>{formatMileage(filters.mileageTo ?? MAX_MILEAGE)}</span>
                </div>

                <div className="px-2">
                  <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    defaultValue={[MIN_MILEAGE, MAX_MILEAGE]}
                    min={MIN_MILEAGE}
                    max={MAX_MILEAGE}
                    step={STEP}
                    minStepsBetweenThumbs={STEP}
                    onValueChange={handleMileageChange}
                  >
                    <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
                      <Slider.Range className="absolute bg-teal-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="block w-5 h-5 bg-white shadow-md border border-gray-200 rounded-full 
                             hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 
                             focus:ring-offset-2 transition-all duration-200 cursor-grab active:cursor-grabbing"
                      aria-label="Minimum mileage"
                    />
                    <Slider.Thumb
                      className="block w-5 h-5 bg-white shadow-md border border-gray-200 rounded-full 
                             hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 
                             focus:ring-offset-2 transition-all duration-200 cursor-grab active:cursor-grabbing"
                      aria-label="Maximum mileage"
                    />
                  </Slider.Root>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/80">
                    <div className="relative">
                      <input
                        type="number"
                        value={filters.mileageFrom || ''}
                        onChange={(e) => {
                          const value = e.target.value ? parseInt(e.target.value) : undefined;
                          setFilters(prev => ({ ...prev, mileageFrom: value }));
                        }}
                        min={MIN_MILEAGE}
                        max={MAX_MILEAGE}
                        step={STEP}
                        placeholder="Min km"
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-12"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">km</span>
                    </div>
                  </div>
                  <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/80">
                    <div className="relative">
                      <input
                        type="number"
                        value={filters.mileageTo || ''}
                        onChange={(e) => {
                          const value = e.target.value ? parseInt(e.target.value) : undefined;
                          setFilters(prev => ({ ...prev, mileageTo: value }));
                        }}
                        min={MIN_MILEAGE}
                        max={MAX_MILEAGE}
                        step={STEP}
                        placeholder="Max km"
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-12"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full relative group overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 
                        group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:via-teal-400 
                        group-hover:to-teal-500 transition-all duration-500 rounded-2xl"></div>
          
          <div className="absolute inset-0 transform -translate-x-full group-hover:translate-x-full 
                        transition-transform duration-1000 bg-gradient-to-r from-transparent 
                        via-white/20 to-transparent rounded-2xl"></div>
          
          <div className="relative px-6 py-4 flex items-center justify-center gap-3">
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)]"></div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 blur-sm bg-white/30 rounded-full scale-150 animate-pulse"></div>
              <Sparkles className="w-6 h-6 text-white relative animate-bounce" />
            </div>
            
            <span className="text-white font-semibold text-lg tracking-wide 
                         drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">
              {buttonText}
            </span>
            
            <Search className="w-5 h-5 text-white/90 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          
          <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 
                       group-hover:scale-105 transition-all duration-300"></div>
        </button>
      </div>
    </form>
  );
}