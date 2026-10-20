/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Coins,
  Sun,
  Fuel,
  Zap,
  Briefcase,
  Moon,
  DollarSign,
  Wheat,
  Car,
  Building2,
  Newspaper,
  Activity,
  Headphones,
} from 'lucide-react';

import { Header } from './components/Header.js';
import { TickerBar } from './components/TickerBar.js';
import { GoldSection } from './components/GoldSection.js';
import { SolarSection } from './components/SolarSection.js';
import { FuelSection } from './components/FuelSection.js';
import { ElectricitySection } from './components/ElectricitySection.js';
import { TaxSection } from './components/TaxSection.js';
import { ZakatSection } from './components/ZakatSection.js';
import { CurrencyCryptoSection } from './components/CurrencyCryptoSection.js';
import { MandiWeatherSection } from './components/MandiWeatherSection.js';
import { VehicleTaxSection } from './components/VehicleTaxSection.js';
import { ConstructionSection } from './components/ConstructionSection.js';
import { MarketNewsSection } from './components/MarketNewsSection.js';
import { SpeedTestModal } from './components/SpeedTestModal.js';
import { AudioGuideModal } from './components/AudioGuideModal.js';
import { Footer } from './components/Footer.js';

import { apiService } from './services/apiService.js';
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
} from './types/market.js';

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
} from './services/offlineEngine.js';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('gold');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Modals
  const [isSpeedTestOpen, setIsSpeedTestOpen] = useState<boolean>(false);
  const [isAudioGuideOpen, setIsAudioGuideOpen] = useState<boolean>(false);

  // Data states initialized with offline defaults for 0ms initial render
  const [goldRates, setGoldRates] = useState<GoldRateItem[]>(offlineGoldRates);
  const [silverRate, setSilverRate] = useState(offlineSilverRates);
  const [cityGoldRates, setCityGoldRates] = useState<CityGoldRate[]>(offlineCityGoldRates);
  const [goldHistory, setGoldHistory] = useState<HistoricalPricePoint[]>(offlineHistoricalData);
  const [fuelRates, setFuelRates] = useState<FuelRateItem[]>(offlineFuelRates);
  const [currencies, setCurrencies] = useState<CurrencyItem[]>(offlineCurrencies);
  const [cryptos, setCryptos] = useState<CryptoRate[]>(offlineCryptoRates);
  const [mandiItems, setMandiItems] = useState<MandiItem[]>(offlineMandiItems);
  const [weatherCities, setWeatherCities] = useState<WeatherAgriCity[]>(offlineCityWeather);
  const [news, setNews] = useState<MarketNewsItem[]>(offlineMarketNews);
  const [audioGuides, setAudioGuides] = useState<UrduAudioGuide[]>(offlineAudioGuides);

  const fetchAllData = async () => {
    setIsRefreshing(true);
    try {
      const [goldRes, fuelRes, currRes, cryptoRes, mandiRes, weatherRes, newsRes, guidesRes] =
        await Promise.all([
          apiService.getGoldRates(),
          apiService.getFuelRates(),
          apiService.getCurrencies(),
          apiService.getCrypto(),
          apiService.getMandi(),
          apiService.getWeatherAlerts(),
          apiService.getNews(),
          apiService.getAudioGuides(),
        ]);

      if (goldRes) {
        setGoldRates(goldRes.rates);
        setSilverRate(goldRes.silver);
        setCityGoldRates(goldRes.cityRates);
        setGoldHistory(goldRes.historicalTrends);
      }
      if (fuelRes) setFuelRates(fuelRes);
      if (currRes) setCurrencies(currRes);
      if (cryptoRes) setCryptos(cryptoRes);
      if (mandiRes) setMandiItems(mandiRes);
      if (weatherRes) setWeatherCities(weatherRes);
      if (newsRes) setNews(newsRes);
      if (guidesRes) setAudioGuides(guidesRes);
    } catch (e) {
      console.warn('Using offline engine cache');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const toolTabs = [
    { id: 'gold', label: 'Sarafa Gold & Simulator', icon: Coins, urdu: 'صرافہ سونا' },
    { id: 'solar', label: 'Solar Panel Sizing & ROI', icon: Sun, urdu: 'شمسی توانائی' },
    { id: 'fuel', label: 'OGRA Fuel & Trip Planner', icon: Fuel, urdu: 'پٹرول ریٹس' },
    { id: 'electricity', label: 'WAPDA Bills & Duplicate', icon: Zap, urdu: 'بجلی کا بل' },
    { id: 'tax', label: 'FBR Tax Slabs 2025-26', icon: Briefcase, urdu: 'انکم ٹیکس' },
    { id: 'zakat', label: 'Nisab Zakat Calculator', icon: Moon, urdu: 'زکوٰۃ' },
    { id: 'currency', label: 'Forex & Crypto Tracker', icon: DollarSign, urdu: 'کرنسی و کرپٹو' },
    { id: 'mandi', label: 'Ghalla Mandi & Weather', icon: Wheat, urdu: 'غلہ منڈی' },
    { id: 'vehicle-tax', label: 'Vehicle Token Tax', icon: Car, urdu: 'ٹوکن ٹیکس' },
    { id: 'construction', label: 'Construction Cost BOQ', icon: Building2, urdu: 'تعمیراتی لاگت' },
    { id: 'news', label: 'Market Bulletins & News', icon: Newspaper, urdu: 'تازہ خبریں' },
  ];

  return (
    <div className="min-h-screen bg-[#050d08] text-slate-100 flex flex-col font-sans selection:bg-[#00401a] selection:text-[#ffd700]">
      {/* 3-Zone Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAudioGuides={() => setIsAudioGuideOpen(true)}
        onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
      />

      {/* Live Market Ticker Ribbon */}
      <TickerBar
        goldItem={goldRates[0]}
        petrolItem={fuelRates[0]}
        dieselItem={fuelRates[1]}
        usdItem={currencies[0]}
        sarItem={currencies[3]}
        cryptoItem={cryptos[0]}
        onRefresh={fetchAllData}
        isRefreshing={isRefreshing}
      />

      {/* Primary Tool Selector Ribbon */}
      <div className="bg-[#07140b] border-b border-[#00401a]/50 sticky top-16 z-30 overflow-x-auto py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          {toolTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#00401a] text-[#ffd700] border border-[#ffd700]/40 shadow-lg shadow-[#00401a]/30'
                    : 'bg-[#050d08]/80 text-slate-400 hover:text-white border border-[#00401a]/40 hover:border-emerald-600/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ffd700]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className="text-[10px] text-emerald-400/80 font-urdu hidden sm:inline">
                  {tab.urdu}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'gold' && (
          <GoldSection
            rates={goldRates}
            silverRate={silverRate}
            cityRates={cityGoldRates}
            history={goldHistory}
          />
        )}

        {activeTab === 'solar' && <SolarSection />}

        {activeTab === 'fuel' && <FuelSection fuelRates={fuelRates} />}

        {activeTab === 'electricity' && <ElectricitySection />}

        {activeTab === 'tax' && <TaxSection />}

        {activeTab === 'zakat' && <ZakatSection />}

        {activeTab === 'currency' && (
          <CurrencyCryptoSection currencies={currencies} cryptos={cryptos} />
        )}

        {activeTab === 'mandi' && (
          <MandiWeatherSection mandiItems={mandiItems} weatherCities={weatherCities} />
        )}

        {activeTab === 'vehicle-tax' && <VehicleTaxSection />}

        {activeTab === 'construction' && <ConstructionSection />}

        {activeTab === 'news' && <MarketNewsSection news={news} />}
      </main>

      {/* Modals */}
      <SpeedTestModal
        isOpen={isSpeedTestOpen}
        onClose={() => setIsSpeedTestOpen(false)}
      />

      <AudioGuideModal
        isOpen={isAudioGuideOpen}
        onClose={() => setIsAudioGuideOpen(false)}
        guides={audioGuides}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
