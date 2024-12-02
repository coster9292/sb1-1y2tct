import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { NegotiationItem } from '../interfaces/negotiations';

const getStorageKey = (userId: string) => `autoyard_negotiations_${userId}`;

// Helper function to revive dates from JSON
const reviveDates = (item: any): NegotiationItem => ({
  ...item,
  lastUpdated: new Date(item.lastUpdated),
  searchCriteria: {
    ...item.searchCriteria,
    timestamp: new Date(item.searchCriteria.timestamp)
  }
});

export function useNegotiations() {
  const [negotiations, setNegotiations] = useState<NegotiationItem[]>([]);
  const { user } = useAuth();

  // Load negotiations from localStorage on mount or when user changes
  useEffect(() => {
    if (!user) return;

    try {
      const stored = localStorage.getItem(getStorageKey(user.id));
      if (stored) {
        const parsed = JSON.parse(stored);
        const restored = Array.isArray(parsed) ? parsed.map(reviveDates) : [];
        setNegotiations(restored);
      }
    } catch (error) {
      console.error('Error loading negotiations:', error);
    }
  }, [user]);

  // Save negotiations to localStorage whenever they change
  useEffect(() => {
    if (!user) return;

    try {
      localStorage.setItem(getStorageKey(user.id), JSON.stringify(negotiations));
    } catch (error) {
      console.error('Error saving negotiations:', error);
    }
  }, [negotiations, user]);

  const addNegotiations = (newNegotiations: NegotiationItem[]) => {
    if (!user) return;

    setNegotiations(prev => {
      // Filter out any existing negotiations with the same car IDs
      const existingIds = new Set(newNegotiations.map(n => n.car.car_id));
      const filtered = prev.filter(n => !existingIds.has(n.car.car_id));
      return [...filtered, ...newNegotiations];
    });
  };

  const updateNegotiation = (carId: number, updates: Partial<NegotiationItem>) => {
    if (!user) return;

    setNegotiations(prev =>
      prev.map(item =>
        item.car.car_id === carId
          ? { ...item, ...updates, lastUpdated: new Date() }
          : item
      )
    );
  };

  const removeNegotiation = (carId: number) => {
    if (!user) return;

    setNegotiations(prev => prev.filter(item => item.car.car_id !== carId));
  };

  return {
    negotiations,
    addNegotiations,
    updateNegotiation,
    removeNegotiation
  };
}