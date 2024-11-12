import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Info } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface MileageFilterProps {
  minMileage?: number;
  maxMileage?: number;
  onChange: (minMileage: number | undefined, maxMileage: number | undefined) => void;
}

const MIN_MILEAGE = 0;
const MAX_MILEAGE = 200000;
const STEP = 5000;

export function MileageFilter({ minMileage, maxMileage, onChange }: MileageFilterProps) {
  // Set default values if undefined
  const defaultMinMileage = minMileage ?? MIN_MILEAGE;
  const defaultMaxMileage = maxMileage ?? MAX_MILEAGE;

  const handleSliderChange = (values: number[]) => {
    onChange(
      values[0] === MIN_MILEAGE ? undefined : values[0],
      values[1] === MAX_MILEAGE ? undefined : values[1]
    );
  };

  const formatMileage = (value: number) => {
    return `${(value / 1000).toFixed(0)}k km`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Mileage Range</h3>
        <Tooltip content="Filter cars based on their mileage range">
          <Info className="w-4 h-4 text-gray-400 cursor-help" />
        </Tooltip>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{formatMileage(defaultMinMileage)}</span>
          <span>{formatMileage(defaultMaxMileage)}</span>
        </div>

        <div className="px-2">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            defaultValue={[defaultMinMileage, defaultMaxMileage]}
            min={MIN_MILEAGE}
            max={MAX_MILEAGE}
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
                value={minMileage || ''}
                onChange={(e) => {
                  const value = e.target.value ? parseInt(e.target.value) : undefined;
                  onChange(value, maxMileage);
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
                value={maxMileage || ''}
                onChange={(e) => {
                  const value = e.target.value ? parseInt(e.target.value) : undefined;
                  onChange(minMileage, value);
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
  );
}