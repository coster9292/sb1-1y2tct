import React from 'react';
import { Clock } from 'lucide-react';
import { SearchCriteria } from '../../interfaces/negotiations';
import { NegotiationCard } from './NegotiationCard';
import { formatCarBrand, formatCarModel } from '../../utils/formatters';
import { NegotiationItem } from '../../interfaces/negotiations';

interface NegotiationGroupProps {
  criteria: SearchCriteria;
  items: NegotiationItem[];
}

export function NegotiationGroup({ criteria, items }: NegotiationGroupProps) {
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const formatSearchCriteria = (criteria: SearchCriteria) => {
    const parts = [];
    if (criteria.filters.make) parts.push(formatCarBrand(criteria.filters.make));
    if (criteria.filters.model) parts.push(formatCarModel(criteria.filters.model));
    if (criteria.filters.yearFrom) parts.push(`From ${criteria.filters.yearFrom}`);
    if (criteria.filters.priceTo) parts.push(`Up to €${formatNumber(criteria.filters.priceTo)}`);
    return parts.join(' • ');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Clock className="h-4 w-4" />
            <span>Search from {criteria.timestamp.toLocaleDateString()}</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {formatSearchCriteria(criteria)}
          </h2>
        </div>
      </div>

      <div className="grid gap-6">
        {items.map((item) => (
          <NegotiationCard
            key={item.car.car_id}
            negotiation={item}
          />
        ))}
      </div>
    </div>
  );
}