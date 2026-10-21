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

// Current benchmark values in PKR (Updated per latest Sarafa & OGRA benchmarks)
export const goldRates: GoldRateItem[] = [
  {
    carat: '24K (Pure Gold)',
    purity: 0.999,
    perTola: 429500,
    per10Gram: 368230,
    perGram: 36823,
    change24h: 1800,
    direction: 'up',
  },
  {
    carat: '22K (Jewellery Standard)',
    purity: 0.916,
    perTola: 393708,
    per10Gram: 337544,
    perGram: 33754.4,
    change24h: 1650,
    direction: 'up',
  },
  {
    carat: '21K (Traditional)',
    purity: 0.875,
    perTola: 375813,
    per10Gram: 322200,
    perGram: 32220,
    change24h: 1570,
    direction: 'up',
  },
  {
    carat: '18K (Diamond Mount)',
    purity: 0.750,
    perTola: 322121,
    per10Gram: 276173,
    perGram: 27617.3,
    change24h: 1350,
    direction: 'up',
  },
];

export const silverRates = {
  perTola: 6282,
  per10Gram: 5384,
  perGram: 538.40,
  change24h: 75,
  direction: 'up' as const,
};

export const cityGoldRates: CityGoldRate[] = [
  { city: 'Karachi', association: 'All Sindh Sarafa Jewellers Association (ASSJA)', tola24k: 429500, tola22k: 393708, diffFromKarachi: 0 },
  { city: 'Lahore', association: 'Lahore Sarafa Association', tola24k: 429680, tola22k: 393870, diffFromKarachi: 180 },
  { city: 'Islamabad / Rawalpindi', association: 'Twin Cities Sarafa Association', tola24k: 429820, tola22k: 393990, diffFromKarachi: 320 },
  { city: 'Peshawar', association: 'Khyber Sarafa Market', tola24k: 429880, tola22k: 394050, diffFromKarachi: 380 },
  { city: 'Quetta', association: 'Balochistan Sarafa Council', tola24k: 430080, tola22k: 394230, diffFromKarachi: 580 },
  { city: 'Multan', association: 'South Punjab Sarafa Board', tola24k: 429600, tola22k: 393800, diffFromKarachi: 100 },
  { city: 'Faisalabad', association: 'Lyallpur Sarafa Guild', tola24k: 429680, tola22k: 393870, diffFromKarachi: 180 },
];

