import { useState, useEffect } from 'react';
// import * as Slider from '@radix-ui/react-slider';

interface PriceRangeFilterProps {
  priceFrom?: number;
  priceTo?: number;
  onChange: (priceFrom: number | undefined, priceTo: number | undefined) => void;
}

export function PriceRangeFilter({ priceFrom, priceTo, onChange }: PriceRangeFilterProps) {
  const MIN_PRICE = 0;
  const MAX_PRICE = 1000000; // 1 million euros
  const STEP = 1000;

  // Use internal state to fully control slider values
  const [range, setRange] = useState<[number, number]>([
    priceFrom ?? MIN_PRICE,
    priceTo ?? MAX_PRICE
  ]);

  // Update the range state if priceFrom or priceTo props change
  useEffect(() => {
    setRange([priceFrom ?? MIN_PRICE, priceTo ?? MAX_PRICE]);
  }, [priceFrom, priceTo]);



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
          {formatPrice(range[0])} - {formatPrice(range[1])}
        </div>
      </div>

      {/* <div className="px-2 py-4">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={range}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={STEP}
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
      </div> */}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="number"
            value={range[0]}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : MIN_PRICE;
              const newRange: [number, number] = [Math.min(value, range[1]), range[1]];
              setRange(newRange);
              onChange(newRange[0], newRange[1]);
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
            value={range[1]}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : 0;
              const newRange: [number, number] = [range[0], Math.max(value)];
              // setRange(newRange);
              onChange(newRange[0], newRange[1]);
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
