import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNegotiations } from '../hooks/useNegotiations';
import { getCarById } from '../api/cars';
import { Car } from '../interfaces/car';

// ... rest of the imports

export function ChatPage() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { negotiations, updateNegotiation } = useNegotiations();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchCar() {
      if (!carId || !user) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await getCarById(parseInt(carId));
        setCar(data);
        
        // Initialize chat with system message
        setMessages([{
          role: 'system',
          content: `Welcome to the negotiation for ${formatCarBrand(data.make)} ${formatCarModel(data.model)} (${data.year}). The current listing price is €${data.price.toLocaleString()}. How would you like to proceed with the negotiation?`,
          timestamp: new Date()
        }]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch car details');
      } finally {
        setLoading(false);
      }
    }

    fetchCar();
  }, [carId, user]);

  const handleSendMessage = (message: string) => {
    if (!message.trim() || !user || !car || !carId) return;

    const newMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    // Extract offer amount from message if present
    const offerMatch = message.match(/€?(\d+[,\d]*)/);
    const offerAmount = offerMatch ? parseInt(offerMatch[1].replace(/,/g, '')) : null;

    // Simulate AI response with user context
    setTimeout(() => {
      let responseContent = '';
      if (offerAmount) {
        const offerPercentage = (offerAmount / car.price) * 100;
        if (offerPercentage < 85) {
          responseContent = `Your offer of €${offerAmount.toLocaleString()} is quite low...`;
        } else if (offerPercentage < 90) {
          responseContent = `Your offer of €${offerAmount.toLocaleString()} is reasonable but...`;
        } else {
          responseContent = `Your offer of €${offerAmount.toLocaleString()} is competitive...`;
        }

        // Update negotiation status with user context
        updateNegotiation(parseInt(carId), {
          currentOffer: offerAmount,
          latestResponse: responseContent,
          status: 'active',
          userId: user.id
        });
      } else {
        responseContent = `Based on market analysis...`;
      }

      const response: Message = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  // Rest of the component remains the same
}