/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Home,
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
  ArrowLeft,
  Sparkles,
  Menu,
} from 'lucide-react';

import { Header } from './components/Header.js';
import { TickerBar } from './components/TickerBar.js';
import { HomeHub } from './components/HomeHub.js';
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
import { AlertsSubscriptionModal } from './components/AlertsSubscriptionModal.js';
import { SideDrawer } from './components/SideDrawer.js';
import { RatesUpdaterModal, CustomRatesConfig, DEFAULT_RATES } from './components/RatesUpdaterModal.js';

import { notificationManager } from './services/firebaseMessaging.js';
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
  // First page default is 'home' as requested
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Theme Management: 'dark' | 'light'
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ratezilla_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('ratezilla_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Modals & Drawers
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const [isRatesUpdaterOpen, setIsRatesUpdaterOpen] = useState<boolean>(false);
  const [isSpeedTestOpen, setIsSpeedTestOpen] = useState<boolean>(false);
  const [isAudioGuideOpen, setIsAudioGuideOpen] = useState<boolean>(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState<boolean>(false);

  // Data states initialized with offline defaults
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

  // Custom rates overrides from localStorage
  const applyCustomRates = (config: CustomRatesConfig) => {
    // Override gold rates
    setGoldRates((prev) =>
      prev.map((item) => {
        if (item.carat.startsWith('24K')) {
          const per10Gram = Math.round((config.gold24kTola / 11.664) * 10);
          const perGram = Math.round(config.gold24kTola / 11.664);
          return { ...item, perTola: config.gold24kTola, per10Gram, perGram };
        }
        if (item.carat.startsWith('22K')) {
          const per10Gram = Math.round((config.gold22kTola / 11.664) * 10);
          const perGram = Math.round(config.gold22kTola / 11.664);
          return { ...item, perTola: config.gold22kTola, per10Gram, perGram };
        }
        if (item.carat.startsWith('21K')) {
          const per10Gram = Math.round((config.gold21kTola / 11.664) * 10);
          const perGram = Math.round(config.gold21kTola / 11.664);
          return { ...item, perTola: config.gold21kTola, per10Gram, perGram };
        }
        if (item.carat.startsWith('18K')) {
          const per10Gram = Math.round((config.gold18kTola / 11.664) * 10);
          const perGram = Math.round(config.gold18kTola / 11.664);
          return { ...item, perTola: config.gold18kTola, per10Gram, perGram };
        }
        return item;
      })
    );

    // Override silver
    setSilverRate({
      perTola: config.silverTola,
      per10Gram: Math.round((config.silverTola / 11.664) * 10),
      perGram: Number((config.silverTola / 11.664).toFixed(2)),
      change24h: 75,
      direction: 'up',
    });

    // Override city gold rates proportionally
    setCityGoldRates((prev) =>
      prev.map((c) => ({
        ...c,
        tola24k: config.gold24kTola + c.diffFromKarachi,
        tola22k: Math.round((config.gold24kTola + c.diffFromKarachi) * (0.916 / 0.999)),
      }))
    );

    // Override fuel rates
    setFuelRates((prev) =>
      prev.map((f) => {
        if (f.id === 'petrol') return { ...f, currentPrice: config.petrolPrice };
        if (f.id === 'diesel') return { ...f, currentPrice: config.dieselPrice };
        if (f.id === 'hobc') return { ...f, currentPrice: config.hobcPrice };
        if (f.id === 'lpg_cyl') return { ...f, currentPrice: config.lpgCylinderPrice };
        if (f.id === 'lpg_kg') return { ...f, currentPrice: config.lpgKgPrice };
        return f;
      })
    );

    // Override currency USD
    setCurrencies((prev) =>
      prev.map((curr) => {
        if (curr.code === 'USD') {
          return {
            ...curr,
            interbankSell: config.usdPkr,
            interbankBuy: config.usdPkr - 0.5,
            openMarketSell: config.usdPkr + 2.0,
            openMarketBuy: config.usdPkr + 0.8,
          };
        }
        return curr;
      })
    );
  };

  const handleSaveCustomRates = (newRates: CustomRatesConfig) => {
    localStorage.setItem('ratezilla_custom_rates', JSON.stringify(newRates));
    applyCustomRates(newRates);
  };

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

      // Check if custom rates exist in localStorage to re-apply user overrides
      const saved = localStorage.getItem('ratezilla_custom_rates');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          applyCustomRates(parsed);
        } catch {}
      }
    } catch {
      console.warn('Using offline engine cache');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    notificationManager.initServiceWorker().catch(() => {});
  }, []);

  const toolTabs = [
    { id: 'home', label: 'Home Hub', icon: Home, urdu: 'مرکزی صفحہ' },
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
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-[#050d08] text-slate-100 selection:bg-[#00401a] selection:text-[#ffd700]'
          : 'bg-[#f4f7f5] text-slate-900 selection:bg-emerald-200 selection:text-emerald-950'
      }`}
    >
      {/* 3-Zone Header with 3-Lines Side Menu Button & Theme Switch */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSideMenu={() => setIsSideMenuOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenRatesUpdater={() => setIsRatesUpdaterOpen(true)}
        onOpenAudioGuides={() => setIsAudioGuideOpen(true)}
        onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
        onOpenAlerts={() => setIsAlertsOpen(true)}
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

      {/* Primary Tool Selector Ribbon (Only shown when browsing specific tools) */}
      {activeTab !== 'home' && (
        <div className="bg-white/80 dark:bg-[#07140b]/90 border-b border-gray-200 dark:border-[#00401a]/50 sticky top-16 z-30 overflow-x-auto py-2.5 px-4 backdrop-blur-md">
          <div className="max-w-6xl mx-auto flex items-center gap-2 min-w-max">
            {toolTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                      : 'bg-gray-100 dark:bg-[#050d08]/80 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white border border-gray-200 dark:border-[#00401a]/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                  <span>{tab.label}</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-urdu hidden sm:inline">
                    {tab.urdu}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {/* Navigation Breadcrumb & Back Button when in individual tool */}
        {activeTab !== 'home' && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1f2937] shadow-sm">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-all hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to All Portals (Home Hub)</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSideMenuOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-[#1f2937] dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#1f2937] text-xs font-semibold transition-colors"
              >
                <Menu className="w-3.5 h-3.5 text-emerald-500" />
                <span>All Pages Menu</span>
              </button>

              <button
                onClick={() => setIsRatesUpdaterOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Update Rates</span>
              </button>
            </div>
          </div>
        )}

        {/* First Page / Home Feature Hub */}
        {activeTab === 'home' && (
          <HomeHub
            setActiveTab={setActiveTab}
            goldRates={goldRates}
            silverRate={silverRate}
            fuelRates={fuelRates}
            currencies={currencies}
            cityGoldRates={cityGoldRates}
            onOpenRatesUpdater={() => setIsRatesUpdaterOpen(true)}
            onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
            onOpenAudioGuides={() => setIsAudioGuideOpen(true)}
            onOpenAlerts={() => setIsAlertsOpen(true)}
          />
        )}

        {/* Core Utility Sections */}
        {activeTab === 'gold' && (
          <GoldSection
            rates={goldRates}
            silverRate={silverRate}
            cityRates={cityGoldRates}
            history={goldHistory}
            onOpenAlerts={() => setIsAlertsOpen(true)}
            onBackToHome={() => setActiveTab('home')}
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

      {/* CLEAN SPACIOUS STATIC FOOTER (No Floating Bottom Bars) */}
      <footer className="mt-auto bg-white dark:bg-[#111827] border-t border-gray-200 dark:border-[#1f2937] py-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center space-x-3 mb-4 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-400 flex items-center justify-center text-white font-black text-lg shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              R
            </div>
            <span className="text-xl font-black font-heading text-gray-900 dark:text-white">
              RateZilla
            </span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
            RateZilla is Pakistan's API-driven live market rates and utility portal, providing reliable benchmark calculations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-6">
            <button onClick={() => setActiveTab('home')} className="hover:text-emerald-500 transition-colors">Home Hub</button>
            <span>•</span>
            <button onClick={() => setActiveTab('gold')} className="hover:text-amber-500 transition-colors">Sarafa Gold</button>
            <span>•</span>
            <button onClick={() => setActiveTab('solar')} className="hover:text-yellow-500 transition-colors">Solar System</button>
            <span>•</span>
            <button onClick={() => setActiveTab('fuel')} className="hover:text-blue-500 transition-colors">OGRA Fuel</button>
            <span>•</span>
            <button onClick={() => setActiveTab('tax')} className="hover:text-purple-500 transition-colors">FBR Tax</button>
            <span>•</span>
            <button onClick={() => setActiveTab('zakat')} className="hover:text-emerald-500 transition-colors">Nisab Zakat</button>
            <span>•</span>
            <button onClick={() => setIsSideMenuOpen(true)} className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:underline">
              <Menu className="w-3.5 h-3.5" />
              <span>All 11 Tools Menu</span>
            </button>
          </div>

          <div className="text-xs text-gray-400 dark:text-gray-500">
            &copy; 2026 RateZilla. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 3-Lines Side Drawer Menu */}
      <SideDrawer
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenRatesUpdater={() => setIsRatesUpdaterOpen(true)}
        onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
        onOpenAudioGuides={() => setIsAudioGuideOpen(true)}
        onOpenAlerts={() => setIsAlertsOpen(true)}
      />

      {/* Rates Updater & Script Modal */}
      <RatesUpdaterModal
        isOpen={isRatesUpdaterOpen}
        onClose={() => setIsRatesUpdaterOpen(false)}
        currentRates={{
          gold24kTola: goldRates[0]?.perTola,
          gold22kTola: goldRates[1]?.perTola,
          silverTola: silverRate?.perTola,
          petrolPrice: fuelRates[0]?.currentPrice,
          dieselPrice: fuelRates[1]?.currentPrice,
          solarWattPrice: 41.5,
          usdPkr: currencies[0]?.interbankSell,
        }}
        onSaveRates={handleSaveCustomRates}
      />

      {/* Interactive Modals */}
      <SpeedTestModal
        isOpen={isSpeedTestOpen}
        onClose={() => setIsSpeedTestOpen(false)}
      />

      <AudioGuideModal
        isOpen={isAudioGuideOpen}
        onClose={() => setIsAudioGuideOpen(false)}
        guides={audioGuides}
      />

      <AlertsSubscriptionModal
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
      />
    </div>
  );
}
