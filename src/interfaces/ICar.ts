import { TFuel } from './IFuel'
import { TTransmission } from './ITransmission'



export interface ICar {
    id: number;
    ad_url: string;
    ad_title: string;
    ad_text?: string;
    ad_date?: Date;
    make_id: number;
    model_id: number;
    version?: string;
    fuel?: TFuel;
    mileage_km?: number;
    power_kw?: number;
    engine_cc?: number;
    year?: number;
    transmission?: TTransmission;
    color?: string;
    doors?: number;
    country_id?: number;
    price_eur?: number; // Use 'number' for NUMERIC(10, 2)
    image_url?: string;
    created_at: Date;
    scraper_table_row?: string;
}