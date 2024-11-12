import React from 'react';

interface TransmissionFilterProps {
  value?: string;
  onChange: (value: string) => void;
}

export function TransmissionFilter({ value, onChange }: TransmissionFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Transmission
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onChange('automatic')}
          className={`px-4 py-2 rounded-md border ${
            value === 'automatic'
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Automatic
        </button>
        <button
          type="button"
          onClick={() => onChange('manual')}
          className={`px-4 py-2 rounded-md border ${
            value === 'manual'
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Manual
        </button>
      </div>
    </div>
  );
}