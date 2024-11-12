import { Car } from '../types/car';
import axios from 'axios';

const API_BASE_URL = 'https://api.autoyard.eu/theparking-eu';
const MAX_ITEMS_PER_REQUEST = 100;

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
  query?: string;
  make?: string;
  model?: string;
  price_from?: number;
  price_to?: number;
  year_from?: number;
  year_to?: number;
  mileage_from?: number;
  mileage_to?: number;
  transmission?: string;
  fuel?: string;
  color?: string;
  doors?: number;
  location?: string;
  has_image?: boolean;
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
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== '') {
        // Map frontend filter names to API parameter names
        switch (key) {
          case 'maxMileage':
            acc.mileage_to = value;
            break;
          case 'yearFrom':
            acc.year_from = value;
            break;
          case 'priceTo':
            acc.price_to = value;
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
      `${API_BASE_URL}/list?limit=${limit}&offset=${offset}&order=crawled_at&order_type=DESC`,
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
      `${API_BASE_URL}/${carId}`,
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