// RateZilla Market Data Engine & Historical Stores

export interface GoldRateItem {
  carat: string;
  purity: number; // e.g. 0.999, 0.916, 0.875, 0.750
  perTola: number; // in PKR
  per10Gram: number;
  perGram: number;
  change24h: number;
  direction: 'up' | 'down' | 'neutral';
}

export interface CityGoldRate {
  city: string;
  association: string;
  tola24k: number;
  tola22k: number;
  diffFromKarachi: number;
}

export interface FuelRateItem {
  id: string;
  name: string;
  nameUrdu: string;
  unit: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  effectiveDate: string;
  nextRevision: string;
  breakdown: {
    exRefinery: number;
    ifem: number;
    omcMargin: number;
    dealerMargin: number;
    pdl: number; // Petroleum Development Levy
    salesTax: number;
  };
}

export interface CurrencyItem {
  code: string;
  name: string;
  country: string;
  flag: string;
  interbankBuy: number;
  interbankSell: number;
  openMarketBuy: number;
  openMarketSell: number;
  change24h: number;
}

export interface MandiItem {
  id: string;
  item: string;
  itemUrdu: string;
  category: 'Grains' | 'Vegetables' | 'Oils & Pulses' | 'Cash Crops';
  unit: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  city: string;
  change24h: number;
}

export interface HistoricalPricePoint {
  date: string;
  gold24kTola: number;
  petrolPrice: number;
  dieselPrice: number;
  usdPkr: number;
}

// Current benchmark values in PKR
export const goldRates: GoldRateItem[] = [
  {
    carat: '24K (Pure Gold)',
    purity: 0.999,
    perTola: 284500,
    per10Gram: 243912,
    perGram: 24391.2,
    change24h: 1200,
    direction: 'up',
  },
  {
    carat: '22K (Jewellery Standard)',
    purity: 0.916,
    perTola: 260790,
    per10Gram: 223586,
    perGram: 22358.6,
    change24h: 1100,
    direction: 'up',
  },
  {
    carat: '21K (Traditional)',
    purity: 0.875,
    perTola: 248937,
    per10Gram: 213423,
    perGram: 21342.3,
    change24h: 1050,
    direction: 'up',
  },
  {
    carat: '18K (Diamond Mount)',
    purity: 0.750,
    perTola: 213375,
    per10Gram: 182934,
    perGram: 18293.4,
    change24h: 900,
    direction: 'up',
  },
];

export const silverRates = {
  perTola: 3420,
  per10Gram: 2932,
  perGram: 293.2,
  change24h: 40,
  direction: 'up' as const,
};

export const cityGoldRates: CityGoldRate[] = [
  { city: 'Karachi', association: 'All Sindh Sarafa Jewellers Association (ASSJA)', tola24k: 284500, tola22k: 260790, diffFromKarachi: 0 },
  { city: 'Lahore', association: 'Lahore Sarafa Association', tola24k: 284800, tola22k: 261050, diffFromKarachi: 300 },
  { city: 'Islamabad / Rawalpindi', association: 'Twin Cities Sarafa Association', tola24k: 284950, tola22k: 261200, diffFromKarachi: 450 },
  { city: 'Peshawar', association: 'Khyber Sarafa Market', tola24k: 285100, tola22k: 261340, diffFromKarachi: 600 },
  { city: 'Quetta', association: 'Balochistan Sarafa Council', tola24k: 285300, tola22k: 261520, diffFromKarachi: 800 },
  { city: 'Multan', association: 'South Punjab Sarafa Board', tola24k: 284750, tola22k: 261020, diffFromKarachi: 250 },
  { city: 'Faisalabad', association: 'Lyallpur Sarafa Guild', tola24k: 284700, tola22k: 260980, diffFromKarachi: 200 },
];

