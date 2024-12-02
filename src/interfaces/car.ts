export interface Car {
  car_id: number;
  make: string;
  model: string;
  version?: string;
  price: number;
  location: string;
  fuel: string;
  transmission: string;
  color: string;
  doors: number;
  year: number;
  mileage_km?: number;
  ad_title: string;
  date_published: string;
  image_url?: string;
  ad_url?: string;
}