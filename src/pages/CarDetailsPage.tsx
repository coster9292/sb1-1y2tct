import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Info, MapPin, Fuel, Settings, Calendar, Activity } from 'lucide-react';
import { getCarById } from '../api/cars';
import { Car } from '../interfaces/car';
import { formatCarBrand, formatCarModel, formatCarVersion } from '../utils/formatters';
import { CarDetailsHeader } from '../components/car-details/CarDetailsHeader';
import { CarImage } from '../components/car-details/CarImage';
import { CarDetailItem } from '../components/car-details/CarDetailItem';

export function CarDetailsPage() {
  const { carId } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCar() {
      if (!carId) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await getCarById(parseInt(carId));
        setCar(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch car details');
        console.error('Error fetching car:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCar();
  }, [carId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-64 bg-gray-200 rounded-xl"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">
          {error || 'Car not found'}
        </div>
      </div>
    );
  }

  const formattedMake = formatCarBrand(car.make);
  const formattedModel = formatCarModel(car.model);
  const formattedVersion = car.version ? formatCarVersion(car.version) : '';
  const title = `${formattedMake} ${formattedModel}${formattedVersion ? ` (${formattedVersion})` : ''}`;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6">
          <CarDetailsHeader 
            title={title}
            adTitle={car.ad_title}
            redirectUrl={car.redirect_url}
          />

          <div className="max-w-3xl mx-auto">
            <CarImage imageUrl={car.image_url} title={title} />

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-4xl font-bold text-teal-600">
                  €{car.price.toLocaleString()}
                </p>
                <div className="text-sm text-gray-500">
                  Listed: {new Date(car.date_published).toLocaleDateString()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <CarDetailItem
                    icon={Info}
                    label="Make & Model"
                    value={`${formattedMake} ${formattedModel}`}
                  />
                  {car.version && (
                    <CarDetailItem
                      icon={Info}
                      label="Version"
                      value={formattedVersion}
                    />
                  )}
                  {car.mileage_km && (
                    <CarDetailItem
                      icon={Activity}
                      label="Mileage"
                      value={`${car.mileage_km.toLocaleString()} km`}
                    />
                  )}
                  {car.location && (
                    <CarDetailItem
                      icon={MapPin}
                      label="Location"
                      value={car.location}
                    />
                  )}
                  {car.fuel && (
                    <CarDetailItem
                      icon={Fuel}
                      label="Fuel Type"
                      value={car.fuel}
                    />
                  )}
                </div>

                <div className="space-y-4">
                  {car.transmission && (
                    <CarDetailItem
                      icon={Settings}
                      label="Transmission"
                      value={car.transmission}
                    />
                  )}
                  <CarDetailItem
                    icon={Calendar}
                    label="Year"
                    value={car.year}
                  />
                  {car.color && (
                    <CarDetailItem
                      icon={Info}
                      label="Color"
                      value={car.color}
                    />
                  )}
                  {car.doors && (
                    <CarDetailItem
                      icon={Info}
                      label="Doors"
                      value={car.doors}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}