export const fuelRates: FuelRateItem[] = [
  {
    id: 'petrol',
    name: 'Motor Gasoline (Petrol / Super)',
    nameUrdu: 'موٹر پٹرول (سپر)',
    unit: 'Litre',
    currentPrice: 281.40,
    previousPrice: 279.75,
    change: 1.65,
    effectiveDate: '16 October 2024 (Fortnightly)',
    nextRevision: '1 November 2024',
    breakdown: {
      exRefinery: 182.40,
      ifem: 7.78,
      omcMargin: 7.87,
      dealerMargin: 8.64,
      pdl: 70.00,
      salesTax: 4.71,
    },
  },
  {
    id: 'diesel',
    name: 'High Speed Diesel (HSD)',
    nameUrdu: 'ہائی اسپیڈ ڈیزل',
    unit: 'Litre',
    currentPrice: 289.15,
    previousPrice: 287.60,
    change: 1.55,
    effectiveDate: '16 October 2024 (Fortnightly)',
    nextRevision: '1 November 2024',
    breakdown: {
      exRefinery: 191.20,
      ifem: 4.50,
      omcMargin: 7.87,
      dealerMargin: 8.64,
      pdl: 70.00,
      salesTax: 6.94,
    },
  },
  {
    id: 'kerosene',
    name: 'Superior Kerosene Oil (SKO)',
    nameUrdu: 'مٹی کا تیل (کیروسین)',
    unit: 'Litre',
    currentPrice: 195.40,
    previousPrice: 193.10,
    change: 2.30,
    effectiveDate: '16 October 2024',
    nextRevision: '1 November 2024',
    breakdown: {
      exRefinery: 145.20,
      ifem: 5.10,
      omcMargin: 5.50,
      dealerMargin: 6.00,
      pdl: 30.00,
      salesTax: 3.60,
    },
  },
  {
    id: 'ldo',
    name: 'Light Diesel Oil (LDO)',
    nameUrdu: 'لائٹ ڈیزل آئل',
    unit: 'Litre',
    currentPrice: 172.85,
    previousPrice: 170.90,
    change: 1.95,
    effectiveDate: '16 October 2024',
    nextRevision: '1 November 2024',
    breakdown: {
      exRefinery: 130.15,
      ifem: 4.20,
      omcMargin: 5.50,
      dealerMargin: 5.00,
      pdl: 25.00,
      salesTax: 3.00,
    },
  },
  {
    id: 'lpg_cyl',
    name: 'LPG Domestic Cylinder (11.8 Kg)',
    nameUrdu: 'ایل پی جی گھریلو سلنڈر (11.8 کلو)',
    unit: '11.8 Kg Cyl',
    currentPrice: 3045.00,
    previousPrice: 3012.00,
    change: 33.00,
    effectiveDate: '1 October 2024 (Monthly OGRA)',
    nextRevision: '1 November 2024',
    breakdown: {
      exRefinery: 2050.00,
      ifem: 180.00,
      omcMargin: 195.00,
      dealerMargin: 220.00,
      pdl: 0,
      salesTax: 400.00,
    },
  },
  {
    id: 'lpg_kg',
    name: 'LPG Commercial / Open Rate',
    nameUrdu: 'ایل پی جی فی کلوگرام',
    unit: 'Kg',
    currentPrice: 258.00,
    previousPrice: 255.20,
    change: 2.80,
    effectiveDate: '1 October 2024',
    nextRevision: '1 November 2024',
    breakdown: {
      exRefinery: 173.70,
      ifem: 15.25,
      omcMargin: 16.50,
      dealerMargin: 18.65,
      pdl: 0,
      salesTax: 33.90,
    },
  },
];

export const currencies: CurrencyItem[] = [
  { code: 'USD', name: 'US Dollar', country: 'United States', flag: '🇺🇸', interbankBuy: 277.85, interbankSell: 278.35, openMarketBuy: 279.10, openMarketSell: 280.50, change24h: 0.15 },
  { code: 'EUR', name: 'Euro', country: 'European Union', flag: '🇪🇺', interbankBuy: 302.40, interbankSell: 303.10, openMarketBuy: 303.50, openMarketSell: 305.80, change24h: -0.45 },
  { code: 'GBP', name: 'British Pound', country: 'United Kingdom', flag: '🇬🇧', interbankBuy: 361.20, interbankSell: 362.00, openMarketBuy: 362.50, openMarketSell: 365.40, change24h: 0.30 },
  { code: 'SAR', name: 'Saudi Riyal', country: 'Saudi Arabia', flag: '🇸🇦', interbankBuy: 73.98, interbankSell: 74.15, openMarketBuy: 74.30, openMarketSell: 74.90, change24h: 0.05 },
  { code: 'AED', name: 'UAE Dirham', country: 'United Arab Emirates', flag: '🇦🇪', interbankBuy: 75.65, interbankSell: 75.80, openMarketBuy: 75.95, openMarketSell: 76.60, change24h: 0.08 },
  { code: 'CAD', name: 'Canadian Dollar', country: 'Canada', flag: '🇨🇦', interbankBuy: 201.30, interbankSell: 202.00, openMarketBuy: 202.50, openMarketSell: 204.80, change24h: -0.20 },
  { code: 'AUD', name: 'Australian Dollar', country: 'Australia', flag: '🇦🇺', interbankBuy: 184.90, interbankSell: 185.50, openMarketBuy: 186.00, openMarketSell: 188.20, change24h: -0.10 },
  { code: 'CNY', name: 'Chinese Yuan', country: 'China', flag: '🇨🇳', interbankBuy: 39.05, interbankSell: 39.20, openMarketBuy: 39.30, openMarketSell: 39.95, change24h: 0.02 },
  { code: 'KWD', name: 'Kuwaiti Dinar', country: 'Kuwait', flag: '🇰🇼', interbankBuy: 906.10, interbankSell: 908.50, openMarketBuy: 909.00, openMarketSell: 918.00, change24h: 0.50 },
  { code: 'QAR', name: 'Qatari Riyal', country: 'Qatar', flag: '🇶🇦', interbankBuy: 76.10, interbankSell: 76.35, openMarketBuy: 76.40, openMarketSell: 77.10, change24h: 0.04 },
];

