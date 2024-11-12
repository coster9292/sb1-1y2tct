import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip } from '../Tooltip';

interface PriceFilterProps {
  value?: number;
  onChange: (value: number | undefined) => void;
}

export function PriceFilter({ value, onChange }: PriceFilterProps) {
  const formatNumber = (value: string) => {
    // Remove non-numeric characters
    const number = value.replace(/[^\d]/g, '');
    return number ? parseInt(number, 10) : undefined;
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Maximum Price
        </label>
        <Tooltip content="Set your budget limit for better search results">
          <Info className="w-4 h-4 text-gray-400 cursor-help" />
        </Tooltip>
      </div>
      <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/80">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">€</span>
          <input
            type="text"
            inputMode="numeric"
            value={value?.toLocaleString() || ''}
            onChange={(e) => onChange(formatNumber(e.target.value))}
            className="input-field pl-8"
            placeholder="e.g., 25,000"
          />
        </div>
      </div>
    </div>
  );
}