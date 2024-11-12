import React from 'react';

interface MakeModelFilterProps {
  make?: string;
  model?: string;
  onMakeChange: (make: string) => void;
  onModelChange: (model: string) => void;
}

const MANUFACTURERS = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Bugatti",
  "BYD",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "De Tomaso",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "Geely",
  "GMC",
  "Honda",
  "Hummer",
  "Hyundai",
  "Isuzu",
  "Jaguar",
  "Kia",
  "Lada",
  "Lamborghini",
  "Lexus",
  "Mazda",
  "McLaren",
  "Mercedes",
  "Mini",
  "Mitsubishi",
  "Nio",
  "Nissan",
  "Porsche",
  "Ram Trucks",
  "Seat",
  "Subaru",
  "Tesla",
  "Volkswagen",
  "Volvo"
].sort();

const MODELS: Record<string, string[]> = {
  acura: ['MDX', 'RDX', 'TLX', 'ILX', 'NSX'],
  'alfa romeo': ['Giulia', 'Stelvio', '4C', 'Tonale'],
  'aston martin': ['DB11', 'Vantage', 'DBX', 'DBS'],
  audi: ['A3', 'A4', 'A6', 'Q3', 'Q5', 'e-tron', 'RS6'],
  bentley: ['Continental GT', 'Flying Spur', 'Bentayga'],
  bmw: ['3 Series', '5 Series', 'X3', 'X5', 'M3', 'M5', 'i4'],
  bugatti: ['Chiron', 'Veyron'],
  byd: ['Atto 3', 'Han', 'Tang'],
  cadillac: ['CT4', 'CT5', 'Escalade', 'XT4', 'XT5'],
  chevrolet: ['Camaro', 'Corvette', 'Silverado', 'Tahoe'],
  chrysler: ['300', 'Pacifica'],
  'de tomaso': ['Pantera', 'Mangusta'],
  dodge: ['Challenger', 'Charger', 'Durango'],
  ferrari: ['F8', 'SF90', '296 GTB', 'Roma'],
  fiat: ['500', 'Panda', 'Tipo'],
  ford: ['Mustang', 'F-150', 'Explorer', 'Focus'],
  geely: ['Coolray', 'Azkarra', 'Okavango'],
  gmc: ['Sierra', 'Yukon', 'Terrain', 'Acadia'],
  honda: ['Civic', 'Accord', 'CR-V', 'HR-V'],
  hummer: ['H1', 'H2', 'H3', 'EV'],
  hyundai: ['Tucson', 'Santa Fe', 'Elantra', 'Kona'],
  isuzu: ['D-Max', 'MU-X'],
  jaguar: ['F-PACE', 'E-PACE', 'I-PACE', 'XF'],
  kia: ['Sportage', 'Sorento', 'Telluride', 'EV6'],
  lada: ['Niva', 'Vesta', 'XRAY'],
  lamborghini: ['Huracán', 'Aventador', 'Urus'],
  lexus: ['RX', 'NX', 'ES', 'IS'],
  mazda: ['CX-5', 'CX-30', 'Mazda3', 'MX-5'],
  'mc laren': ['720S', 'Artura', 'GT'],
  mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'A-Class'],
  mini: ['Cooper', 'Countryman', 'Clubman'],
  mitsubishi: ['Outlander', 'Eclipse Cross', 'ASX'],
  nio: ['ES6', 'ES8', 'ET7'],
  nissan: ['Qashqai', 'X-Trail', 'Leaf', 'GT-R'],
  porsche: ['911', 'Cayenne', 'Macan', 'Taycan'],
  'ram trucks': ['1500', '2500', '3500'],
  seat: ['Leon', 'Ateca', 'Arona', 'Tarraco'],
  subaru: ['Outback', 'Forester', 'Impreza', 'WRX'],
  tesla: ['Model 3', 'Model Y', 'Model S', 'Model X'],
  volkswagen: ['Golf', 'Passat', 'Tiguan', 'Polo', 'ID.4'],
  volvo: ['XC40', 'XC60', 'XC90', 'S60', 'V60']
};

export function MakeModelFilter({ make, model, onMakeChange, onModelChange }: MakeModelFilterProps) {
  const availableModels = make ? MODELS[make.toLowerCase()] || [] : [];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Make
        </label>
        <select
          value={make || ''}
          onChange={(e) => onMakeChange(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Makes</option>
          {MANUFACTURERS.map((make) => (
            <option key={make.toLowerCase()} value={make.toLowerCase()}>
              {make}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Model
        </label>
        <select
          value={model || ''}
          onChange={(e) => onModelChange(e.target.value)}
          disabled={!make}
          className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        >
          <option value="">All Models</option>
          {availableModels.map((model) => (
            <option key={model.toLowerCase()} value={model.toLowerCase()}>
              {model}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}