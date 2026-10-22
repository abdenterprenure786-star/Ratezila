import { GoldRate, SilverRate, CityGoldRate, FuelRate, CurrencyRate, CryptoRate, MandiItem, WeatherCity, HistoricalRate } from '../types';

export interface MarketCacheData {
  goldRates: GoldRate[];
  silverRate: SilverRate;
  cityGoldRates: CityGoldRate[];
  fuelRates: FuelRate[];
  currencies: CurrencyRate[];
  cryptos: CryptoRate[];
  mandiItems: MandiItem[];
  weatherCities: WeatherCity[];
  historicalTrends: HistoricalRate[];
  lastUpdated: string;
}

export const FALLBACK_GOLD_RATES: GoldRate[] = [
  { carat: '24K (Pure Gold)', purity: '99.9%', perTola: 284500, per10Gram: 243912, perGram: 24391, change24h: 1200, trend: 'up' },
  { carat: '22K (Jewelry Standard)', purity: '91.6%', perTola: 260790, per10Gram: 223586, perGram: 22358, change24h: 1100, trend: 'up' },
  { carat: '21K (Traditional Arab)', purity: '87.5%', perTola: 248937, per10Gram: 213423, perGram: 21342, change24h: 1050, trend: 'up' },
  { carat: '18K (Diamond Studded)', purity: '75.0%', perTola: 213375, per10Gram: 182934, perGram: 18293, change24h: 900, trend: 'up' }
];

export const FALLBACK_SILVER_RATE: SilverRate = {
  carat: 'Fine Silver 999',
  purity: '99.9%',
  perTola: 3350,
  per10Gram: 2872,
  perGram: 287,
  change24h: 40,
  trend: 'up'
};

export const FALLBACK_CITY_GOLD: CityGoldRate[] = [
  { city: 'Karachi', cityUrdu: 'کراچی (صرافہ ایسوسی ایشن پاکستان)', rate24kTola: 284500, rate22kTola: 260790, differenceKarachi: 0 },
  { city: 'Lahore', cityUrdu: 'لاہور (سوہا بازار صرافہ مارکیٹ)', rate24kTola: 284800, rate22kTola: 261050, differenceKarachi: 300 },
  { city: 'Islamabad / Rawalpindi', cityUrdu: 'اسلام آباد و راولپنڈی مارکیٹ', rate24kTola: 284900, rate22kTola: 261150, differenceKarachi: 400 },
  { city: 'Peshawar', cityUrdu: 'پشاور (اندر شہر مارکیٹ)', rate24kTola: 284650, rate22kTola: 260900, differenceKarachi: 150 },
  { city: 'Quetta', cityUrdu: 'کوئٹہ (قندھاری بازار)', rate24kTola: 284950, rate22kTola: 261200, differenceKarachi: 450 },
  { city: 'Multan', cityUrdu: 'ملتان (حسین آگاہی صرافہ)', rate24kTola: 284750, rate22kTola: 261000, differenceKarachi: 250 },
  { city: 'Faisalabad', cityUrdu: 'فیصل آباد (ریل بازار صرافہ)', rate24kTola: 284700, rate22kTola: 260950, differenceKarachi: 200 }
];

