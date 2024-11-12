import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip } from '../Tooltip';

interface MileageFilterProps {
  value?: number;
  onChange: (value: number | undefined) => void;
}

export function MileageFilter({ value, onChange }: MileageFilterProps) {
  const formatNumber = (value: string) => {
    // Remove non-numeric characters
    const number = value.replace(/[^\d]/g, '');
    const result = number ? parseInt(number, 10) : undefined;
    console.log("Formatted Mileage:", result); // Debug log for formatted mileage
    return result;
  };

  return (
    <div>
      {console.log("Current mileage filter value:", value)} {/* Debug log for prop value */}
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Maximum Mileage
        </label>
        <Tooltip content="Filter cars based on their total mileage">
          <Info className="w-4 h-4 text-gray-400 cursor-help" />
        </Tooltip>
      </div>
      <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/80">
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            value={value?.toLocaleString() || ''}
            onChange={(e) => {
              const formattedValue = formatNumber(e.target.value);
              console.log("Formatted Value:", formattedValue);  // Debug log for formatted value
              onChange(formattedValue);
            }}
            className="input-field pr-12"
            placeholder="e.g., 50,000"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">km</span>
        </div>
      </div>
    </div>
  );
}