export const fuelRates: FuelRateItem[] = [
  {
    id: 'petrol',
    name: 'Motor Gasoline (Petrol / Premier Euro 5)',
    nameUrdu: 'موٹر پٹرول (پریمیئر یورو 5)',
    unit: 'Litre',
    currentPrice: 382.02,
    previousPrice: 381.14,
    change: 0.88,
    effectiveDate: 'Latest OGRA Revision (Fortnightly)',
    nextRevision: '1st & 16th of Month',
    breakdown: {
      exRefinery: 254.40,
      ifem: 9.78,
      omcMargin: 8.87,
      dealerMargin: 9.64,
      pdl: 70.00,
      salesTax: 29.33,
    },
  },
  {
    id: 'diesel',
    name: 'High Speed Diesel (HSD)',
    nameUrdu: 'ہائی اسپیڈ ڈیزل (ایچ ایس ڈی)',
    unit: 'Litre',
    currentPrice: 389.80,
    previousPrice: 389.27,
    change: 0.53,
    effectiveDate: 'Latest OGRA Revision (Fortnightly)',
    nextRevision: '1st & 16th of Month',
    breakdown: {
      exRefinery: 262.20,
      ifem: 6.50,
      omcMargin: 8.87,
      dealerMargin: 9.64,
      pdl: 70.00,
      salesTax: 32.59,
    },
  },
  {
    id: 'hobc',
    name: 'High Octane Blending Component (HOBC 97)',
    nameUrdu: 'ہائی اوکٹین (HOBC)',
    unit: 'Litre',
    currentPrice: 415.00,
    previousPrice: 412.50,
    change: 2.50,
    effectiveDate: 'Deregulated OMC Rate',
    nextRevision: 'Market Driven',
    breakdown: {
      exRefinery: 295.00,
      ifem: 12.00,
      omcMargin: 15.00,
      dealerMargin: 13.00,
      pdl: 50.00,
      salesTax: 30.00,
    },
  },
  {
    id: 'kerosene',
    name: 'Superior Kerosene Oil (SKO)',
    nameUrdu: 'مٹی کا تیل (کیروسین)',
    unit: 'Litre',
    currentPrice: 326.75,
    previousPrice: 325.55,
    change: 1.20,
    effectiveDate: 'Latest OGRA Revision',
    nextRevision: '1st of Month',
    breakdown: {
      exRefinery: 235.20,
      ifem: 7.10,
      omcMargin: 7.50,
      dealerMargin: 8.00,
      pdl: 40.00,
      salesTax: 28.95,
    },
  },
  {
    id: 'ldo',
    name: 'Light Diesel Oil (LDO)',
    nameUrdu: 'لائٹ ڈیزل آئل',
    unit: 'Litre',
    currentPrice: 267.46,
    previousPrice: 266.56,
    change: 0.90,
    effectiveDate: 'Latest OGRA Revision',
    nextRevision: '1st of Month',
    breakdown: {
      exRefinery: 198.15,
      ifem: 6.20,
      omcMargin: 7.50,
      dealerMargin: 7.00,
      pdl: 30.00,
      salesTax: 18.61,
    },
  },
  {
    id: 'lpg_cyl',
    name: 'LPG Domestic Cylinder (11.8 Kg)',
    nameUrdu: 'ایل پی جی گھریلو سلنڈر (11.8 کلو)',
    unit: '11.8 Kg Cyl',
    currentPrice: 3300.00,
    previousPrice: 3260.00,
    change: 40.00,
    effectiveDate: 'Current Monthly OGRA Notification',
    nextRevision: 'Next Month Notification',
    breakdown: {
      exRefinery: 2280.00,
      ifem: 210.00,
      omcMargin: 230.00,
      dealerMargin: 260.00,
      pdl: 0,
      salesTax: 320.00,
    },
  },
  {
    id: 'lpg_comm',
    name: 'LPG Commercial Cylinder (45.4 Kg)',
    nameUrdu: 'ایل پی جی کمرشل سلنڈر (45.4 کلو)',
    unit: '45.4 Kg Cyl',
    currentPrice: 12680.00,
    previousPrice: 12530.00,
    change: 150.00,
    effectiveDate: 'Monthly OGRA Notification',
    nextRevision: 'Next Month',
    breakdown: {
      exRefinery: 8750.00,
      ifem: 800.00,
      omcMargin: 890.00,
      dealerMargin: 1010.00,
      pdl: 0,
      salesTax: 1230.00,
    },
  },
  {
    id: 'lpg_kg',
    name: 'LPG Base Benchmark Rate',
    nameUrdu: 'ایل پی جی فی کلوگرام ریٹ',
    unit: 'Kg',
    currentPrice: 279.34,
    previousPrice: 275.94,
    change: 3.40,
    effectiveDate: 'OGRA Monthly Notification',
    nextRevision: 'Monthly Revision',
    breakdown: {
      exRefinery: 193.20,
      ifem: 17.80,
      omcMargin: 19.50,
      dealerMargin: 22.04,
      pdl: 0,
      salesTax: 26.80,
    },
  },
  {
    id: 'cng_reg1',
    name: 'CNG Region-I (KPK, Balochistan, Potohar)',
    nameUrdu: 'سی این جی ریجن 1 (خیبرپختونخوا، بلوچستان، پوٹھوہار)',
    unit: 'Kg',
    currentPrice: 195.00,
    previousPrice: 195.00,
    change: 0.00,
    effectiveDate: 'Regional Tariff Schedule',
    nextRevision: 'Quarterly',
    breakdown: {
      exRefinery: 140.00,
      ifem: 10.00,
      omcMargin: 15.00,
      dealerMargin: 15.00,
      pdl: 0,
      salesTax: 15.00,
    },
  },
  {
    id: 'cng_reg2',
    name: 'CNG Region-II (Sindh, Punjab Plains)',
    nameUrdu: 'سی این جی ریجن 2 (سندھ، پنجاب)',
    unit: 'Kg',
    currentPrice: 210.00,
    previousPrice: 210.00,
    change: 0.00,
    effectiveDate: 'Regional Tariff Schedule',
    nextRevision: 'Quarterly',
    breakdown: {
      exRefinery: 150.00,
      ifem: 12.00,
      omcMargin: 16.00,
      dealerMargin: 17.00,
      pdl: 0,
      salesTax: 15.00,
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
  { date: '15 Oct', gold24kTola: 421500, petrolPrice: 381.14, dieselPrice: 389.27, usdPkr: 277.90 },
  { date: '16 Oct', gold24kTola: 423200, petrolPrice: 381.14, dieselPrice: 389.27, usdPkr: 278.05 },
  { date: '17 Oct', gold24kTola: 424800, petrolPrice: 382.02, dieselPrice: 389.80, usdPkr: 278.10 },
  { date: '18 Oct', gold24kTola: 426100, petrolPrice: 382.02, dieselPrice: 389.80, usdPkr: 278.15 },
  { date: '19 Oct', gold24kTola: 427400, petrolPrice: 382.02, dieselPrice: 389.80, usdPkr: 278.25 },
  { date: '20 Oct', gold24kTola: 428300, petrolPrice: 382.02, dieselPrice: 389.80, usdPkr: 278.30 },
  { date: '21 Oct', gold24kTola: 429500, petrolPrice: 382.02, dieselPrice: 389.80, usdPkr: 278.35 },
];
