export interface SearchFilters {
  make?: string;
  model?: string;
  yearFrom?: number;
  priceTo?: number;
  maxMileage?: number;
}

export interface SearchRecord {
  id: string;
  timestamp: Date;
  filters: SearchFilters;
  results: number;
  userId: string;
}

export interface MarketStats {
  totalResults: number;
  averagePrice: number;
  bestPrice: number;
}