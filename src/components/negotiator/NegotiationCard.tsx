import React from 'react';
import { Car } from '../../interfaces/car';
import { MapPin, Fuel, Settings, Calendar, Activity, BadgeCheck } from 'lucide-react';
import { formatCarBrand, formatCarModel, formatCarVersion } from '../../utils/formatters';

interface NegotiationCardProps {
  car: Car;
  isLowestPrice: boolean;
  onNegotiationToggle?: (carId: number, selected: boolean) => void;
  isSelected?: boolean;
  hideSelection?: boolean;
}

export function NegotiationCard({ 
  car, 
  isLowestPrice, 
  onNegotiationToggle, 
  isSelected,
  hideSelection = false 
}: NegotiationCardProps) {
  const formattedMake = formatCarBrand(car.make);
  const formattedModel = formatCarModel(car.model);
  const formattedVersion = car.version ? formatCarVersion(car.version) : '';
  const title = `${formattedMake} ${formattedModel}${formattedVersion ? ` (${formattedVersion})` : ''}`;

  const formatNumber = (num: number) => num.toLocaleString('en-US');

  return (
    <div className={`relative bg-white rounded-xl shadow-lg overflow-hidden
                   transition-all duration-300 hover:shadow-xl
                   ${isSelected ? 'border-2 border-teal-500' : 'border border-gray-100'}`}>
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {isLowestPrice && (
          <div className="flex items-center gap-1.5 bg-teal-500 text-white px-3 py-1.5 rounded-full
                        text-sm font-medium shadow-lg">
            <BadgeCheck className="w-4 h-4" />
            Best Price
          </div>
        )}
      </div>

      {!hideSelection && onNegotiationToggle && (
        <div className="absolute top-4 left-4 z-10">
          <div className="modern-checkbox">
            <input
              type="checkbox"
              id={`car-${car.car_id}`}
              checked={isSelected}
              onChange={(e) => onNegotiationToggle(car.car_id, e.target.checked)}
            />
            <label 
              htmlFor={`car-${car.car_id}`}
              className="checkbox-label"
            >
              Select for Negotiation
            </label>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="aspect-w-16 aspect-h-9 md:aspect-none md:h-full">
          {car.image_url ? (
            <img
              src={car.image_url}
              alt={title}
              className="object-cover w-full h-full md:absolute"
            />
          ) : (
            <div className="flex items-center justify-center bg-gray-100 h-full">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        <div className="p-6 md:col-span-2">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-2xl font-bold text-teal-600">€{formatNumber(car.price)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {car.mileage_km && (
              <div className="flex items-center gap-2 text-gray-600">
                <Activity className="h-4 w-4 text-gray-400" />
                <span>{formatNumber(car.mileage_km)} km</span>
              </div>
            )}
            {car.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{car.location}</span>
              </div>
            )}
            {car.fuel && (
              <div className="flex items-center gap-2 text-gray-600">
                <Fuel className="h-4 w-4 text-gray-400" />
                <span>{car.fuel}</span>
              </div>
            )}
            {car.transmission && (
              <div className="flex items-center gap-2 text-gray-600">
                <Settings className="h-4 w-4 text-gray-400" />
                <span>{car.transmission}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{car.year}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}