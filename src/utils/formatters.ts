// Common automotive brand acronyms that should be uppercase
const UPPERCASE_BRANDS = new Set([
  'bmw',
  'vw',
  'gmc',
  'mg',
  'amg',
  'amc',
  'byd',
]);

// Brands that have specific capitalization rules
const SPECIAL_CASE_BRANDS: Record<string, string> = {
  'alfa romeo': 'Alfa Romeo',
  'aston martin': 'Aston Martin',
  'de tomaso': 'De Tomaso',
  'land rover': 'Land Rover',
  'mercedes benz': 'Mercedes-Benz',
  'mercedes-benz': 'Mercedes-Benz',
  'rolls royce': 'Rolls-Royce',
  'rolls-royce': 'Rolls-Royce',
};

export function formatCarBrand(brand: string): string {
  const lowerBrand = brand.toLowerCase().trim();

  // Check for special case brands first
  for (const [key, value] of Object.entries(SPECIAL_CASE_BRANDS)) {
    if (lowerBrand === key) {
      return value;
    }
  }

  // Handle uppercase brands
  if (UPPERCASE_BRANDS.has(lowerBrand)) {
    return lowerBrand.toUpperCase();
  }

  // Default to capitalize first letter of each word
  return lowerBrand
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatCarModel(model: string): string {
  // Handle numeric models (e.g., "911", "M3")
  if (/^\d/.test(model)) {
    return model.toUpperCase();
  }

  // Handle models with numbers (e.g., "X5", "A4")
  if (/^[A-Za-z]+\d/.test(model)) {
    const letter = model.match(/^[A-Za-z]+/)?.[0] || '';
    const rest = model.slice(letter.length);
    return letter.toUpperCase() + rest;
  }

  // Handle hyphenated models
  if (model.includes('-')) {
    return model
      .split('-')
      .map(part => formatCarModel(part))
      .join('-');
  }

  // Default to capitalize first letter of each word
  return model
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function formatCarVersion(version: string): string {
  // Handle common version patterns
  const patterns = [
    // Engine size (e.g., "2.0 TDI")
    /^(\d+\.\d+)\s+(.+)$/i,
    // Performance variants (e.g., "M Sport")
    /^([A-Z])\s+(.+)$/i,
  ];

  for (const pattern of patterns) {
    const match = version.match(pattern);
    if (match) {
      const [_, first, rest] = match;
      return `${first} ${rest.toUpperCase()}`;
    }
  }

  // Default to uppercase for short versions
  if (version.length <= 3) {
    return version.toUpperCase();
  }

  // Default to capitalize first letter of each word
  return version
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}