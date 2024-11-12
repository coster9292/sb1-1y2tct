import React from 'react';

interface YearRangeFilterProps {
  minYear?: number;
  maxYear?: number;
  onChange: (minYear: number | undefined, maxYear: number | undefined) => void;
}

export function YearRangeFilter({ minYear, maxYear, onChange }: YearRangeFilterProps) {
  const currentYear = new Date().getFullYear();
  const MIN_YEAR = 1960;
  
  // Generate year options from MIN_YEAR to current year
  const years = Array.from(
    { length: currentYear - MIN_YEAR + 1 }, 
    (_, i) => currentYear - i
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Year Range
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <select
            value={minYear || ''}
            onChange={(e) => onChange(
              e.target.value ? parseInt(e.target.value) : undefined,
              maxYear
            )}
            className="select-field"
          >
            <option value="">Min Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={maxYear || ''}
            onChange={(e) => onChange(
              minYear,
              e.target.value ? parseInt(e.target.value) : undefined
            )}
            className="select-field"
          >
            <option value="">Max Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}