export const FALLBACK_FUEL_RATES: FuelRate[] = [
  { product: 'Petrol (Motor Gasoline Regular)', productUrdu: 'پٹرول (موٹر گیسولین 92 رون)', currentPrice: 281.40, previousPrice: 283.80, change: -2.40, effectiveDate: 'Current OGRA Fortnight', unit: 'Litre' },
  { product: 'High Speed Diesel (HSD)', productUrdu: 'ہائی اسپیڈ ڈیزل (ٹرانسپورٹ و جنریٹر)', currentPrice: 285.50, previousPrice: 288.00, change: -2.50, effectiveDate: 'Current OGRA Fortnight', unit: 'Litre' },
  { product: 'HOBC High Octane (97 RON)', productUrdu: 'ہائی اوکٹین (لگژری اسپورٹس و پریمیم)', currentPrice: 295.00, previousPrice: 295.00, change: 0.00, effectiveDate: 'Deregulated OMC', unit: 'Litre' },
  { product: 'Light Diesel Oil (LDO)', productUrdu: 'لائٹ ڈیزل آئل (ٹیوب ویل و زرعی)', currentPrice: 172.50, previousPrice: 173.80, change: -1.30, effectiveDate: 'Current OGRA Fortnight', unit: 'Litre' },
  { product: 'Kerosene Oil (Mitti Ka Tail)', productUrdu: 'مٹی کا تیل (گھریلو)', currentPrice: 188.20, previousPrice: 189.50, change: -1.30, effectiveDate: 'Current OGRA Fortnight', unit: 'Litre' },
  { product: 'CNG (Region-1 Khyber Pakhtunkhwa)', productUrdu: 'سی این جی (ریجن-1 خیبر پختونخوا)', currentPrice: 220.00, previousPrice: 220.00, change: 0.00, effectiveDate: 'OGRA Regulated', unit: 'Kg' },
  { product: 'CNG (Region-2 Punjab & Sindh)', productUrdu: 'سی این جی (ریجن-2 پنجاب و سندھ)', currentPrice: 235.00, previousPrice: 235.00, change: 0.00, effectiveDate: 'OGRA Regulated', unit: 'Kg' },
  { product: 'Domestic LPG Cylinder (11.8 Kg)', productUrdu: 'ایل پی جی سلنڈر (گھریلو 11.8 کلوگرام)', currentPrice: 3120.00, previousPrice: 3175.00, change: -55.00, effectiveDate: 'OGRA Consumer Cap', unit: '11.8 Kg' }
];

export const FALLBACK_CURRENCIES: CurrencyRate[] = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$', interbankBuy: 278.15, interbankSell: 278.35, openMarketBuy: 279.40, openMarketSell: 280.90, change24h: 0.10 },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€', interbankBuy: 302.10, interbankSell: 302.50, openMarketBuy: 303.80, openMarketSell: 306.20, change24h: -0.35 },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£', interbankBuy: 362.40, interbankSell: 362.80, openMarketBuy: 364.50, openMarketSell: 367.00, change24h: 0.45 },
  { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦', symbol: '﷼', interbankBuy: 74.10, interbankSell: 74.20, openMarketBuy: 74.50, openMarketSell: 74.90, change24h: 0.05 },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', symbol: 'د.إ', interbankBuy: 75.70, interbankSell: 75.80, openMarketBuy: 76.10, openMarketSell: 76.50, change24h: 0.02 },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$', interbankBuy: 204.20, interbankSell: 204.60, openMarketBuy: 206.00, openMarketSell: 208.50, change24h: 0.15 }
];

export const FALLBACK_CRYPTOS: CryptoRate[] = [
  { symbol: 'BTC', name: 'Bitcoin', priceUsd: 67450, pricePkr: 18776000, change24h: 2.4 },
  { symbol: 'ETH', name: 'Ethereum', priceUsd: 3520, pricePkr: 979800, change24h: 1.8 },
  { symbol: 'SOL', name: 'Solana', priceUsd: 182, pricePkr: 50660, change24h: 4.5 },
  { symbol: 'USDT', name: 'Tether USD', priceUsd: 1.00, pricePkr: 281.50, change24h: 0.02 }
];

