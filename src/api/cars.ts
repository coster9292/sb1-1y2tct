import { Car } from '../interfaces/car';
import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3138' : 'https://api.autoyard.eu';
const MAX_ITEMS_PER_REQUEST = 100;

console.log('process.env.NODE_ENV::', process.env.NODE_ENV);
console.log('API_BASE_URL::', API_BASE_URL);

interface ApiResponse {
  success: boolean;
  data: Car[];
  total: number;
  error?: string;
}

interface SingleCarResponse {
  success: boolean;
  data: Car;
  error?: string;
}

interface SearchParams {
  make?: string;
  model?: string;
  version?: string;
  location?: string;
  price_from?: number;
  price_to?: number;
  mileage_from?: number;
  mileage_to?: number;
  has_image?: boolean;
  fuel?: string;
  transmission?: string;
  color?: string;
  doors?: number;
  year_from?: number;
  year_to?: number;
  ad_title?: string;
  date_published_from?: string;
  date_published_to?: string;
}

export async function searchCars(
  query: string,
  filters: Record<string, any>,
  page: number,
  limit: number = MAX_ITEMS_PER_REQUEST
): Promise<{ cars: Car[]; total: number }> {
  try {
    const offset = (page - 1) * limit;

    // Clean up filters by removing undefined and empty values
    console.log('Filters:', filters);
    const cleanFilters = Object.entries(filters).reduce((acc: any, [key, value]) => {
      if (value !== undefined && value !== '') {
        // Map frontend filter names to API parameter names
        switch (key) {
          case 'yearFrom':
            acc.year_from = value;
            break;
          case 'minPrice':
            acc.price_from = value;
            break;
          case 'maxPrice':
            acc.price_to = value;
            break;
          case 'minMileage':
            acc.mileage_from = value;
            break;
          case 'maxMileage':
            acc.mileage_to = value;
            break;
          default:
            acc[key] = value;
        }
      }
      return acc;
    }, {} as SearchParams);

    console.log('Search params:', cleanFilters); // For debugging

    const searchParams = {
      ...cleanFilters,
      query: query || undefined,
    };

    const response = await axios.post<ApiResponse>(
      `${API_BASE_URL}/theparking-eu/list?limit=${limit}&offset=${offset}&order=crawled_at&order_type=DESC`,
      searchParams,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.error || 'API request was not successful');
    }

    // Ensure we have valid data
    const cars = response.data.data || [];
    const total = response.data.total || 0;

    // Log for debugging
    console.log(`Fetched ${cars.length} cars. Total available: ${total}`);

    return { cars, total };
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch cars');
  }
}

export async function getCarById(carId: number): Promise<Car> {
  try {
    const response = await axios.get<SingleCarResponse>(
      `${API_BASE_URL}/theparking-eu/${carId}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch car details');
    }

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching car ${carId}:`, error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch car details');
  }
}

export async function getCarsByIds(carIds: number[]): Promise<Car[]> {
  try {
    const promises = carIds.map(id => getCarById(id));
    const cars = await Promise.all(promises);
    return cars;
  } catch (error) {
    console.error('Error fetching multiple cars:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch car details');
  }
}