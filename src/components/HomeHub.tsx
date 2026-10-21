import React from 'react';
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
  Headphones,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Bell,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { ShareRatesButton } from './ShareRatesButton.js';
import { GoldRateItem, FuelRateItem, CurrencyItem, CityGoldRate } from '../types/market.js';

interface HomeHubProps {
  setActiveTab: (tab: string) => void;
  goldRates: GoldRateItem[];
  silverRate: { perTola: number; per10Gram: number; perGram: number };
  fuelRates: FuelRateItem[];
  currencies: CurrencyItem[];
  cityGoldRates: CityGoldRate[];
  onOpenRatesUpdater: () => void;
  onOpenSpeedTest: () => void;
  onOpenAudioGuides: () => void;
  onOpenAlerts: () => void;
}

export const HomeHub: React.FC<HomeHubProps> = ({
  setActiveTab,
  goldRates,
  silverRate,
  fuelRates,
  currencies,
  cityGoldRates,
  onOpenRatesUpdater,
  onOpenSpeedTest,
  onOpenAudioGuides,
  onOpenAlerts,
}) => {
  const gold24k = goldRates[0]?.perTola || 429500;
  const gold22k = goldRates[1]?.perTola || 393708;
  const silver = silverRate?.perTola || 6282;
  const petrol = fuelRates[0]?.currentPrice || 382.02;
  const diesel = fuelRates[1]?.currentPrice || 389.80;
  const usd = currencies[0]?.interbankSell || 278.35;

  const toolCards = [
    {
      id: 'gold',
      title: 'Sarafa Gold & Bullion Market',
      urdu: 'صرافہ سونا مارکیٹ اور منافع سمیلیٹر',
      desc: 'Live 24K, 22K, 21K, 18K purities, 7-day trend chart with crosshair lock, wastage/making calculator & city association rates.',
      icon: Coins,
      badge: '24K Spot: Rs. ' + gold24k.toLocaleString(),
      badgeColor: 'text-[#ffd700] bg-[#00401a] border-[#ffd700]/30',
      rateHighlight: `Rs. ${gold24k.toLocaleString()} / Tola`,
      subHighlight: `22K: Rs. ${gold22k.toLocaleString()} · Chandi: Rs. ${silver.toLocaleString()}`,
      actionText: 'Open Gold Section & Simulator',
    },
    {
      id: 'solar',
      title: 'Solar Panel System Sizing & Cost',
      urdu: 'شمسی پینل سائزنگ، لاگت اور نیٹ میٹرنگ',
      desc: 'Calculate exact solar kW system size from monthly WAPDA units, Tier-1 TopCon/Bifacial panel rates (Rs. 40-45/W), battery storage & ROI.',
      icon: Sun,
      badge: 'Tier-1: Rs. 40.00 - 45.00 / Watt',
      badgeColor: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
      rateHighlight: 'Rs. 40 - 45 / Watt',
      subHighlight: 'Jinko, Longi 585-590W · 2.5 Yr Capital Payback',
      actionText: 'Calculate Solar System',
    },
    {
      id: 'fuel',
      title: 'OGRA Fuel & LPG/CNG Benchmarks',
      urdu: 'اوگرا پٹرول، ڈیزل، ایل پی جی و سفر کا خرچ',
      desc: 'Official notification rates for Petrol, HSD, HOBC, Kerosene, LPG domestic/commercial cylinders and interactive city-to-city trip fuel planner.',
      icon: Fuel,
      badge: `Petrol: Rs. ${petrol.toFixed(2)}/L`,
      badgeColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
      rateHighlight: `Petrol: Rs. ${petrol.toFixed(2)} / L`,
      subHighlight: `Diesel: Rs. ${diesel.toFixed(2)} · LPG Cyl: Rs. 3,300`,
      actionText: 'View Fuel Rates & Plan Trip',
    },
    {
      id: 'electricity',
      title: 'WAPDA Bills & Duplicate Finder',
      urdu: 'بجلی کا بل تخمینہ و ڈپلیکیٹ بل',
      desc: 'Unit tariff slab calculations for LESCO, MEPCO, K-Electric, FESCO, GEPCO, IESCO with protected, non-protected slabs & FPA taxes.',
      icon: Zap,
      badge: 'LESCO / K-Electric / DISCOs',
      badgeColor: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
      rateHighlight: 'WAPDA Slab Tariffs',
      subHighlight: 'Protected & Non-Protected Units + Taxes Breakdown',
      actionText: 'Estimate Electricity Bill',
    },
    {
      id: 'tax',
      title: 'FBR Income Tax & Salary Slabs',
      urdu: 'ایف بی آر انکم ٹیکس و تنخواہ کیلکولیٹر',
      desc: 'Latest 2025-2026 progressive tax rates for salaried and business individuals, monthly withholding deductions & net take-home salary.',
      icon: Briefcase,
      badge: 'Tax Year 2025-2026',
      badgeColor: 'text-purple-400 bg-purple-950/40 border-purple-500/30',
      rateHighlight: 'Salary Tax 2025-26',
      subHighlight: 'Monthly Withholding & Annual Progressive Slabs',
      actionText: 'Calculate Salary Tax',
    },
    {
      id: 'zakat',
      title: 'Live Nisab Zakat Calculator',
      urdu: 'زکوٰۃ کیلکولیٹر بمع لائیو نصاب',
      desc: 'Automated 2.5% Zakat computation based on today’s live Sarafa Gold Nisab (7.5 Tola) and Silver Nisab (52.5 Tola) threshold values.',
      icon: Moon,
      badge: `Silver Nisab: Rs. ${(silver * 52.5).toLocaleString()}`,
      badgeColor: 'text-emerald-300 bg-emerald-950/50 border-emerald-400/30',
      rateHighlight: `Gold Nisab: Rs. ${(gold24k * 7.5).toLocaleString()}`,
      subHighlight: `Silver Nisab: Rs. ${(silver * 52.5).toLocaleString()} · 2.5% Rate`,
      actionText: 'Compute Zakat on Wealth',
    },
    {
      id: 'currency',
      title: 'Forex Exchange & Crypto Tracker',
      urdu: 'اوپن مارکیٹ کرنسی و کرپٹو ٹریکر',
      desc: 'State Bank interbank and open market exchange rates for USD, EUR, GBP, SAR, AED, CAD plus real-time Bitcoin, Ethereum, USDT benchmarks.',
      icon: DollarSign,
      badge: `USD: Rs. ${usd.toFixed(2)}`,
      badgeColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
      rateHighlight: `USD / PKR: Rs. ${usd.toFixed(2)}`,
      subHighlight: 'SAR, AED, GBP, EUR + Top Crypto to PKR',
      actionText: 'Track Currencies & Crypto',
    },
    {
      id: 'mandi',
      title: 'Ghalla Mandi & Agri Weather',
      urdu: 'غلہ منڈی ریٹس اور زرعی موسمی الرٹس',
      desc: 'Daily wholesale market rates for Gandum (Wheat), Basmati Super Rice, Cotton, Sugar, Desi Ghee with city Air Quality Index (AQI) advisories.',
      icon: Wheat,
      badge: 'Wheat (40kg): Rs. 3,850',
      badgeColor: 'text-yellow-400 bg-yellow-950/40 border-yellow-500/30',
      rateHighlight: 'Wheat: Rs. 3,850 / 40kg',
      subHighlight: 'Basmati Rice: Rs. 9,400 · Cotton: Rs. 8,200',
      actionText: 'Explore Mandi Bazaar',
    },
    {
      id: 'vehicle-tax',
      title: 'Vehicle Excise & Token Tax',
      urdu: 'گاڑیوں کا ایکسائز و سالانہ ٹوکن ٹیکس',
      desc: 'Engine displacement (cc) tax estimator for cars and motorcycles in Punjab, Sindh, and Islamabad, including filer vs non-filer transfer fees.',
      icon: Car,
      badge: 'Punjab / Sindh / ICT',
      badgeColor: 'text-blue-400 bg-blue-950/40 border-blue-500/30',
      rateHighlight: 'Car & Bike Token Tax',
      subHighlight: 'Under 1000cc to 2000cc+ Annual Schedule',
      actionText: 'Check Vehicle Token Tax',
    },
    {
      id: 'construction',
      title: 'House Construction Cost BOQ',
      urdu: 'مکان کی تعمیراتی لاگت اور میٹریل کا تخمینہ',
      desc: 'Comprehensive bill of quantities (BOQ) for 1-100 storeys, itemizing cement bags, bricks, deformed steel rebars, sand, labor & turnkey finish.',
      icon: Building2,
      badge: 'Gray Structure: Rs. 2,800/sq.ft',
      badgeColor: 'text-orange-400 bg-orange-950/40 border-orange-500/30',
      rateHighlight: 'BOQ Cost Calculator',
      subHighlight: 'Gray Structure & Turnkey A+ Per Sq Ft Rates',
      actionText: 'Calculate Building Cost',
    },
    {
      id: 'news',
      title: 'Market Bulletins & Rates News',
      urdu: 'روزانہ صرافہ اور پٹرولیم مارکیٹ نیوز',
      desc: 'Daily market notifications, OGRA fortnightly decisions, international bullion trends, and solar importer supply-chain updates.',
      icon: Newspaper,
      badge: 'Daily Feed Updates',
      badgeColor: 'text-rose-400 bg-rose-950/40 border-rose-500/30',
      rateHighlight: 'Live Market Bulletins',
      subHighlight: 'APSJA Bullion Summaries & OGRA Notifications',
      actionText: 'Read Market News',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Strip: Spacious Banner with High-Resolution Photography */}
      <div className="relative rounded-3xl overflow-hidden border border-[#ffd700]/30 bg-gradient-to-r from-[#00280f] via-[#041d0b] to-[#071309] shadow-2xl">
        {/* Subtle photo background */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
          <img
            src="/src/assets/images/gold_market_vault_1792513322078.jpg"
            alt="Sarafa Gold Bullion Vault"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative p-6 sm:p-10 lg:p-12 space-y-8">
          {/* Top Tag & Last Updated */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00401a]/80 border border-[#ffd700]/40 text-xs font-semibold text-[#ffd700]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pakistan Official Live Market Rates &amp; Utilities Engine</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Updated: Today</span>
              </span>
              <button
                type="button"
                onClick={onOpenRatesUpdater}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-[#050d08] bg-[#ffd700] hover:bg-[#ffe033] shadow-md shadow-[#ffd700]/20 transition-all active:scale-95"
              >
                <Sparkles className="w-3 h-3 text-[#050d08]" />
                <span>Update Rates Script</span>
              </button>
            </div>
          </div>

          {/* Main Title & Hero Copy */}
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Pakistan’s Ultimate Live Rates,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#ffe259] to-[#ffa700]">
                Gold Simulator &amp; Utility Portal
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Click on any block below to access Sarafa Gold Bullion Rates, OGRA Fuel Benchmarks, Solar Sizing, WAPDA Bills, FBR Taxes, and Nisab Zakat.
            </p>
          </div>

          {/* Quick Rate Ribbon with Share Button */}
          <div className="bg-[#050d08]/85 backdrop-blur-md p-5 rounded-2xl border border-[#ffd700]/30 shadow-xl space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-mono">
              <div className="border-r border-emerald-900/40 pr-2">
                <span className="text-[10px] text-slate-400 block font-sans">24K Gold (Tola)</span>
                <span className="text-base sm:text-lg font-bold text-[#ffd700] tabular-nums">
                  Rs. {gold24k.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 block">+Rs. 1,800</span>
              </div>

              <div className="border-r border-emerald-900/40 pr-2">
                <span className="text-[10px] text-slate-400 block font-sans">22K Gold (Tola)</span>
                <span className="text-base sm:text-lg font-bold text-white tabular-nums">
                  Rs. {gold22k.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 block">+Rs. 1,650</span>
              </div>

              <div className="border-r border-emerald-900/40 pr-2">
                <span className="text-[10px] text-slate-400 block font-sans">Chandi / Silver</span>
                <span className="text-base sm:text-lg font-bold text-slate-200 tabular-nums">
                  Rs. {silver.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 block">+Rs. 75/tola</span>
              </div>

              <div className="border-r border-emerald-900/40 pr-2">
                <span className="text-[10px] text-slate-400 block font-sans">Petrol (Euro 5)</span>
                <span className="text-base sm:text-lg font-bold text-emerald-400 tabular-nums">
                  Rs. {petrol.toFixed(2)}
                </span>
                <span className="text-[10px] text-emerald-400 block">+Rs. 0.88/L</span>
              </div>

              <div className="border-r border-emerald-900/40 pr-2">
                <span className="text-[10px] text-slate-400 block font-sans">High Speed Diesel</span>
                <span className="text-base sm:text-lg font-bold text-emerald-400 tabular-nums">
                  Rs. {diesel.toFixed(2)}
                </span>
                <span className="text-[10px] text-emerald-400 block">+Rs. 0.53/L</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Solar TopCon/W</span>
                <span className="text-base sm:text-lg font-bold text-[#ffd700] tabular-nums">
                  Rs. 40 - 45
                </span>
                <span className="text-[10px] text-emerald-400 block">Tier-1 N-Type</span>
              </div>
            </div>

            {/* Share Rates Under the Rates Banner */}
            <div className="pt-3 border-t border-emerald-900/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="font-semibold text-[#ffd700]">Share Today’s Rates:</span>
                <span className="hidden sm:inline text-slate-400">
                  Send live market snapshot to friends, jewellers, or clients
                </span>
              </div>
              <ShareRatesButton
                gold24kTola={gold24k}
                gold22kTola={gold22k}
                silverTola={silver}
                petrolPrice={petrol}
                dieselPrice={diesel}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Primary Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            Explore All Tools &amp; Pages
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#00401a] text-[#ffd700] border border-[#ffd700]/30 font-semibold">
              {toolCards.length} Portals
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Har page ka block nechay mojood ha, jis par click kar k aap seedha mutaliqa tool par ja sakte hain.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onOpenAlerts}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00401a]/80 text-[#ffd700] border border-[#ffd700]/30 hover:border-[#ffd700] transition-colors"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Price Alerts</span>
          </button>
          <button
            onClick={onOpenAudioGuides}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white transition-colors"
          >
            <Headphones className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Urdu Audio Guide</span>
          </button>
        </div>
      </div>

      {/* Spacious Clickable Blocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolCards.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className="group cursor-pointer rounded-2xl bg-[#08170e] hover:bg-[#0c2416] border border-[#00401a]/70 hover:border-[#ffd700]/50 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-[#00401a]/30 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top Row: Icon + Badge */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0e2a18] to-[#06140b] group-hover:from-[#00401a] group-hover:to-[#092915] border border-[#ffd700]/30 flex items-center justify-center text-[#ffd700] transition-colors shadow-md">
                    <Icon className="w-6 h-6 text-[#ffd700]" />
                  </div>

                  <span
                    className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg border ${tool.badgeColor}`}
                  >
                    {tool.badge}
                  </span>
                </div>

                {/* Title & Urdu */}
                <div className="mt-4 space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#ffd700] transition-colors flex items-center justify-between">
                    <span>{tool.title}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#ffd700] group-hover:translate-x-1 transition-all" />
                  </h3>
                  <div className="text-xs text-emerald-400 font-urdu">
                    {tool.urdu}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 group-hover:text-slate-300 mt-2.5 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              {/* Bottom Highlights & Direct Action */}
              <div className="mt-6 pt-4 border-t border-emerald-950/60 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-white">{tool.rateHighlight}</span>
                  <span className="text-[11px] text-slate-400 truncate max-w-[150px] text-right">
                    {tool.subHighlight}
                  </span>
                </div>

                <div className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#00401a]/50 group-hover:bg-[#00401a] text-slate-200 group-hover:text-[#ffd700] text-xs font-semibold border border-[#00401a] group-hover:border-[#ffd700]/40 transition-all">
                  <span>{tool.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* City-Wise Sarafa Rates Ribbon */}
      <div className="bg-[#06140b] border border-[#00401a] rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-[#ffd700]" />
            <h3 className="text-sm font-bold text-white">
              City-Wise 24K &amp; 22K Sarafa Association Benchmarks
            </h3>
          </div>
          <span className="text-xs text-slate-400">All Major Bullion Centres</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs font-mono">
          {cityGoldRates.map((city) => (
            <div
              key={city.city}
              className="p-3 rounded-xl bg-[#030905] border border-[#00401a]/60 text-center"
            >
              <span className="text-[11px] text-slate-400 block font-sans truncate">
                {city.city}
              </span>
              <span className="text-sm font-bold text-[#ffd700] block mt-1 tabular-nums">
                Rs. {city.tola24k.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 block">
                22K: Rs. {city.tola22k.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
