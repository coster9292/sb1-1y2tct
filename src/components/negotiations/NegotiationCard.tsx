import React from 'react';
import { MessageSquare, Link as LinkIcon } from 'lucide-react';
import { formatCarBrand, formatCarModel, formatCarVersion } from '../../utils/formatters';
import { NegotiationItem } from '../../interfaces/negotiations';
import { useNavigate } from 'react-router-dom';

interface NegotiationCardProps {
  negotiation: NegotiationItem;
}

export function NegotiationCard({ negotiation }: NegotiationCardProps) {
  const navigate = useNavigate();
  const { car, status, lastUpdated, currentOffer, latestResponse } = negotiation;

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'active':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'concluded':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Awaiting Response';
      case 'active':
        return 'Negotiation Active';
      case 'concluded':
        return 'Deal Concluded';
      case 'rejected':
        return 'Offer Rejected';
      default:
        return status;
    }
  };

  const formattedMake = formatCarBrand(car.make);
  const formattedModel = formatCarModel(car.model);
  const formattedVersion = car.version ? formatCarVersion(car.version) : '';
  const title = `${formattedMake} ${formattedModel}${formattedVersion ? ` (${formattedVersion})` : ''}`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="aspect-w-16 aspect-h-9 md:aspect-none md:h-full">
          {car.image_url ? (
            <img
              src={car.image_url}
              alt={title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center bg-gray-100 h-full">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        <div className="p-6 md:col-span-3">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeClass(status)}`}>
                  {getStatusText(status)}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-teal-600">
                  Listed: €{formatNumber(car.price)}
                </p>
                {currentOffer && (
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      Latest Price: €{formatNumber(currentOffer)}
                    </p>
                    {latestResponse && (
                      <p className="text-sm text-blue-600">
                        {latestResponse}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button
              className="btn-primary inline-flex items-center gap-2"
              onClick={() => navigate(`/chat/${car.car_id}`)}
            >
              <MessageSquare className="h-5 w-5" />
              Continue Chat
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {car.mileage_km && (
              <div className="text-gray-600">
                <span className="text-sm text-gray-500">Mileage</span>
                <p className="font-medium">{formatNumber(car.mileage_km)} km</p>
              </div>
            )}
            {car.year && (
              <div className="text-gray-600">
                <span className="text-sm text-gray-500">Year</span>
                <p className="font-medium">{car.year}</p>
              </div>
            )}
            {car.transmission && (
              <div className="text-gray-600">
                <span className="text-sm text-gray-500">Transmission</span>
                <p className="font-medium">{car.transmission}</p>
              </div>
            )}
            {car.fuel && (
              <div className="text-gray-600">
                <span className="text-sm text-gray-500">Fuel Type</span>
                <p className="font-medium">{car.fuel}</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleDateString()} at {lastUpdated.toLocaleTimeString()}
              </p>
              {car.ad_url && (
                <a
                  href={car.ad_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700"
                >
                  <LinkIcon className="h-4 w-4" />
                  View Original Listing
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}