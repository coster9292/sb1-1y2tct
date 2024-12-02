// Fuel types enum based on the fuelTypes array
export type TFuel =
    | 'gasoline'
    | 'diesel'
    | 'electric'
    | 'hydrogen'
    | 'hybrid'
    | 'ethanol'
    | 'methanol'
    | 'solar'
    | 'LPG (Liquefied Petroleum Gas)'
    | 'NGV (Natural Gas Vehicle)'
    | 'CNG (Compressed Natural Gas)'
    | 'PHEV (Plug In Hybrid Electric Vehicle)'
    | 'DME (Dimethyl Ether)'
    | 'other';


// Interface for "fuels" table
// export interface IFuel {
//     fuel_id: number; // Primary key
//     name: TFuel;  // Name of the fuel type (ENUM)
// }