import React from 'react';

interface FuelTypeFilterProps {
  value?: string;
  onChange: (value: string) => void;
}

const FUEL_TYPES = [
  { value: 'gasoline', label: 'Gasoline' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'plugin_hybrid', label: 'Plug-in Hybrid' },
  { value: 'lpg', label: 'LPG' },
];

export function FuelTypeFilter({ value, onChange }: FuelTypeFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Fuel Type
      </label>
      <div className="grid grid-cols-2 gap-2">
        {FUEL_TYPES.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => onChange(type.value)}
            className={`px-4 py-2 rounded-md border ${
              value === type.value
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}