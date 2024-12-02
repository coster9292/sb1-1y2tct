import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SearchRecord } from '../interfaces/search';

const getStorageKey = (userId: string) => `autoyard_search_history_${userId}`;

// Helper function to revive dates from JSON
const reviveDates = (item: any): SearchRecord => ({
  ...item,
  timestamp: new Date(item.timestamp)
});

export function useSearchHistory() {
  const { user } = useAuth();
  const [searchHistory, setSearchHistory] = useState<SearchRecord[]>(() => {
    if (!user) return [];

    try {
      const stored = localStorage.getItem(getStorageKey(user.id));
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed.map(reviveDates) : [];
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
    return [];
  });

  useEffect(() => {
    if (!user) return;

    try {
      localStorage.setItem(getStorageKey(user.id), JSON.stringify(searchHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }, [searchHistory, user]);

  const addSearch = (search: SearchRecord) => {
    if (!user) return;
    setSearchHistory(prev => [search, ...prev]);
  };

  const removeSearch = (id: string) => {
    if (!user) return;
    setSearchHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    if (!user) return;
    setSearchHistory([]);
  };

  return {
    searchHistory,
    addSearch,
    removeSearch,
    clearHistory
  };
}