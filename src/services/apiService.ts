// RateZilla Unified API & Offline Fallback Service

import {
  offlineGoldRates,
  offlineSilverRates,
  offlineCityGoldRates,
  offlineFuelRates,
  offlineCurrencies,
  offlineCryptoRates,
  offlineMandiItems,
  offlineHistoricalData,
  offlineCityWeather,
  offlineMarketNews,
  offlineAudioGuides,
} from './offlineEngine.js';

import {
  GoldRateItem,
  CityGoldRate,
  FuelRateItem,
  CurrencyItem,
  CryptoRate,
  MandiItem,
  HistoricalPricePoint,
  WeatherAgriCity,
  MarketNewsItem,
  UrduAudioGuide,
} from '../types/market.js';

export const apiService = {
  async getSummary() {
    try {
      const res = await fetch('/api/rates/summary');
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }
    return {
      success: true,
      portal: 'RateZilla',
      status: 'ONLINE (OFFLINE CACHE)',
      topBenchmarks: {
        gold24kTolaPKR: offlineGoldRates[0].perTola,
        gold24kChange: offlineGoldRates[0].change24h,
        petrolPKR: offlineFuelRates[0].currentPrice,
        dieselPKR: offlineFuelRates[1].currentPrice,
        usdPkrInterbank: offlineCurrencies[0].interbankSell,
        sarPkr: offlineCurrencies[3].interbankSell,
        btcPkr: offlineCryptoRates[0].pricePkr,
      },
    };
  },

  async getGoldRates(): Promise<{
    rates: GoldRateItem[];
    silver: typeof offlineSilverRates;
    cityRates: CityGoldRate[];
    historicalTrends: HistoricalPricePoint[];
  }> {
    try {
      const res = await fetch('/api/rates/gold');
      if (res.ok) {
        const data = await res.json();
        return {
          rates: data.rates || offlineGoldRates,
          silver: data.silver || offlineSilverRates,
          cityRates: data.cityRates || offlineCityGoldRates,
          historicalTrends: data.historicalTrends || offlineHistoricalData,
        };
      }
    } catch (e) {
      // fallback
    }
    return {
      rates: offlineGoldRates,
      silver: offlineSilverRates,
      cityRates: offlineCityGoldRates,
      historicalTrends: offlineHistoricalData,
    };
  },

  async getFuelRates(): Promise<FuelRateItem[]> {
    try {
      const res = await fetch('/api/rates/fuel');
      if (res.ok) {
        const data = await res.json();
        return data.products || offlineFuelRates;
      }
    } catch (e) {
      // fallback
    }
    return offlineFuelRates;
  },

  async getCurrencies(): Promise<CurrencyItem[]> {
    try {
      const res = await fetch('/api/rates/currencies');
      if (res.ok) {
        const data = await res.json();
        return data.currencies || offlineCurrencies;
      }
    } catch (e) {
      // fallback
    }
    return offlineCurrencies;
  },

  async getCrypto(): Promise<CryptoRate[]> {
    try {
      const res = await fetch('/api/rates/crypto');
      if (res.ok) {
        const data = await res.json();
        return data.cryptos || offlineCryptoRates;
      }
    } catch (e) {
      // fallback
    }
    return offlineCryptoRates;
  },

  async getMandi(category?: string): Promise<MandiItem[]> {
    try {
      const url = category && category !== 'All' ? `/api/rates/mandi?category=${category}` : '/api/rates/mandi';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data.items || offlineMandiItems;
      }
    } catch (e) {
      // fallback
    }
    if (category && category !== 'All') {
      return offlineMandiItems.filter((i) => i.category.toLowerCase() === category.toLowerCase());
    }
    return offlineMandiItems;
  },

  async getWeatherAlerts(): Promise<WeatherAgriCity[]> {
    try {
      const res = await fetch('/api/weather/alerts');
      if (res.ok) {
        const data = await res.json();
        return data.cities || offlineCityWeather;
      }
    } catch (e) {
      // fallback
    }
    return offlineCityWeather;
  },

  async getNews(): Promise<MarketNewsItem[]> {
    try {
      const res = await fetch('/api/news');
      if (res.ok) {
        const data = await res.json();
        return data.news || offlineMarketNews;
      }
    } catch (e) {
      // fallback
    }
    return offlineMarketNews;
  },

  async getAudioGuides(): Promise<UrduAudioGuide[]> {
    try {
      const res = await fetch('/api/media/audio-guides');
      if (res.ok) {
        const data = await res.json();
        return data.guides || offlineAudioGuides;
      }
    } catch (e) {
      // fallback
    }
    return offlineAudioGuides;
  },

  // Generic POST tool runner with server call & client calculation fallback
  async postTool(endpoint: string, payload: any, clientFallbackFn: (input: any) => any) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.result) return data.result;
      }
    } catch (e) {
      // fallback to client calculation
    }
    return clientFallbackFn(payload);
  },
};
