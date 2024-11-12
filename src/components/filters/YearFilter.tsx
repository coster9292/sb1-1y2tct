import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip } from '../Tooltip';

interface YearFilterProps {
  value?: number;
  onChange: (value: number | undefined) => void;
}

export function YearFilter({ value, onChange }: YearFilterProps) {
  const currentYear = new Date().getFullYear();
  const MIN_YEAR = 1960;
  
  // Generate year options from MIN_YEAR to current year
  const years = Array.from(
    { length: currentYear - MIN_YEAR + 1 }, 
    (_, i) => currentYear - i
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Minimum Year
          </label>
          <Tooltip content="Select the oldest manufacturing year you'd consider">
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
          </Tooltip>
        </div>
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : undefined)}
          className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Any Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
}