import { MapPin, Fuel, Settings, Calendar, Activity, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ICar } from '../interfaces/ICar';
// import { formatCarBrand, formatCarModel, formatCarVersion } from '../utils/formatters';

interface CarCardProps {
  car: ICar;
}

export function CarCard({ car }: CarCardProps) {
  const navigate = useNavigate();

  const title = `${car.make} ${car.model}${car.version ? ` (${car.version})` : ''}`;


  const handleClick = () => {
    navigate(`/cars/${car.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white rounded-xl shadow-sm border border-gray-100
                 overflow-hidden transition-all duration-300 ease-in-out
                 hover:shadow-lg hover:border-gray-200 hover:-translate-y-1 cursor-pointer"
    >
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        {car.image_url ? (
          <img
            src={car.image_url}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-100">
            <ImageIcon className="h-12 w-12 text-gray-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-5">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-teal-600 transition-colors">
              {title}
            </h3>
            <p className="mt-2 text-2xl font-bold text-teal-600">
              €{car.price_eur}
            </p>
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-2.5">
            {car.mileage_km && (
              <div className="flex items-center gap-2.5 text-gray-600">
                <Activity className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{car.mileage_km} km</span>
              </div>
            )}
            {car.country_id && (
              <div className="flex items-center gap-2.5 text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{car.country_id}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-4">
              {car.fuel && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Fuel className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{car.fuel}</span>
                </div>
              )}
              {car.transmission && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Settings className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{car.transmission}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{car.year}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
