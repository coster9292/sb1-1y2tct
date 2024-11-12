import React from 'react';
import * as Slider from '@radix-ui/react-slider';

interface PriceRangeFilterProps {
  minPrice?: number;
  maxPrice?: number;
  onChange: (minPrice: number | undefined, maxPrice: number | undefined) => void;
}

export function PriceRangeFilter({ minPrice, maxPrice, onChange }: PriceRangeFilterProps) {
  const MIN_PRICE = 0;
  const MAX_PRICE = 1000000; // 1 million euros
  const STEP = 1000;

  // Set default values if undefined
  const defaultMinPrice = minPrice ?? MIN_PRICE;
  const defaultMaxPrice = maxPrice ?? MAX_PRICE;

  const handleSliderChange = (values: number[]) => {
    onChange(
      values[0] === MIN_PRICE ? undefined : values[0],
      values[1] === MAX_PRICE ? undefined : values[1]
    );
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Price Range
        </label>
        <div className="text-sm text-gray-500">
          {formatPrice(defaultMinPrice)} - {formatPrice(defaultMaxPrice)}
        </div>
      </div>

      <div className="px-2 py-4">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          defaultValue={[defaultMinPrice, defaultMaxPrice]}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={STEP}
          minStepsBetweenThumbs={STEP}
          onValueChange={handleSliderChange}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
            <Slider.Range className="absolute bg-teal-500 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-white shadow-md border border-gray-200 rounded-full 
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 
                     focus:ring-offset-2 transition-all duration-200 cursor-grab active:cursor-grabbing"
            aria-label="Minimum price"
          />
          <Slider.Thumb
            className="block w-5 h-5 bg-white shadow-md border border-gray-200 rounded-full 
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 
                     focus:ring-offset-2 transition-all duration-200 cursor-grab active:cursor-grabbing"
            aria-label="Maximum price"
          />
        </Slider.Root>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="number"
            value={minPrice || ''}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : undefined;
              onChange(value, maxPrice);
            }}
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={STEP}
            placeholder="Min Price"
            className="input-field"
          />
        </div>
        <div>
          <input
            type="number"
            value={maxPrice || ''}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : undefined;
              onChange(minPrice, value);
            }}
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={STEP}
            placeholder="Max Price"
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
}