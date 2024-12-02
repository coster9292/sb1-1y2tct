import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Fuel, Settings, Calendar, Activity, Info, ExternalLink } from 'lucide-react';
import { getCarById } from '../api/cars';
import { Car } from '../interfaces/car';
import { formatCarBrand, formatCarModel, formatCarVersion } from '../utils/formatters';

export function CarListingPage() {
  const { carId } = useParams();
  const navigate = useNavigate();
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
          <div className="h-96 bg-gray-200 rounded-xl"></div>
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
      <button
        onClick={() => navigate(-1)}
        className="mb-8 btn-secondary inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Search
      </button>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {car.ad_url && (
              <a
                href={car.ad_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View Full Ad
              </a>
            )}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 bg-gray-50 rounded-xl overflow-hidden mb-8">
              {car.image_url ? (
                <img
                  src={car.image_url}
                  alt={title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <p className="text-4xl font-bold text-teal-600">
                €{car.price.toLocaleString()}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
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

                <div className="space-y-6">
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
      </div>
    </main>
  );
}