export const FALLBACK_MANDI: MandiItem[] = [
  { id: 'm1', item: 'Wheat (Gandum / Super Kernel)', itemUrdu: 'گندم دیسی اعلیٰ', category: 'Grains & Cereals', unit: '40 Kg (Maund)', avgPrice: 3850, minPrice: 3700, maxPrice: 4000, city: 'Lahore Mandi', change24h: 50 },
  { id: 'm2', item: 'Basmati Rice (Kainat 1121)', itemUrdu: 'کائنات 1121 باسمتی چاول', category: 'Grains & Cereals', unit: '40 Kg (Maund)', avgPrice: 11800, minPrice: 11400, maxPrice: 12200, city: 'Gujranwala Mandi', change24h: -100 },
  { id: 'm3', item: 'Sugar (Cheeni White M-30)', itemUrdu: 'چینی سفید ریفائنڈ', category: 'Grains & Cereals', unit: '50 Kg Bag', avgPrice: 7100, minPrice: 6950, maxPrice: 7250, city: 'Faisalabad Mandi', change24h: 30 },
  { id: 'm4', item: 'Cotton (Phutti / Raw)', itemUrdu: 'پھٹی کپاس', category: 'Cash Crops', unit: '40 Kg', avgPrice: 8200, minPrice: 7900, maxPrice: 8500, city: 'Multan Mandi', change24h: 120 },
  { id: 'm5', item: 'Potato (Aloo Fresh)', itemUrdu: 'آلو تازہ نیا', category: 'Vegetables', unit: '5 Kg Dhari', avgPrice: 390, minPrice: 360, maxPrice: 420, city: 'Islamabad I-11 Mandi', change24h: -10 },
  { id: 'm6', item: 'Onion (Piyaz Red)', itemUrdu: 'پیاز لال گریڈ اے', category: 'Vegetables', unit: '5 Kg Dhari', avgPrice: 580, minPrice: 540, maxPrice: 620, city: 'Karachi Sabzi Mandi', change24h: -40 },
  { id: 'm7', item: 'Tomato (Tamatar Farm)', itemUrdu: 'ٹماٹر فارمی لال', category: 'Vegetables', unit: '5 Kg Dhari', avgPrice: 490, minPrice: 450, maxPrice: 530, city: 'Lahore Badami Bagh', change24h: 20 }
];

export const FALLBACK_WEATHER: WeatherCity[] = [
  { city: 'Karachi', cityUrdu: 'کراچی', temp: 31, condition: 'Sunny / Coastal Breeze', aqi: 112, humidity: 68, advisory: 'Safe for fieldwork. Evening maritime fog.' },
  { city: 'Lahore', cityUrdu: 'لاہور', temp: 28, condition: 'Hazy / Smog Risk', aqi: 178, humidity: 55, advisory: 'Farmers advised to avoid open crop burning.' },
  { city: 'Islamabad', cityUrdu: 'اسلام آباد', temp: 24, condition: 'Clear Sky', aqi: 64, humidity: 42, advisory: 'Ideal temperature for wheat crop development.' },
  { city: 'Multan', cityUrdu: 'ملتان', temp: 30, condition: 'Dry Warm', aqi: 124, humidity: 38, advisory: 'Cotton picking season optimal conditions.' },
  { city: 'Peshawar', cityUrdu: 'پشاور', temp: 26, condition: 'Pleasant Breeze', aqi: 89, humidity: 46, advisory: 'Favorable orchard harvest condition.' }
];

export const FALLBACK_HISTORY: HistoricalRate[] = [
  { date: '16 Oct', gold24kTola: 281200, petrolPrice: 283.80, dieselPrice: 288.00, usdPkr: 277.95 },
  { date: '17 Oct', gold24kTola: 282400, petrolPrice: 283.80, dieselPrice: 288.00, usdPkr: 278.10 },
  { date: '18 Oct', gold24kTola: 283100, petrolPrice: 281.40, dieselPrice: 285.50, usdPkr: 278.15 },
  { date: '19 Oct', gold24kTola: 283900, petrolPrice: 281.40, dieselPrice: 285.50, usdPkr: 278.25 },
  { date: '20 Oct', gold24kTola: 284100, petrolPrice: 281.40, dieselPrice: 285.50, usdPkr: 278.30 },
  { date: '21 Oct', gold24kTola: 284500, petrolPrice: 281.40, dieselPrice: 285.50, usdPkr: 278.35 }
];

const CACHE_STORAGE_KEY = 'ratezilla_market_cache_v2';

