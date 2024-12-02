import React from 'react';
import { X, MapPin, Fuel, Settings, Calendar, Info, ArrowLeft, Activity, Image as ImageIcon } from 'lucide-react';
import { Car } from '../interfaces/car';
import { formatCarBrand, formatCarModel, formatCarVersion } from '../utils/formatters';

interface CarModalProps {
  car: Car;
  onClose: () => void;
}

export function CarModal({ car, onClose }: CarModalProps) {
  const formattedMake = formatCarBrand(car.make);
  const formattedModel = formatCarModel(car.model);
  const formattedVersion = car.version ? formatCarVersion(car.version) : '';

  const title = `${formattedMake} ${formattedModel}${formattedVersion ? ` (${formattedVersion})` : ''}`;

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <div className="absolute left-4 top-4 z-10">
            <button
              onClick={onClose}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </button>
          </div>
          
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          
          <div className="aspect-w-16 aspect-h-9">
            {car.image_url ? (
              <img
                src={car.image_url}
                alt={title}
                className="object-cover w-full h-full rounded-t-2xl"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center bg-gray-100 rounded-t-2xl">
                <ImageIcon className="h-16 w-16 text-gray-300" />
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-3xl font-bold text-teal-600 mb-6">€{car.price.toLocaleString()}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {car.mileage_km && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Activity className="h-5 w-5 text-gray-400" />
                  <span>{car.mileage_km.toLocaleString()} km</span>
                </div>
              )}
              {car.location && (
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>{car.location}</span>
                </div>
              )}
              {car.fuel && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Fuel className="h-5 w-5 text-gray-400" />
                  <span>{car.fuel}</span>
                </div>
              )}
              {car.transmission && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Settings className="h-5 w-5 text-gray-400" />
                  <span>{car.transmission}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span>{car.year}</span>
              </div>
            </div>

            <div className="space-y-4">
              {car.color && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Info className="h-5 w-5 text-gray-400" />
                  <span>Color: {car.color}</span>
                </div>
              )}
              {car.doors && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Info className="h-5 w-5 text-gray-400" />
                  <span>Doors: {car.doors}</span>
                </div>
              )}
              {car.version && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Info className="h-5 w-5 text-gray-400" />
                  <span>Version: {car.version}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-600">
                <Info className="h-5 w-5 text-gray-400" />
                <span>Listed: {new Date(car.date_published).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}