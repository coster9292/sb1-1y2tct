import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getCarsByIds } from '../api/cars';
import { Car } from '../interfaces/car';
import { useNegotiations } from '../hooks/useNegotiations';

export function NegotiationsPage() {
  const { carIds } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNegotiations } = useNegotiations();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCars() {
      if (!carIds || !user) return;
      
      try {
        setLoading(true);
        setError(null);
        const ids = carIds.split(',').map(id => parseInt(id));
        const fetchedCars = await getCarsByIds(ids);
        setCars(fetchedCars);

        // Initialize negotiations with user context
        const negotiations = fetchedCars.map(car => ({
          car,
          status: 'pending',
          lastUpdated: new Date(),
          userId: user.id,
          searchCriteria: {
            id: `search_${Date.now()}`,
            timestamp: new Date(),
            filters: {},
            userId: user.id
          }
        }));

        addNegotiations(negotiations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cars');
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [carIds, user, addNegotiations]);

  // Rest of the component remains the same
}