export const loadOfflineCache = (): MarketCacheData => {
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.goldRates && parsed.goldRates.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[RateZilla Offline] Failed to load localStorage cache, using defaults:', err);
  }

  return {
    goldRates: FALLBACK_GOLD_RATES,
    silverRate: FALLBACK_SILVER_RATE,
    cityGoldRates: FALLBACK_CITY_GOLD,
    fuelRates: FALLBACK_FUEL_RATES,
    currencies: FALLBACK_CURRENCIES,
    cryptos: FALLBACK_CRYPTOS,
    mandiItems: FALLBACK_MANDI,
    weatherCities: FALLBACK_WEATHER,
    historicalTrends: FALLBACK_HISTORY,
    lastUpdated: 'Offline Benchmark'
  };
};

export const saveOfflineCache = (data: Partial<MarketCacheData>) => {
  try {
    const existing = loadOfflineCache();
    const updated: MarketCacheData = {
      ...existing,
      ...data,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })
    };
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('[RateZilla Offline] Failed to save localStorage cache:', err);
  }
};

export const fetchAllMarketRates = async (): Promise<{ data: MarketCacheData; isFromCache: boolean }> => {
  // If device is strictly offline, immediately return cached rates without attempting network fetch
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return { data: loadOfflineCache(), isFromCache: true };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const [goldRes, fuelRes, currRes, cryptoRes, mandiRes, weatherRes] = await Promise.all([
      fetch('/api/rates/gold', { signal: controller.signal }).catch(() => null),
      fetch('/api/rates/fuel', { signal: controller.signal }).catch(() => null),
      fetch('/api/rates/currencies', { signal: controller.signal }).catch(() => null),
      fetch('/api/rates/crypto', { signal: controller.signal }).catch(() => null),
      fetch('/api/rates/mandi', { signal: controller.signal }).catch(() => null),
      fetch('/api/weather/alerts', { signal: controller.signal }).catch(() => null)
    ]);

    clearTimeout(timeoutId);

    const cached = loadOfflineCache();
    let updatedGold = cached.goldRates;
    let updatedSilver = cached.silverRate;
    let updatedCityGold = cached.cityGoldRates;
    let updatedHistory = cached.historicalTrends;
    let updatedFuel = cached.fuelRates;
    let updatedCurrencies = cached.currencies;
    let updatedCryptos = cached.cryptos;
    let updatedMandi = cached.mandiItems;
    let updatedWeather = cached.weatherCities;

    if (goldRes && goldRes.ok) {
      const g = await goldRes.json();
      if (g.rates) updatedGold = g.rates;
      if (g.silver) updatedSilver = g.silver;
      if (g.cityRates) updatedCityGold = g.cityRates;
      if (g.historicalTrends) updatedHistory = g.historicalTrends;
    }

    if (fuelRes && fuelRes.ok) {
      const f = await fuelRes.json();
      if (f.products) updatedFuel = f.products;
    }

    if (currRes && currRes.ok) {
      const c = await currRes.json();
      if (c.currencies) updatedCurrencies = c.currencies;
    }

    if (cryptoRes && cryptoRes.ok) {
      const cr = await cryptoRes.json();
      if (cr.cryptos) updatedCryptos = cr.cryptos;
    }

    if (mandiRes && mandiRes.ok) {
      const m = await mandiRes.json();
      if (m.items) updatedMandi = m.items;
    }

    if (weatherRes && weatherRes.ok) {
      const w = await weatherRes.json();
      if (w.cities) updatedWeather = w.cities;
    }

    const freshData: MarketCacheData = {
      goldRates: updatedGold,
      silverRate: updatedSilver,
      cityGoldRates: updatedCityGold,
      fuelRates: updatedFuel,
      currencies: updatedCurrencies,
      cryptos: updatedCryptos,
      mandiItems: updatedMandi,
      weatherCities: updatedWeather,
      historicalTrends: updatedHistory,
      lastUpdated: 'Live (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')'
    };

    saveOfflineCache(freshData);
    return { data: freshData, isFromCache: false };
  } catch (err) {
    console.warn('[RateZilla] Live fetch failed or timed out, serving offline cached rates:', err);
    return { data: loadOfflineCache(), isFromCache: true };
  }
};
