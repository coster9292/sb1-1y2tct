export type NegotiationStatus = 'pending' | 'active' | 'concluded' | 'rejected';

export interface SearchCriteria {
  id: string;
  timestamp: Date;
  filters: {
    make?: string;
    model?: string;
    yearFrom?: number;
    priceTo?: number;
  };
  userId: string;
}

export interface NegotiationItem {
  car: Car;
  status: NegotiationStatus;
  lastUpdated: Date;
  currentOffer?: number;
  searchCriteria: SearchCriteria;
  latestResponse?: string;
  userId: string;
}

export interface GroupedNegotiations {
  criteria: SearchCriteria;
  items: NegotiationItem[];
}