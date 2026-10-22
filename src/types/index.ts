export interface GoldRate {
  carat: string;
  purity: string;
  perTola: number;
  per10Gram: number;
  perGram: number;
  change24h: number;
  trend: 'up' | 'down' | 'stable';
}

export interface SilverRate {
  carat: string;
  purity: string;
  perTola: number;
  per10Gram: number;
  perGram: number;
  change24h: number;
  trend: 'up' | 'down' | 'stable';
}

export interface CityGoldRate {
  city: string;
  cityUrdu: string;
  rate24kTola: number;
  rate22kTola: number;
  differenceKarachi: number;
}

export interface FuelRate {
  product: string;
  productUrdu: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  effectiveDate: string;
  unit: string;
}

export interface CurrencyRate {
  code: string;
  name: string;
  flag: string;
  symbol: string;
  interbankBuy: number;
  interbankSell: number;
  openMarketBuy: number;
  openMarketSell: number;
  change24h: number;
}

export interface CryptoRate {
  symbol: string;
  name: string;
  priceUsd: number;
  pricePkr: number;
  change24h: number;
}

export interface MandiItem {
  id: string;
  item: string;
  itemUrdu: string;
  category: string;
  unit: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  city: string;
  change24h: number;
}

export interface WeatherCity {
  city: string;
  cityUrdu: string;
  temp: number;
  condition: string;
  aqi: number;
  humidity: number;
  advisory: string;
}

export interface HistoricalRate {
  date: string;
  gold24kTola: number;
  petrolPrice: number;
  dieselPrice: number;
  usdPkr: number;
}
