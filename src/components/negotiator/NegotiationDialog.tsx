import React, { useState } from 'react';
import { Car } from '../../types/car';
import { X, MessageSquare, Loader } from 'lucide-react';
import { formatCarBrand, formatCarModel } from '../../utils/formatters';

interface NegotiationDialogProps {
  car: Car;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function NegotiationDialog({ car, onClose }: NegotiationDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: `I'm interested in negotiating for the ${formatCarBrand(car.make)} ${formatCarModel(car.model)} (${car.year}) priced at €${car.price.toLocaleString()}.`
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    input.value = '';

    // Simulate AI response
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Based on market analysis, this ${formatCarBrand(car.make)} ${formatCarModel(car.model)} is priced slightly above average. I suggest offering €${(car.price * 0.9).toLocaleString()} as a starting point for negotiations.`
      }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Negotiation Assistant
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-4 ${
                  message.role === 'user'
                    ? 'bg-teal-500 text-white'
                    : message.role === 'system'
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-xl p-4">
                <Loader className="h-5 w-5 animate-spin text-gray-500" />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 border-t border-gray-100">
          <div className="flex gap-4">
            <input
              type="text"
              name="message"
              placeholder="Type your message..."
              className="flex-1 input-field"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}