export const mandiItems: MandiItem[] = [
  { id: 'm1', item: 'Gandum (Wheat)', itemUrdu: 'گندم (نیا مال)', category: 'Grains', unit: '40 Kg', avgPrice: 3850, minPrice: 3750, maxPrice: 3950, city: 'Lahore Mandi', change24h: 50 },
  { id: 'm2', item: 'Basmati Super Rice (New)', itemUrdu: 'سپر باسمتی چاول', category: 'Grains', unit: '40 Kg', avgPrice: 9400, minPrice: 9100, maxPrice: 9700, city: 'Gujranwala Mandi', change24h: -100 },
  { id: 'm3', item: 'Sugar (White Refined)', itemUrdu: 'چینی سفید ریفائنڈ', category: 'Grains', unit: '50 Kg Bag', avgPrice: 7100, minPrice: 6950, maxPrice: 7250, city: 'Faisalabad Mandi', change24h: 30 },
  { id: 'm4', item: 'Cotton (Phutti / Raw)', itemUrdu: 'پھٹی کپاس', category: 'Cash Crops', unit: '40 Kg', avgPrice: 8200, minPrice: 7900, maxPrice: 8500, city: 'Multan Mandi', change24h: 120 },
  { id: 'm5', item: 'Desi Ghee (Pure)', itemUrdu: 'خالص دیسی گھی', category: 'Oils & Pulses', unit: '1 Kg', avgPrice: 2450, minPrice: 2300, maxPrice: 2600, city: 'Sahiwal Mandi', change24h: 0 },
  { id: 'm6', item: 'Daal Chana (Gram)', itemUrdu: 'دال چنا موٹی', category: 'Oils & Pulses', unit: '1 Kg', avgPrice: 320, minPrice: 305, maxPrice: 335, city: 'Karachi Jodia Bazaar', change24h: 5 },
  { id: 'm7', item: 'Onion (Piyaz Red)', itemUrdu: 'پیاز لال گریڈ اے', category: 'Vegetables', unit: '5 Kg Dhari', avgPrice: 580, minPrice: 540, maxPrice: 620, city: 'Karachi Sabzi Mandi', change24h: -40 },
  { id: 'm8', item: 'Tomato (Tamatar Farm)', itemUrdu: 'ٹماٹر فارمی لال', category: 'Vegetables', unit: '5 Kg Dhari', avgPrice: 490, minPrice: 450, maxPrice: 530, city: 'Lahore Badami Bagh', change24h: 20 },
  { id: 'm9', item: 'Potato (Aloo Fresh)', itemUrdu: 'آلو تازہ نیا', category: 'Vegetables', unit: '5 Kg Dhari', avgPrice: 390, minPrice: 360, maxPrice: 420, city: 'Islamabad I-11 Mandi', change24h: -10 },
  { id: 'm10', item: 'Mustard Oil (Sarson)', itemUrdu: 'سرسوں کا تیل کوہلو', category: 'Oils & Pulses', unit: '1 Litre', avgPrice: 510, minPrice: 490, maxPrice: 535, city: 'Sargodha Mandi', change24h: 0 },
];

export const historicalPriceData: HistoricalPricePoint[] = [
  { date: '14 Oct', gold24kTola: 280200, petrolPrice: 279.75, dieselPrice: 287.60, usdPkr: 277.60 },
  { date: '15 Oct', gold24kTola: 281500, petrolPrice: 279.75, dieselPrice: 287.60, usdPkr: 277.75 },
  { date: '16 Oct', gold24kTola: 282400, petrolPrice: 281.40, dieselPrice: 289.15, usdPkr: 277.90 },
  { date: '17 Oct', gold24kTola: 283100, petrolPrice: 281.40, dieselPrice: 289.15, usdPkr: 278.05 },
  { date: '18 Oct', gold24kTola: 283700, petrolPrice: 281.40, dieselPrice: 289.15, usdPkr: 278.15 },
  { date: '19 Oct', gold24kTola: 284100, petrolPrice: 281.40, dieselPrice: 289.15, usdPkr: 278.20 },
  { date: '20 Oct', gold24kTola: 284500, petrolPrice: 281.40, dieselPrice: 289.15, usdPkr: 278.35 },
];
