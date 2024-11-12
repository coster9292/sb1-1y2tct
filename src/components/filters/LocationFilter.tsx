import React from 'react';

interface LocationFilterProps {
  value?: string;
  onChange: (value: string) => void;
}

export function LocationFilter({ value, onChange }: LocationFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Location
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">All Locations</option>
        <option value="germany">Germany</option>
        <option value="france">France</option>
        <option value="italy">Italy</option>
        <option value="spain">Spain</option>
        <option value="uk">United Kingdom</option>
      </select>
    </div>
  );
}