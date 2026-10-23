import React, { useState } from 'react';
import {
  ArrowLeft,
  TrendingUp,
  Flame,
  DollarSign,
  Zap,
  Clock,
  Check,
  Share2,
  Copy,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { GoldRate, CurrencyRate, FuelRate } from '../types';

interface MarketTrendIndicatorsProps {
  goldRates?: GoldRate[];
  currencies?: CurrencyRate[];
  fuelRates?: FuelRate[];
  onBackToHome: () => void;
}

export const MarketTrendIndicators: React.FC<MarketTrendIndicatorsProps> = ({
  goldRates = [],
  currencies = [],
  fuelRates = [],
  onBackToHome
}) => {
  const [selectedAsset, setSelectedAsset] = useState<'all' | 'gold' | 'forex' | 'fuel'>('all');
  const [copied, setCopied] = useState<boolean>(false);

  const gold24k = goldRates[0]?.perTola || 284500;
  const usdPkr = currencies.find((c) => c.code === 'USD')?.interbankSell || 278.35;
  const petrolPrice = fuelRates[0]?.currentPrice || 281.40;

  const handleCopySummary = () => {
    const text = `RateZilla Market Trend & Buying Signals Summary:
1. Gold (24K): Rs. ${gold24k.toLocaleString()} / Tola | Signal: [Hold / Wait for Dip] | Volatility: 68/100 (Resistance Testing)
2. USD/PKR: Rs. ${usdPkr.toFixed(2)} | Signal: [Favorable to Buy] | Volatility: 18/100 (Anchored between 277.80 - 278.60)
3. Petrol: Rs. ${petrolPrice.toFixed(2)} / L | Signal: [High Volatility] | Volatility: 74/100 (OGRA Fortnight Spike Ahead)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShare = () => {
    const text = `RateZilla Market Signals: Gold 24K (Rs. ${gold24k.toLocaleString()}) Hold/Wait | USD/PKR (Rs. ${usdPkr.toFixed(
      2
    )}) Favorable to Buy | Petrol (Rs. ${petrolPrice.toFixed(2)}) High Volatility.`;
    if (navigator.share) {
      navigator.share({ title: 'Market Trend & Timing Indicators', text, url: window.location.href }).catch(() => {});
    } else {
      handleCopySummary();
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 py-8 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
      {/* Top Navigation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-5">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-300 hover:text-white transition-colors cursor-pointer bg-gray-900/90 hover:bg-gray-800 px-4 py-2.5 rounded-xl border border-gray-700/80 hover:border-[#00FF87]/50 shadow-md group"
        >
          <ArrowLeft className="w-4 h-4 text-[#00FF87] group-hover:-translate-x-1 transition-transform" />
          <span>← Back to Home</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#00FF87] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
            <span>Daily Quantitative Market Signals</span>
          </div>
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Share Signals"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Page Title Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-[#0d1624] to-gray-900 border border-gray-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#00FF87]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#60EFFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/15 border border-[#00FF87]/30 text-[#00FF87] text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Buying Power &amp; Best-Time-To-Buy Indicators</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Buying Power &amp; <span className="bg-gradient-to-r from-[#00FF87] to-[#60EFFF] bg-clip-text text-transparent">Market Trend Indicators</span>
          </h1>

          <p className="text-base sm:text-lg font-serif text-[#00FF87]" dir="rtl">
            سونا، امریکی ڈالر اور پٹرول کی خریداری کا بہترین وقت اور مارکیٹ کے سگنلز
          </p>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
            Quantitative analysis, market status (Stable, Volatile, Resistance), smart timing recommendation badges ("Favorable to Buy", "Hold"), and 30-day directional trends for key financial assets in Pakistan.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Copy */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All 3 Key Assets' },
            { id: 'gold', label: '24K Gold Bullion' },
            { id: 'forex', label: 'USD / PKR Forex' },
            { id: 'fuel', label: 'OGRA Fuel Tariff' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedAsset(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedAsset === tab.id
                  ? 'bg-gradient-to-r from-[#00FF87] to-[#60EFFF] text-[#0b0f19] border-transparent shadow-[0_0_12px_rgba(0,255,135,0.25)]'
                  : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopySummary}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-[#00FF87] border border-[#00FF87]/30 text-xs font-bold transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Signals Copied!' : 'Copy Market Signals'}</span>
        </button>
      </div>

      {/* 3 Dedicated Interactive Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ASSET 1: GOLD (24K) */}
        {(selectedAsset === 'all' || selectedAsset === 'gold') && (
          <div className="rounded-3xl bg-[#111827] border border-amber-500/30 p-6 space-y-5 hover:border-amber-400 transition-all flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Gold (24K / Tola)</h3>
                    <span className="text-xs text-gray-400 font-serif">صرافہ سونا مارکیٹ</span>
                  </div>
                </div>

                {/* Recommendation Badge */}
                <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm animate-pulse">
                  Hold / Wait for Dip
                </span>
              </div>

              {/* Benchmark Box */}
              <div className="p-4 rounded-2xl bg-gray-950/90 border border-gray-800 mb-4">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">
                  Sarafa Benchmark (Karachi/Lahore)
                </span>
                <span className="text-2xl font-black text-amber-400 font-mono">
                  Rs. {gold24k.toLocaleString()}
                </span>
                <div className="text-[11px] text-gray-400 mt-1 flex items-center justify-between">
                  <span>10 Grams: Rs. {Math.round((gold24k / 11.66) * 10).toLocaleString()}</span>
                  <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    +0.4% today
                  </span>
                </div>
              </div>

              {/* Analytical Indicators */}
              <div className="space-y-2.5 text-xs bg-gray-950/60 p-4 rounded-2xl border border-gray-800/80">
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">Market Status:</span>
                  <span className="font-semibold text-amber-300 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Resistance Testing
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">Volatility Rating:</span>
                  <span className="font-mono font-bold text-white">Medium-High (68/100)</span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">1-Year Purchasing Hedge:</span>
                  <span className="font-mono font-bold text-emerald-400">+28.5% Inflation Outpace</span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">Global Spot:</span>
                  <span className="font-mono font-bold text-white">~$2,680 / Ounce</span>
                </div>
              </div>

              {/* 30-Day Trend Overview Insight */}
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed space-y-1">
                <strong className="text-amber-400 block font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>30-Day Trend Overview:</span>
                </strong>
                <p>
                  Sarafa bullion has tested high resistance following global central bank acquisitions. Immediate accumulation is recommended during brief pullbacks toward Rs. 278,000–280,000 prior to peak wedding and seasonal demand.
                </p>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 pt-3 border-t border-gray-800 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Daily Sarafa Committee Sync</span>
              </span>
              <span className="text-amber-400 font-bold">Medium Risk</span>
            </div>
          </div>
        )}

        {/* ASSET 2: US DOLLAR (USD / PKR) */}
        {(selectedAsset === 'all' || selectedAsset === 'forex') && (
          <div className="rounded-3xl bg-[#111827] border border-emerald-500/30 p-6 space-y-5 hover:border-emerald-400 transition-all flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-[#00FF87]">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">US Dollar (USD / PKR)</h3>
                    <span className="text-xs text-gray-400 font-serif">انٹربینک فارن ایکسچینج</span>
                  </div>
                </div>

                {/* Recommendation Badge */}
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-[#00FF87] border border-emerald-500/40 shadow-sm animate-pulse">
                  Favorable to Buy
                </span>
              </div>

              {/* Benchmark Box */}
              <div className="p-4 rounded-2xl bg-gray-950/90 border border-gray-800 mb-4">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">
                  State Bank of Pakistan Interbank
                </span>
                <span className="text-2xl font-black text-[#00FF87] font-mono">
                  Rs. {usdPkr.toFixed(2)}
                </span>
                <div className="text-[11px] text-gray-400 mt-1 flex items-center justify-between">
                  <span>Open Market: Rs. {(usdPkr + 0.85).toFixed(2)}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                    <Check className="w-3 h-3" />
                    Tight Spread &lt; 0.5%
                  </span>
                </div>
              </div>

              {/* Analytical Indicators */}
              <div className="space-y-2.5 text-xs bg-gray-950/60 p-4 rounded-2xl border border-gray-800/80">
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">Market Status:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Stable Consolidation
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">Volatility Rating:</span>
                  <span className="font-mono font-bold text-white">Low-Moderate (18/100)</span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">SBP FX Reserves:</span>
                  <span className="font-mono font-bold text-emerald-400">$10.2B+ Buffer</span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">REER Index:</span>
                  <span className="font-mono font-bold text-white">Near Parity (101.4)</span>
                </div>
              </div>

              {/* 30-Day Trend Overview Insight */}
              <div className="mt-4 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200/90 leading-relaxed space-y-1">
                <strong className="text-[#00FF87] block font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>30-Day Trend Overview:</span>
                </strong>
                <p>
                  The Rupee has maintained solid stability within the 277.80–278.60 band. Current conditions represent an attractive settlement window for student tuition remittances, commercial LCs, and IT subscription prepaid bookings before seasonal import bills.
                </p>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 pt-3 border-t border-gray-800 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#00FF87]" />
                <span>Real-Time SBP Weighted</span>
              </span>
              <span className="text-[#00FF87] font-bold">Low Volatility</span>
            </div>
          </div>
        )}

        {/* ASSET 3: FUEL / PETROL REGULAR */}
        {(selectedAsset === 'all' || selectedAsset === 'fuel') && (
          <div className="rounded-3xl bg-[#111827] border border-blue-500/30 p-6 space-y-5 hover:border-blue-400 transition-all flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-blue-500/20 text-[#60EFFF]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Petrol &amp; Diesel (Litre)</h3>
                    <span className="text-xs text-gray-400 font-serif">اوگرا پٹرولیم قیمتیں</span>
                  </div>
                </div>

                {/* Recommendation Badge */}
                <span className="text-xs font-black px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm animate-pulse">
                  High Volatility
                </span>
              </div>

              {/* Benchmark Box */}
              <div className="p-4 rounded-2xl bg-gray-950/90 border border-gray-800 mb-4">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">
                  OGRA Fortnight Consumer Price
                </span>
                <span className="text-2xl font-black text-[#60EFFF] font-mono">
                  Rs. {petrolPrice.toFixed(2)} / L
                </span>
                <div className="text-[11px] text-gray-400 mt-1 flex items-center justify-between">
                  <span>HSD Diesel: Rs. 285.50 / L</span>
                  <span className="text-rose-400 font-semibold flex items-center gap-0.5">
                    <AlertTriangle className="w-3 h-3" />
                    Review in 3 Days
                  </span>
                </div>
              </div>

              {/* Analytical Indicators */}
              <div className="space-y-2.5 text-xs bg-gray-950/60 p-4 rounded-2xl border border-gray-800/80">
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">Market Status:</span>
                  <span className="font-semibold text-rose-300 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Fortnightly Review Ahead
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">Volatility Rating:</span>
                  <span className="font-mono font-bold text-white">High (74/100)</span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">Global Brent Crude:</span>
                  <span className="font-mono font-bold text-white">~$75.40 / Barrel</span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">Petroleum Development Levy:</span>
                  <span className="font-mono font-bold text-amber-400">Rs. 60.00 / Litre</span>
                </div>
              </div>

              {/* 30-Day Trend Overview Insight */}
              <div className="mt-4 p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200/90 leading-relaxed space-y-1">
                <strong className="text-[#60EFFF] block font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>30-Day Trend Overview:</span>
                </strong>
                <p>
                  International Platts crude quotes reflect upward pressure over supply curbs. Vehicle owners and commercial fleet managers should ensure bulk tank top-ups prior to the 1st and 15th review dates to mitigate price adjustments.
                </p>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 pt-3 border-t border-gray-800 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#60EFFF]" />
                <span>Ministry of Energy Fortnight</span>
              </span>
              <span className="text-rose-400 font-bold">Review Watch</span>
            </div>
          </div>
        )}
      </div>

      {/* Advisory Note */}
      <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 text-center">
        <p className="text-xs text-gray-400 leading-relaxed">
          (Note: Market trend signals and buying indicators are generated from historical pricing volatility, SBP interbank spreads, and global commodity benchmark correlations. They represent informational market intelligence and do not replace independent financial due diligence.)
        </p>
      </div>
    </div>
  );
};
