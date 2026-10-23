import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { OfflineBanner } from './components/OfflineBanner';
import { SideDrawer } from './components/SideDrawer';
import { HomeHub } from './components/HomeHub';
import { GoldRates } from './components/GoldRates';
import { SolarCalculator } from './components/SolarCalculator';
import { FuelRates } from './components/FuelRates';
import { ElectricityBill } from './components/ElectricityBill';
import { IncomeTax } from './components/IncomeTax';
import { ZakatCalculator } from './components/ZakatCalculator';
import { CurrencyForex } from './components/CurrencyForex';
import { MandiRates } from './components/MandiRates';
import { VehicleTax } from './components/VehicleTax';
import { ConstructionCost } from './components/ConstructionCost';
import { MarketNews } from './components/MarketNews';
import { AdvancedFinancialTools } from './components/AdvancedFinancialTools';
import { RatesUpdaterModal } from './components/RatesUpdaterModal';
import { ProModal } from './components/ProModal';
import { RateZillaLogo } from './components/RateZillaLogo';
import { Menu, Sparkles, Share2 } from 'lucide-react';
import {
  loadOfflineCache,
  saveOfflineCache,
  fetchAllMarketRates,
  MarketCacheData
} from './services/apiService';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isRatesUpdaterOpen, setIsRatesUpdaterOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  // Connectivity & Cache State
  const [isOffline, setIsOffline] = useState<boolean>(typeof navigator !== 'undefined' ? !navigator.onLine : false);
  const [wasOffline, setWasOffline] = useState<boolean>(false);
  const [marketData, setMarketData] = useState<MarketCacheData>(() => loadOfflineCache());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initialize Theme
  useEffect(() => {
    const savedTheme = (localStorage.getItem('ratezilla_theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('ratezilla_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Connectivity Listeners
  const refreshRates = useCallback(async () => {
    setIsRefreshing(true);
    const { data, isFromCache } = await fetchAllMarketRates();
    setMarketData(data);
    setIsOffline(isFromCache);
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setWasOffline(true);
      refreshRates();
      setTimeout(() => setWasOffline(false), 5000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      // Immediately fallback to cache
      setMarketData(loadOfflineCache());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial fetch on mount
    refreshRates();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [refreshRates]);

  // Integrated Global IntersectionObserver: triggers 'active' on all '.reveal-element' components as user scrolls down dashboard
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const observeRevealElements = () => {
      const elements = document.querySelectorAll('.reveal-element');
      elements.forEach((el) => observer.observe(el));
    };

    observeRevealElements();
    const timer = setTimeout(observeRevealElements, 100);

    const mutationObserver = new MutationObserver(() => {
      observeRevealElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [activeTab]);

  // Handle manual rates update from RatesUpdaterModal
  const handleSaveManualRates = (updated: {
    gold24k: number;
    gold22k: number;
    silver: number;
    petrol: number;
    diesel: number;
    usdpkr: number;
  }) => {
    const updatedGold = marketData.goldRates.map((g) => {
      if (g.carat.startsWith('24K')) {
        return {
          ...g,
          perTola: updated.gold24k,
          per10Gram: Math.round((updated.gold24k / 11.66) * 10),
          perGram: Math.round(updated.gold24k / 11.66)
        };
      }
      if (g.carat.startsWith('22K')) {
        return {
          ...g,
          perTola: updated.gold22k,
          per10Gram: Math.round((updated.gold22k / 11.66) * 10),
          perGram: Math.round(updated.gold22k / 11.66)
        };
      }
      return g;
    });

    const updatedSilver = {
      ...marketData.silverRate,
      perTola: updated.silver,
      per10Gram: Math.round((updated.silver / 11.66) * 10),
      perGram: Math.round(updated.silver / 11.66)
    };

    const updatedFuel = marketData.fuelRates.map((f, i) => {
      if (i === 0) return { ...f, currentPrice: updated.petrol };
      if (i === 1) return { ...f, currentPrice: updated.diesel };
      return f;
    });

    const updatedCurrencies = marketData.currencies.map((c) => {
      if (c.code === 'USD') return { ...c, interbankSell: updated.usdpkr, interbankBuy: updated.usdpkr - 0.20 };
      return c;
    });

    const newMarketData: MarketCacheData = {
      ...marketData,
      goldRates: updatedGold,
      silverRate: updatedSilver,
      fuelRates: updatedFuel,
      currencies: updatedCurrencies,
      lastUpdated: 'Manual Update (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')'
    };

    setMarketData(newMarketData);
    saveOfflineCache(newMarketData);
  };

  const handleShareApp = () => {
    const text = 'RateZilla: Real-time Pakistan market rates, 24K Gold, OGRA petrol prices, and 11 financial calculators.';
    if (navigator.share) {
      navigator.share({ title: 'RateZilla Pakistan', text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-gray-100 transition-colors duration-200">
      {/* Sticky Header */}
      <Header
        onOpenSideMenu={() => setIsSideDrawerOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenRatesUpdater={() => setIsRatesUpdaterOpen(true)}
        onOpenProModal={() => setIsProModalOpen(true)}
        isOffline={isOffline}
        onRefreshRates={refreshRates}
        onGoHome={() => setActiveTab('home')}
      />

      {/* Connectivity Banner (Offline Mode Feedback) */}
      <OfflineBanner
        isOffline={isOffline}
        wasOffline={wasOffline}
        lastUpdated={marketData.lastUpdated}
        onRefresh={refreshRates}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeHub
            setActiveTab={setActiveTab}
            goldRates={marketData.goldRates}
            silverRate={marketData.silverRate}
            fuelRates={marketData.fuelRates}
            currencies={marketData.currencies}
            cityGoldRates={marketData.cityGoldRates}
            onOpenRatesUpdater={() => setIsRatesUpdaterOpen(true)}
            lastUpdated={marketData.lastUpdated}
          />
        )}

        {activeTab === 'gold' && (
          <GoldRates
            rates={marketData.goldRates}
            silverRate={marketData.silverRate}
            cityRates={marketData.cityGoldRates}
            history={marketData.historicalTrends}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'fuel' && (
          <FuelRates
            fuelRates={marketData.fuelRates}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'solar' && (
          <SolarCalculator onBackToHome={() => setActiveTab('home')} />
        )}

        {activeTab === 'tax' && (
          <IncomeTax onBackToHome={() => setActiveTab('home')} />
        )}

        {activeTab === 'zakat' && (
          <ZakatCalculator
            goldRates={marketData.goldRates}
            silverRate={marketData.silverRate}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'currency' && (
          <CurrencyForex
            currencies={marketData.currencies}
            cryptos={marketData.cryptos}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'electricity' && (
          <ElectricityBill onBackToHome={() => setActiveTab('home')} />
        )}

        {activeTab === 'mandi' && (
          <MandiRates
            mandiItems={marketData.mandiItems}
            weatherCities={marketData.weatherCities}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'vehicle-tax' && (
          <VehicleTax onBackToHome={() => setActiveTab('home')} />
        )}

        {activeTab === 'construction' && (
          <ConstructionCost onBackToHome={() => setActiveTab('home')} />
        )}

        {activeTab === 'news' && (
          <MarketNews onBackToHome={() => setActiveTab('home')} />
        )}

        {activeTab === 'advanced-tools' && (
          <AdvancedFinancialTools
            currencies={marketData.currencies}
            goldRates={marketData.goldRates}
            fuelRates={marketData.fuelRates}
            onBackToHome={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Clean Static Footer (User Request: "Jo app ki info bottom ma Di ah har page k is KO surf 3 lines ho gi jis KO open Kar k Sara menu Hoga is k bottom ma Kar do") */}
      <footer className="mt-16 bg-[#080c14] border-t border-gray-800/80 py-12 transition-colors">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-5">
          {/* Brand Logo in Footer */}
          <div
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center cursor-pointer group"
          >
            <RateZillaLogo size="md" />
          </div>

          <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
            RateZilla is Pakistan&apos;s real-time financial market benchmark and utility portal, providing live Sarafa bullion, OGRA fuel, and offline utility estimators.
          </p>

          {/* Quick 3-Lines Menu Trigger in Footer */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-gray-300">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#00FF87] transition-colors cursor-pointer"
            >
              Home Hub
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveTab('gold');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Sarafa Gold
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveTab('fuel');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              OGRA Fuel
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveTab('solar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-yellow-400 transition-colors cursor-pointer"
            >
              Solar ROI
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveTab('tax');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-purple-400 transition-colors cursor-pointer"
            >
              FBR Tax
            </button>
            <span>•</span>
            <button
              onClick={() => setIsSideDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00FF87]/15 hover:bg-[#00FF87]/25 text-[#00FF87] border border-[#00FF87]/40 transition-all cursor-pointer font-bold"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>All 11 Pages Menu</span>
            </button>
          </div>

          <div className="pt-4 border-t border-gray-800/80 text-[11px] text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 RateZilla Pakistan. Offline Mode Enabled.</span>
            <span>All Rates Verified via Official Sarafa, OGRA & SBP Benchmarks</span>
          </div>
        </div>
      </footer>

      {/* 3-Lines Side Drawer Menu */}
      <SideDrawer
        isOpen={isSideDrawerOpen}
        onClose={() => setIsSideDrawerOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenRatesUpdater={() => setIsRatesUpdaterOpen(true)}
      />

      {/* Rates Updater Modal & Automation Script */}
      <RatesUpdaterModal
        isOpen={isRatesUpdaterOpen}
        onClose={() => setIsRatesUpdaterOpen(false)}
        goldRates={marketData.goldRates}
        silverRate={marketData.silverRate}
        fuelRates={marketData.fuelRates}
        currencies={marketData.currencies}
        onSaveManualRates={handleSaveManualRates}
      />

      {/* RateZilla PRO Modal */}
      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </div>
  );
}
export default App;
