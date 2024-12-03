import { TFuel } from './IFuel'
import { TTransmission } from './ITransmission'



export interface ICar {
  id: number;
  ad_url: string;
  ad_title: string;
  ad_text?: string;
  ad_date?: Date;
  make_id: any;
  make: string;
  model_id: any;
  model: string;
  version?: string;
  fuel?: TFuel;
  mileage_km?: number;
  power_kw?: number;
  engine_cc?: number;
  year?: number;
  transmission?: TTransmission;
  color?: string;
  doors?: number;
  country_id?: any;
  country?: string;
  price_eur?: number; // Use 'number' for NUMERIC(10, 2)
  image_url?: string;
  created_at: Date;
  scraper_table_row?: string;
}


export interface ICarSearchParams {
  ad_title_contains?: string;
  ad_text_contains?: string;
  ad_date_from?: string; // or Date if you prefer to handle dates as Date objects
  ad_date_to?: string; // or Date
  make_id?: number;
  model_id?: number;
  version?: string;
  fuel?: 'gasoline' | 'diesel' | 'electric' | 'hydrogen' | 'hybrid' | 'ethanol' | 'methanol' | 'solar' | 'LPG (Liquefied Petroleum Gas)' | 'NGV (Natural Gas Vehicle)' | 'CNG (Compressed Natural Gas)' | 'PHEV (Plug In Hybrid Electric Vehicle)' | 'DME (Dimethyl Ether)' | 'other';
  mileage_km_from?: number;
  mileage_km_to?: number;
  power_kw_from?: number;
  power_kw_to?: number;
  engine_cc_from?: number;
  engine_cc_to?: number;
  year_from?: number;
  year_to?: number;
  transmission?: 'manual' | 'automatic' | 'other';
  color?: string;
  doors?: string; // or number if you want to handle it as a number
  country?: string;
  price_EUR_from?: number;
  price_EUR_to?: number;
  has_image?: boolean;
}
