import React from 'react';
import { useNegotiations } from '../hooks/useNegotiations';
import { NegotiationGroup } from '../components/negotiations/NegotiationGroup';
import { GroupedNegotiations } from '../interfaces/negotiations';

export function CurrentNegotiationsPage() {
  const { negotiations } = useNegotiations();

  // Group negotiations by search criteria ID
  const groupedNegotiations = negotiations.reduce((acc, item) => {
    const criteriaId = item.searchCriteria.id;
    if (!acc[criteriaId]) {
      acc[criteriaId] = {
        criteria: item.searchCriteria,
        items: []
      };
    }
    acc[criteriaId].items.push(item);
    return acc;
  }, {} as Record<string, GroupedNegotiations>);

  // Sort groups by timestamp (newest first)
  const sortedGroups = Object.values(groupedNegotiations).sort((a, b) => 
    b.criteria.timestamp.getTime() - a.criteria.timestamp.getTime()
  );

  if (negotiations.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Active Negotiations</h2>
          <p className="text-gray-600">
            Start a new negotiation using the Smart Negotiator to see your campaigns here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Current Negotiations
          </h1>
          <p className="text-lg text-gray-600">
            Track and manage your ongoing negotiations
          </p>
        </div>

        <div className="space-y-12">
          {sortedGroups.map((group) => (
            <NegotiationGroup
              key={group.criteria.id}
              criteria={group.criteria}
              items={group.items}
            />
          ))}
        </div>
      </div>
    </main>
  );
}