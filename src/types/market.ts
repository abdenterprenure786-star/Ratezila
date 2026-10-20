// RateZilla TypeScript Interfaces

export interface GoldRateItem {
  carat: string;
  purity: number;
  perTola: number;
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
    pdl: number;
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

export interface CryptoRate {
  symbol: string;
  name: string;
  icon: string;
  priceUsd: number;
  pricePkr: number;
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

export interface WeatherAgriCity {
  city: string;
  tempC: number;
  condition: string;
  humidity: number;
  windKmH: number;
  aqi: number;
  aqiStatus: 'Good' | 'Moderate' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  cropAdvisory: string;
  urduAdvisory: string;
}

export interface MarketNewsItem {
  id: string;
  title: string;
  titleUrdu: string;
  category: 'Gold' | 'Fuel' | 'Economy' | 'Solar' | 'Mandi';
  date: string;
  readTime: string;
  snippet: string;
  fullContent: string;
}

export interface UrduAudioGuide {
  id: string;
  title: string;
  titleUrdu: string;
  category: 'Gold & Sarafa' | 'OGRA & Fuel' | 'Electricity & WAPDA' | 'FBR & Taxes' | 'Mandi & Agriculture';
  duration: string;
  speaker: string;
  speakerRole: string;
  summary: string;
  summaryUrdu: string;
  audioUrl: string;
  videoPoster: string;
  chapters: { time: string; title: string; titleUrdu: string }[];
  urduTranscript: string;
  englishTranscript: string;
}
