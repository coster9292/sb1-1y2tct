import { useState, useEffect } from 'react';

interface MileageRangeFilterProps {
  mileageFrom?: number;
  mileageTo?: number;
  onChange: (mileageFrom: number | undefined, mileageTo: number | undefined) => void;
}

export function MileageRangeFilter({ mileageFrom, mileageTo, onChange }: MileageRangeFilterProps) {
  const MIN_MILEAGE = 0;
  const MAX_MILEAGE = 1000000; // 1 million kilometers
  const STEP = 10000;

  // Use internal state to fully control slider values
  const [range, setRange] = useState<[number, number]>([
    mileageFrom ?? MIN_MILEAGE,
    mileageTo ?? MAX_MILEAGE
  ]);

  // Update the range state if mileageFrom or mileageTo props change
  useEffect(() => {
    setRange([mileageFrom ?? MIN_MILEAGE, mileageTo ?? MAX_MILEAGE]);
  }, [mileageFrom, mileageTo]);



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Mileage Range
        </label>
        <div className="text-sm text-gray-500">
        {`${range[0]} - ${range[1]}`}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="number"
            value={range[0]}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : MIN_MILEAGE;
              const newRange: [number, number] = [Math.min(value, range[1]), range[1]];
              setRange(newRange);
              onChange(newRange[0], newRange[1]);
            }}
            min={MIN_MILEAGE}
            max={MAX_MILEAGE}
            step={STEP}
            placeholder="Min Mileage"
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
            min={MIN_MILEAGE}
            max={MAX_MILEAGE}
            step={STEP}
            placeholder="Max Mileage"
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
}
